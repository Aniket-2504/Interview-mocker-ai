"use client"

import { db } from '../../../../../utils/db'
// import { db } from '/utils/db'
import QuestionsSection from './_components/QuestionsSection'
import RecordAnswerSection from './_components/RecordAnswerSection'
import { MockInterview } from '../../../../../utils/schema'
// import { MockInterview } from '@/utils/schema';
import React, { useEffect, useState } from 'react'
import { eq } from 'drizzle-orm'


function StartInterview({params}) {

    const [interviewData,setInterviewData]=useState(null);
    const[mockInterviewQuestion,setMockInterviewQuestion]=useState(null);
    const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);

        useEffect(()=>{
            GetInterviewDetails();
        },[]);


        const GetInterviewDetails=async()=>{
            const result=await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId,params.interviewid))
            

            if (result && result.length > 0) {
            const jsonMockResp=JSON.parse(result[0].jsonMockResp)
            console.log(jsonMockResp)
            setMockInterviewQuestion(jsonMockResp);
            setInterviewData(result[0]);
            }
            else {
              console.error('No interview data found.');
            }
        }


  return (
    <div>
       <div className='grid grid-cols-span-1 md:grid-cols-2'>

        {/* Questions ..... */}
        <QuestionsSection  
          mockInterviewQuestion={mockInterviewQuestion} 
          activeQuestionIndex={activeQuestionIndex} 
        />

        {/* videoans..... */}
       <RecordAnswerSection
       mockInterviewQuestion={mockInterviewQuestion} 
       activeQuestionIndex={activeQuestionIndex} 
       interviewData ={interviewData}
       />

       </div>
    </div>
  )
}

export default StartInterview