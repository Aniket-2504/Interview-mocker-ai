"use client"

// import { db } from '../../../../../utils/db'
import { db } from '/utils/db'
import RecordAnswerSection from './_components/RecordAnswerSection'
// import { MockInterview } from '../../../../../utils/schema'
import { MockInterview } from '/utils/schema'
import React, { useEffect, useState } from 'react'
import { eq } from 'drizzle-orm'
import { Button } from '/components/ui/button'
import QuestionsSection from './_components/QuestionsSection'
import Link from 'next/link'



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
     
            const jsonMockResp=JSON.parse(result[0].jsonMockResp)
            console.log(jsonMockResp)
            setMockInterviewQuestion(jsonMockResp);
            setInterviewData(result[0]);
                       
        }


  return (
    <div>
       <div className='grid grid-cols-span-1 md:grid-cols-2'>

        {/* Questions ..... */}
        <QuestionsSection  
          mockInterviewQuestion={mockInterviewQuestion} 
          activeQuestionIndex={activeQuestionIndex} 
        />
        <QuestionsSection/>
        

        {/* videoans..... */}
       <RecordAnswerSection
       mockInterviewQuestion={mockInterviewQuestion} 
       activeQuestionIndex={activeQuestionIndex} 
       interviewData ={interviewData}
       />

       </div>
          <div className='flex justify-end gap-6'>

            {activeQuestionIndex>0&& 
            <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}

            {activeQuestionIndex!=mockInterviewQuestion?.length-1&&
            <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)} >Next Question</Button>}

            {activeQuestionIndex==mockInterviewQuestion?.length-1&&
            <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
            <Button>End Interview</Button>
            </Link>}
          </div>

    </div>
  )
}

export default StartInterview