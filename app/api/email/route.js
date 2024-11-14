import { ConnectDB } from "@/lib/config/db";
import EmailSchema from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";


const LoadDB=async()=>{
    await ConnectDB()
}
LoadDB();

// post emails
export const POST=async(request)=>{
    const formData=await request.formData()
    const email=formData.get('email')
    const emailData={
        email:`${formData.get('email')}`
    }
    await EmailSchema.create(emailData)
    return NextResponse.json({msg:"Email Subscribed",success:true})
}

//get all emails
export const GET=async(request)=>{
    const emails=await EmailSchema.find({})
    return NextResponse.json(emails)
}

//delete email
export const DELETE=async(request)=>{
    const id=await request.nextUrl.searchParams.get('id')
    await EmailSchema.findByIdAndDelete(id)
    return NextResponse.json({success:true,msg:"Email deleted"})
}