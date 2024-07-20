"use client"

import React, { useState } from 'react'
import {Button} from "/components/ui/Button"


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "/components/ui/dialog"
import { Input } from "/components/ui/input"
import { Textarea } from "/components/ui/textarea"
import {chatSession } from '/utils/GeminiAIModal'
import { LoaderCircle } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { db } from '/utils/db'
import { MockInterview } from '/utils/schema'
import { v4 as uuidv4 } from 'uuid';




function AddNewInterview() {
  const[openDailog,setOpenDailog]=useState(false);
  const[jobPosition,setJobPosition]=useState();
  const[jobDesc,setJobDesc]=useState();
  const[jobExperience,setJobExperience]=useState();
  const[loading,setLoading]=useState(false);
  const[JsonResponse, setJsonResponse]=useState([]);
  const {user}=useUser();

const onSubmit= async (e)=>{
  setLoading(true)
  e.preventDefault()
  console.log(jobPosition,jobDesc,jobExperience);

    const InputPrompt="Job Position: "+jobPosition+", Job Description: "+jobDesc+" , Years Of Experience:"+jobExperience+", Depends on this information please give me "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" Interview question with Answered in Json Format. Give Ouestion and Answered as field in JSON "

    const result =await chatSession.sendMessage(InputPrompt);
    const MockJsonResp=(result.response.text()).replace('```json','').replace('```','');
    console.log(JSON.parse(MockJsonResp));
    setJsonResponse(MockJsonResp);
    
  if(MockJsonResp){
    const resp=await db.insert(MockInterview)
    .values({
      mockId:uuidv4(),
      jsonMockResp:MockJsonResp,
      jobPosition:jobPosition,
      jobDesc:jobDesc,
      jobExperience:jobExperience,
      createdBy:user?.primaryEmailAddress?.emailAddress,
      createdAt:moment().format('DD-MM-yyyy')
    }).returning({mockId:MockInterview.mockId});

    console.log("Inserted Id:",resp)
    if(resp)
    {
      setOpenDailog(false);
    }
  }
  else{
    console.log("error");
  }
    setLoading(false);
}

  return (
    <div>
        <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={()=>setOpenDailog(true)}
        >
                <h2 className='font-bold text-lg text-center'>+ Add New</h2>

        </div>
          
              <Dialog open={openDailog}>
        
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Tell us more about your  Job Interview</DialogTitle>
            <DialogDescription>

              <form onSubmit={onSubmit}>
                <div>
            
                  <h2>Add details about your job position/role, job description and years of experiance</h2>
                
                
                <div className='mt-7 my-3'>
                <label>Job Role/ Job Position</label> 
                <Input  placeholder="Ex.Full Stack Developer" required
                onChange={(event)=>setJobPosition(event.target.value)}
                />
                </div>

                <div className='mt-7 my-3'>
                <label>Job Description/ Tech Stack (In Short)</label> 
                <Textarea  placeholder="Rect, Angular , nextjs, javascript, java, c++, Mysql, Nodejs" required
                onChange={(event)=>setJobDesc(event.target.value)}
                />
                </div>


                <div className='mt-4 my-3'>
                <label>Years of Experiance</label> 
                <Input  placeholder="Ex.4" type="number"  max="30" required
                onChange={(event)=>setJobExperience(event.target.value)}
                />
                </div>

            </div>
              <div className='flex gap-5 justify-end'>
                <Button type="button" variant='ghost' onClick={()=>setOpenDailog(false)}>Cancel</Button>
                <Button type="submit"  disabled={loading} >
                  {loading?
                  <>
                  <LoaderCircle className='animate-spin'/>'Generating from AI'
                  </>:'Start Interview'
                }
                 </Button>
              </div>

              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </div>
  )
}

export default AddNewInterview