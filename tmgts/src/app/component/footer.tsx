import Image from 'next/image';
const Footer =()=>{
return(
    <div className="bg-zinc-50/30 py-20 h-full mx-auto w-full max-w-screen-x1 px-2.5 md:px-20 border border-zinc-200">
        <div className="flex justify-between max-sm:flex-wrap ">
          <div className="flex items-center  ">
            <Image src="/logo.png" width={80} height={80} alt="School logo" />
            <div className="ml-4">
            <h3 className="text-zinc-500 font-bold">Gyan Joti Secondary School</h3>
            <p className="text-zinc-500">Tulsipur 6, Dang </p>
            </div>
           
          </div>
          <div className="max-sm:pt-10 ml-24">
            <h3 className="text-zinc-500 font-bold"> Important Contact</h3>
          <li className="list-none text-zinc-500" >
                <a
                  href=""
                  className="text-sm font-semibold text-zinc-500 hover:text-gray-900">
                 
                </a>
                Admin : 98XXXXXX
              </li>
              <li className="list-none text-zinc-500" >
                <a
                  href=""
                  className="text-sm font-semibold text-zinc-500 hover:text-gray-900">
                 
                </a>
                Omjeet Rawat: 98XXXXXX
              </li>
              <li className="list-none text-zinc-500" >
                <a
                  href=""
                  className="text-sm font-semibold text-zinc-500 hover:text-gray-900">
                 
                </a>
                Manoj Kc : 98XXXXXX
              </li>
              
         
          </div>
        </div>
      </div>
)

}
export default Footer; 
