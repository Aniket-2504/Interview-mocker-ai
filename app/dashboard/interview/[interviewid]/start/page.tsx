"use client"

// import { db } from '../../../../../utils/db'
import { db } from '/utils/db'
import QuestionsSection from './_components/QuestionsSection'
// import { MockInterview } from '../../../../../utils/schema'
import { MockInterview } from '/utils/schema'
import React, { useEffect, useState } from 'react'
import { eq } from 'drizzle-orm'


function StartInterview({params}) {

    const [interviewData,setInterviewData]=useState();
    const[mockInterviewQuestion,setMockInterviewQuestion]=useState();
    const [activeQuestionIndex,setActiveQuestionIndex]=useState();

        useEffect(()=>{
            GetInterviewDetails();
        },[]);


        const GetInterviewDetails=async()=>{
            const result=await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId,params.interviewid))
            
            const jsonMockResp=JSON.parse(result[0].jsonMockResp)
            console.log(jsonMockResp)
            setMockInterviewQuestion(jsonMockResp);
            setInterviewData(result[0]);
        }


  return (
    <div>
       <div className='grid grid-cols-span-1 md:grid-cols-2'>

        {/* Questions ..... */}
        <QuestionsSection  mockInterviewQuestion={mockInterviewQuestion} />

        {/* videoans..... */}
        <div>

        </div>

       </div>
    </div>
  )
}

export default StartInterview