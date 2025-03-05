"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'

const ZodSignupFormSchema = z.object({
  username: z.string().min(3, "Minimum username is 3 characters").max(20, "Maximum username is 20 characters"),
  email: z.string().email("Email format must be valid"),
  password: z.string().min(4, "Minimum password is 4 characters").regex(/^(?=.*\d).{1,}$/, "The password must contain at least one digit"),
});

type SignupFormSchema = z.infer<typeof ZodSignupFormSchema>

const SignUp = () => {
  const { register, handleSubmit, formState } = useForm<SignupFormSchema>({
    resolver: zodResolver(ZodSignupFormSchema)
  });

  const { errors } = formState;

  const handleForm = handleSubmit(async (values) => {
    try {
      const response = await fetch('/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (data.status === 400) {
        throw new Error("Failed to create an account!\n" + data.message);
      }
      alert(data.message)
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: '/',
      })
    } catch (error: any) {
    }
  });

  return (
    <div className="w-full flex flex-col items-center justify-center relative top-[100px] mt-2">
      <h1 className="text-2xl font-bold mb-6">Sign up</h1>
      <form className="max-w-sm mx-auto w-[80%] md:w-[320px]" onSubmit={handleForm}>
        <div className="relative z-0 w-full mb-5 group">
            <input
              type="username"
              id="floating_username"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
              {...register("username")}
            />
            <label htmlFor="floating_username" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
            {errors?.username &&
              <p className="text-[12px] mt-2 text-red-500">{errors.username?.message}</p>} 
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
              {...register("email")}
            />
            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
            {errors?.email &&
              <p className="text-[12px] mt-2 text-red-500">{errors.email?.message}</p>} 
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
              {...register("password")}
            />
            <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            {errors?.password &&
              <p className="text-[12px] mt-2 text-red-500">{errors.password?.message}</p>} 
        </div>
        <button type="submit" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Create</button>
      </form>
    </div>
  )
}

export default SignUp