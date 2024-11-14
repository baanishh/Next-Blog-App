"use client";

import SubscriptionTableItem from "@/Components/AdminComponents/SubscriptionTableItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [email, setEmail] = useState([]);

  //get function
  const fetchEmails = async () => {
    const response = await axios.get("/api/email");
    setEmail(response.data);
    console.log("response",response.data);
    
  };
 
  //delete function
  const deleteEmail=async(mongoId)=>{
    const response=await axios.delete('/api/email',{
      params:{
        id:mongoId
      }
    })
    if (response.data.success) {
      fetchEmails()
      toast.success(response.data.msg)
    }else{
      toast.error("email not deleted")
    }
  }

  useEffect(()=>{
    fetchEmails()
  },[])
  console.log("email",email);


  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm;pl-16">
      <h1>AllSubscription</h1>
      <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="text-xs text-left text-gray-500  bg-gray-50 w-full">
          <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                Email Subscription
              </th>
              <th scope="col" className="hidden sm:block px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {email?.map((item, index) => {
              return <SubscriptionTableItem key={index} mongoId={item._id} email={item.email} date={item.date} deleteEmail={deleteEmail} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
