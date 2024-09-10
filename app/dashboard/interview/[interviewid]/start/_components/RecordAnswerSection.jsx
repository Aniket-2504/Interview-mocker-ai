
import Image from 'next/image'
import React from 'react'
import Webcam from 'react-webcam'

function RecordAnswerSection() {
  return (
    <div>
        <Image src={''} width={200} height={200} className='absolute' />
          <Webcam/>

    </div>
  )
}

export default RecordAnswerSection