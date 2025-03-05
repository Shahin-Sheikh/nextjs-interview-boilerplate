"use client"
// defines a provider so we can use session in client side
// wrapping root layout with this provider
// so it allows all components inside the app can access the session with useSession and getSession from nextauth
// it also handles retrieving, storing, and updating the session automatically on the client side

import { SessionProvider } from "next-auth/react"

interface Props  {
  children?: React.ReactNode
}

export const Provider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>
}
