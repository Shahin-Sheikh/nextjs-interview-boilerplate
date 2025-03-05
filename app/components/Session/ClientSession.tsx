"use client"

import React from 'react'
import { useSession } from 'next-auth/react'

const ClientSession: React.FC = () => {
  // the useSession hook makes an HTTP request from the client to the server to get the session information.
  // this is because the client cannot decode the JWT locally, so it has to ask the server to do it.
  // the session data from the client side will have some latency or loading time
  // because the server needs to decode the JWT and then the client must wait because the server will store the data to the provider.
  const { data } = useSession()
  // converting the client session data to string
  const clientSessionData = JSON.stringify(data);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="font-bold text-[salmon]">Client Session Data:</h1>
      <h1 className="text-sm text-center">{ clientSessionData }</h1>
    </div>
  )
}

export default ClientSession