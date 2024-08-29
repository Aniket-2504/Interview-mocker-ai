"use client"
import Webcam from 'react-webcam'
import { db } from '/utils/db'
import { MockInterview } from '/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import {Button} from "/components/ui/Button"

function Interview({params}) {


  const [interviewData,setInterviewData]=useState(0);
  const [webCamEnabled,setWebCamEnabled]=useState(false);
useEffect(()=>{
    console.log(params.interviewid)
    GetInterviewDetails();
},[])

// Used to get interview details by mockid 

const GetInterviewDetails=async()=>{
    const result=await db.select().from(MockInterview)
    .where(eq(MockInterview.mockId,params.interviewid))
    
      setInterviewData(result[0]);
}

  return (
    <div className='my-10'>
      <h2 className='font-bold text-4xl'>Lets Get Started</h2>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
   
    <div className='flex flex-col my-5 gap-5 '>
      <div className='flex flex-col p-5 rounded-lg border gap-5'>
      <h2 className='text-lg'> <strong>Job Role/Job Position: </strong>{interviewData.jobPosition} </h2>
      <h2 className='text-lg'> <strong>Job Descripption/Tech Stack: </strong>{interviewData.jobDesc} </h2>
      <h2 className='text-lg'> <strong>Years of Experience: </strong>{interviewData.jobExperience} </h2>
      </div>
      <div className='p-5 border rounded-lg border-yellow-500 bg-yellow-100'>
        <h2 className='flex gap-2 items-center text-yellow-400'> <Lightbulb/><strong>Information</strong> </h2> 
        <h2 className='mt-3'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
      </div>
    </div> 
    <div>
      {webCamEnabled? <Webcam 
      onUserMedia={()=>setWebCamEnabled(true)}
      onUserMediaError={()=>setWebCamEnabled(false)}
      mirrored={true}
      style={{
        height:300,
        width:300
      }}
      />
      :
      <>
      <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border'/>
      <Button variant="ghost" className="w-full" onClick={()=>setWebCamEnabled(true)}>Enable Web Cam and Microphone</Button>
      </>
  }
    </div>

 
    </div>


    <div className="flex justify-end items-end my-4">    
    <Button >Start Interview</Button>
    </div>
    


    </div>
  )
}

export default Interview