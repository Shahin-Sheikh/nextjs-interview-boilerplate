"use client"

import React from 'react'
import Link from 'next/link'
import { signIn, signOut } from 'next-auth/react'

interface Props {
  isLoggedIn: boolean
}

const Landing: React.FC<Props> = ({ isLoggedIn }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center relative top-[100px] mt-2">
      <h1 className="text-2xl font-bold mb-6">{!isLoggedIn ? 'Landing' : 'Logged in Successfully'}</h1>
      <div className="max-w-sm mx-auto w-[80%] md:w-[320px] flex items-center justify-center">
        {!isLoggedIn && <Link href={'/auth/signup'} className="text-sm w-[120px] py-3 me-4 rounded-lg bg-green-500 text-center">Sign up</Link>}
        {!isLoggedIn ? <button onClick={() => signIn()} className="text-sm w-[120px] py-3 rounded-lg bg-blue-500">Sign in</button>
        : <button onClick={() => signOut()} className="text-sm w-[120px] py-3 rounded-lg bg-red-500">Sign out</button>}
      </div>
    </div>
  )
}

export default Landing