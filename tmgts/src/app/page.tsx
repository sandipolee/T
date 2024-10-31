"use client";

import Image from "next/image";
import { Header } from "./component/header";
import Footer from "./component/footer";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  // weights: ['400', '500', '600', '700'],
});

const text = "Register for School Transport Services Today!";

export default function Home() {
  return (
    <>
      <div className={`bg-white min-h-screen ${montserrat.className} dark:bg-slate-900`}>
        <Header />

        <div className="pb-10 min-h-screen">
          <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20 items-center">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center">
                
                <TypeAnimation
                  className="font-bold text-5xl max-sm:text-center max-sm:text-4xl pb-4 mb-10 bg-gradient-to-b from-emerald-500 to-teal-600 text-transparent bg-clip-text"
                  sequence={[
                    "Register for School Transport Services Today!", // Types 'One'
                    1000, // Waits 1s
                    "Get your ID card", // Deletes 'One' and types 'Two'
                    2000, // Waits 2s
                    "Register for School Transport Services Today!", // Types 'Three' without deleting 'Two'
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                 
                />
                <Link href="/register">
                  <button
                    className="
                  rounded-sm bg-gradient-to-b from-emerald-500 to-teal-600 
                  px-10 py-4 text-sm font-semibold text-white shadow-sm 
                  transition duration-300 ease-in-out transform hover:scale-105
                  max-sm:w-full"
                  >
                    Register Now
                  </button>
                </Link>
              </div>
              <div className="relative h-80 md:h-[500px]">
                <Image
                  src="/schoolbus.png"
                  alt="School Bus Illustration"
                  layout="fill"
                  objectFit="contain"
                  priority
                  className="drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
