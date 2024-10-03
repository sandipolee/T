import { headers } from "next/headers";
import Image from "next/image";
import { Header } from "./component/header";
import Footer from "./component/footer";
import Link from "next/link";
import { cookies } from 'next/headers'
 
const cookieStore = cookies()


export default function Home() {
  return (
    <>
      <Header />

      <div className="bg-white py-10 h-screen " >
        <div className="h-full mx-auto w-full max-w-screen-x1 px-2.5 md:px-20 items-center max-sm:mt-20 ">
          <div className="grid md:grid-cols-2 gap-8 pt-10">
          <div className=" align-middle">
            <h1 className="font-bold text-5xl max-sm:text-center max-sm:pt-8 max-sm:text-4xl text-blue-950 max-sm:justy">
              Register for School Transport Services Today!
            </h1>
            <p className="text-slate-600 max-sm:text-center py-4">To get your Id card for  Transport service chick Register button and feel the form. </p>
            
          </div>
          <div className="" > 
          </div>
          </div>
          <div className="pb-28">
          <Link href="/register">
            <button className="
            rounded-md bg-yellow-500 
                  px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black
             max-sm:w-full">
            Regester
            </button>
            </Link>
          
          </div>
        </div>
      </div>
      <Footer>
        
      </Footer>
      
    </>
  );
}
