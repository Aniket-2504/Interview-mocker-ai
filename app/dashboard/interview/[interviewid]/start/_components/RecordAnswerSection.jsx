
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import {Button} from "/components/ui/Button"
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';

function RecordAnswerSection() {
  const [userAnswer,setUserAnswer]=useState('');
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });


  useEffect(()=>{
    results.map((result)=>(
      setUserAnswer(prevAns=>prevAns+result?.transcript)
    ))
  },[results])

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
    <Button variant="outline" className="my-10" onClick={isRecording?stopSpeechToText:startSpeechToText}>
      {isRecording?
      <h2 className='text-red-600 flex gap-2'>
        <Mic/> Stop Recording....
      </h2>
      :
      'Record Answer'}</Button>
    
    <h1>Recording: {isRecording.toString()}</h1>
      <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul>

    </div>
  )
}

export default RecordAnswerSection