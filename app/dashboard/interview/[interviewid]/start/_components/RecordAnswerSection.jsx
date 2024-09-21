
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import {Button} from "/components/ui/Button"
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '/utils/GeminiAIModal'
import { UserAnswer } from '../../../../../../utils/schema';
import { db } from '../../../../../../utils/db';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
// import { db } from 'utils/db'

function RecordAnswerSection({mockInterviewQuestion,activeQuestionIndex,interviewData}) {
  const [userAnswer,setUserAnswer]=useState('');
  const{user}=useUser();
  const[loading,setLoading]=useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });


  useEffect(()=>{
    results.map((result)=>(
      setUserAnswer(prevAns=>prevAns+result?.transcript)
    ))
  },[results])

  useEffect(()=>{
      if(!isRecording&&userAnswer.length>10)
      {
        UpdateUserAnswer();
      }
      // if(userAnswer?.length<10){
      //   setLoading(false);
      //   toast('Error while saving your answer , Please record again')
      //   return;
      // }
  },[userAnswer])

  const StartStopRecording =async()=>{
    if(isRecording){
     
      stopSpeechToText();
  
      // if(userAnswer?.length<10){
      //   setLoading(false);
      //   toast('Error while saving your answer , Please record again')
      //   return;
      // }
        

    }
    else{
      startSpeechToText();
    }

  }

  const UpdateUserAnswer=async()=>{
    console.log(userAnswer);
    setLoading(true)
    const feedbackPrompt ="Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+
    ", User Answer:"+userAnswer+", Depends on question and user answeer for given interview question"+
    " Please give us rating for answer and feedback for more improvement if any"+
    "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

  const result = await chatSession.sendMessage(feedbackPrompt);

  const mockJsonResp =(result.response.text()).replace('```json','').replace('```','');
  console.log(mockJsonResp);
  const JsonFeedbackResp = JSON.parse(mockJsonResp);

  const resp =await db.insert(UserAnswer)
  .values({
      mockIdRef:interviewData?.mockId,
      question:mockInterviewQuestion[activeQuestionIndex]?.question,
      correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns:userAnswer,
      feedback:JsonFeedbackResp?.feedback,
      rating:JsonFeedbackResp?.rating,
      userEmail:user?.primaryEmailAddress?.emailAddress,
      createdAt:moment().format('DD-MM-yyyy')

  })

      if(resp)
      {
        toast('User Answer Recorded Sucessfully')
        setUserAnswer('');
        setResults([]);
      }
      setResults([]);
     
      setLoading(false);
  }

  return (
    <div className='flex items-center justify-center flex-col'>
    <div className='flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5'>
        <Image src={'/webcam.jpg'} width={300} height={300} className='absolute rounded-lg' />
          <Webcam
          mirrored={true}
          style={{
            height:350,
            width:'100%',
            zIndex:10,
          }}
          />
    </div>
    <Button 
    disabled={loading}
    variant="outline" className="my-10" onClick={StartStopRecording}>
      {isRecording?
      <h2 className='text-red-600 flex gap-2'>
        <Mic/> Stop Recording....
      </h2>
      :
      'Record Answer'}</Button>

        
    </div>
  )
}

export default RecordAnswerSection