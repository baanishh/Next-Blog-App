"use client"
import { assets } from '@/Assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {
  const [image,setImage]=useState(false)
  const [data,setData]=useState({
    title:"",
    description:"",
    category:"Startup",
    author:"Banish",
    authorImg:"/author_icon.png"
  })

  const onChangeHandler=(e)=>{
    const name=e.target.name
    const value=e.target.value
    setData(data=>({
      ...data,
      [name]:value
    }))
    console.log(data);
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    formData.append("image", image);
  
    try {
      const response = await axios.post('/api/blog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data.success) {
        toast.success(response.data.msg);
        setImage(false);
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Banish",
          authorImg: "/author_icon.png",
        });
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
    }
  };
  

  return (
    <>
     <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
        <p className='text-xl'>Upload Thumbnail</p>     
        <label htmlFor="image">
          <Image src={!image?assets.upload_area:URL.createObjectURL(image)} width={140} height={70} alt='' className='mt-4'/>
        </label>
        <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required/>
        <p className='text-xl mt-4'>Blog Title</p>
        <input name='title' onChange={onChangeHandler} value={data.title} type="text" required placeholder='Type here...' className='w-full border sm:w-[500px] px-4 py-3 ' />
        <p className='text-xl mt-4'>Blog Description</p>
        <textarea name='description' onChange={onChangeHandler} value={data.description}  type="text" required placeholder='Write content here...' className='w-full border sm:w-[500px] px-4 py-3 ' rows={6} />
        <p className='text-xl mt-4'>Blog Category</p>
        <select name='category' onChange={onChangeHandler} value={data.category} className='w-40 mt-4 px-4 py-3 border text-gray-500'>
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select><br />
        <button type='submit' className='text-white bg-black w-40 mt-8 h-12'>ADD</button>
      </form> 
    </>
  )
}

export default Page
