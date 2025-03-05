import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="dark:backdrop-blur-md dark:bg-opacity-60 w-full flex bg-white border-gray-200 dark:bg-black h-[100px] items-center fixed z-50">
      <div className="max-w-screen-lg w-full flex items-center justify-center mx-auto px-8 lg:px-0">
        <Link href={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">NextAuth.js Basic</span>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar