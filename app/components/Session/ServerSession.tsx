"use client"

import React from 'react'

interface Props {
  serverSessionData: string
}

const ServerSession: React.FC<Props> = ({ serverSessionData }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center mb-4">
      <h1 className="font-bold text-[salmon]">Server Session Data:</h1>
      <h1 className="text-sm text-center">{ serverSessionData }</h1>
    </div>
  )
}

export default ServerSession