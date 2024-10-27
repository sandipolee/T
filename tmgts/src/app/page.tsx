import { cookies } from 'next/headers';
import Image from "next/image";
import { Header } from "./component/header";
import Footer from "./component/footer";
import Link from "next/link";

export default async function Home() {
  return (
    <>
    <div className="bg-gradient-to-br from-green-50 via-yellow-50 to-green-100 min-h-screen">
      <Header />

      <div className="pb-10 min-h-screen">
        <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20 items-center">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <h1 className="font-bold text-5xl max-sm:text-center max-sm:text-4xl pb-4 mb-4 bg-gradient-to-b from-emerald-500 to-teal-600 text-transparent bg-clip-text ">
                Register for School Transport Services Today!
              </h1>
              
              <Link href="/register">
                <button className="
                  rounded-md bg-gradient-to-b from-emerald-500 to-teal-600
                  px-6 py-3 text-sm font-semibold text-white shadow-sm 
                  transition duration-300 ease-in-out transform hover:scale-105
                  max-sm:w-full">
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
