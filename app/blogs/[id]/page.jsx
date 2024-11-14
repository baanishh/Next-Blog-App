"use client"

import { assets} from '@/Assets/assets'
import Footer from '@/Components/Footer';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Page =  ({params:paramsPromise}) => {
    const params = React.use(paramsPromise); // Use React.use() to unwrap the Promise
   
    console.log("params",params);
    
    const [data,setData]=useState()

    const fetchBlog=async()=>{
        const response=await axios.get('/api/blog')
        const id=response.data.blogs.filter(item=>item._id==params.id)
        setData(id)
    }

    useEffect(()=>{
        fetchBlog()
    },[])


  return (
    data?.map(item=>{
        return(

   <>
    <div key={item.id} className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
    <div className='flex justify-between items-center'>
        <Link href={'/'}>
             <Image src={assets.logo} alt="" width={180} className="w-[130px] sm:w-auto" />
        </Link>
       <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>Get Started <Image src={assets.arrow} alt=''/></button>
    </div>
    <div className='text-center my-24'>
       <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{item.title}</h1>
       <Image alt='' src={item.authorImg} width={60} height={60} className='mx-auto border border-white rounded-full mt-6'/>
       <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{item.author}</p>
    </div>
   </div>
   <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
        <Image className='border-4 border-white' src={item.image} alt='' width={1280} height={720}/>

        <div className='blog-content' dangerouslySetInnerHTML={{__html:item.description}}></div>
        
        <div className='my-24'>
            <p className='text-black font-semibold my-4'>share this article on social media</p>
            <div className='flex'>
                <Image src={assets.facebook_icon} width={50} alt='' />
                <Image src={assets.twitter_icon} width={50} alt='' />
                <Image src={assets.googleplus_icon} width={50} alt='' />
            </div>
        </div>
 
   </div>
   <Footer/>
   </>
        )
    })

 
  )
}

export default Page
