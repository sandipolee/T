import React from 'react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export function Login() {
  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
          <Image 
          src="/logo.png"
      alt="logo"
      className='size-20'
      width={40}
      height={40}

      />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
           Admin
          </h2>
          
          <form action= {async()=> {
           
          }} method="POST" className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  {' '}
                  Admin ID{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="username"
                    placeholder="Username"
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-yellow-500 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-yellow-400"
                >
                  Log in <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
          
        </div>
      </div>
    </section>
  )
}
