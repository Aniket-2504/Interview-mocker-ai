"use client"

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {

    const path=usePathname();
    useEffect(()=>{

    },[])
    
  return (
    <div  className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
        <Image src={'/logoipsum-297.svg'} width={160} height={100} alt='logo'/>
        <ul className='hidden md:flex gap-6'>
        <li className={`hover:text-blue-500 hover:font-bold transition-all cursor-pointer ${path=='/dashboard'&&'text-blue-500 font-bold'}`}>Dashboard</li>
        <li className={`hover:text-blue-500 hover:font-bold transition-all cursor-pointer ${path=='/dashboard/questions'&&'text-blue-500 font-bold'}`}>Questions</li>
        <li className={`hover:text-blue-500 hover:font-bold transition-all cursor-pointer ${path=='/dashboard/upgrade'&&'text-blue-500 font-bold'}`}>Upgrade</li>
        <li className={`hover:text-blue-500 hover:font-bold transition-all cursor-pointer ${path=='/dashboard/how'&&'text-blue-500 font-bold'}`}>How it Works ?</li>

        </ul>
        <UserButton/>

    </div>
  )
}

export default Header