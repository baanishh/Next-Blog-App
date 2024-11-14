import { ConnectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import {writeFile} from 'fs/promises'
import BlogModel from "@/lib/models/BlogModel";
import fs from 'fs/promises';

const LoadDB=async()=>{
    await ConnectDB()
}
LoadDB()

//save blog 
export const POST=async(request)=>{
    const formData=await request.formData()
    const timestamp=Date.now()

    const image=formData.get("image")
    const imageByteData=await image.arrayBuffer()
    const buffer=Buffer.from(imageByteData)
    const path=`./public/${timestamp}_${image.name}`
    await writeFile(path,buffer)
    const imgUrl=`/${timestamp}_${image.name}`

    const blogData={
        title:`${formData.get('title')}`,
        description:`${formData.get('description')}`,
        category:`${formData.get('category')}`,
        author:`${formData.get('author')}`,
        image:`${imgUrl}`,
        authorImg:`${formData.get('authorImg')}`,
        date:`${timestamp}`
    }

    await BlogModel.create(blogData)
    console.log("Blog saved");
    
    return NextResponse.json({success:true,msg:"Blog Addedd"})
}


//get blog api
export const GET=async(request)=>{
        const blogs=await BlogModel.find({})
        return NextResponse.json({blogs})
}

//delete blog
export const DELETE=async(request)=>{
    const id=await request.nextUrl.searchParams.get('id')
    const blog=await BlogModel.findById(id)
    await fs.unlink(`./public/${blog.image}`)
    await BlogModel.findByIdAndDelete(id)
    return NextResponse.json({msg:"Blog deleted"})
}