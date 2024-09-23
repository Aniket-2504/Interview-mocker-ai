"use client"

import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect } from 'react'

function Feedback({params}) {

    useEffect(()=>{
       GetFeedback();
    },[])
  const GetFeedback=async()=>{
      const result=await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef,params.interviewId))
      .orderBy(UserAnswer.id);
      console.log(result);
  }

  return (
    <div>
        <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2>
        <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
        <h2 className='text-blue-800 text-lg my-3'>Your overall interview rating: <strong>7/10</strong></h2>


        <h2 className='text-lg text-gray-500'>Find Below Interview Question with corect answer, Your answer and feedback for improvement </h2>
    </div>
  )
}

export default Feedback