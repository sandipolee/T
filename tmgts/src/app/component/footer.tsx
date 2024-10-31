import Image from 'next/image';
const Footer =()=>{
return(
    <div className="bg-slate-50/30 dark:bg-slate-900 py-20 h-full mx-auto w-full max-w-screen-x1 px-2.5 md:px-20 border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between max-sm:flex-wrap ">
          <div className="flex items-center  ">
            <Image src="/logo.png" width={80} height={80} alt="School logo" />
            <div className="ml-4">
            <h3 className="text-slate-500 dark:text-slate-400 font-bold">Gyan Joti Secondary School</h3>
            <p className="text-slate-500 dark:text-slate-400">Tulsipur 6, Dang </p>
            </div>
          </div>
          <div className="max-sm:pt-10 ml-24">
            <h3 className="text-slate-500 dark:text-slate-400 font-bold"> Important Contact</h3>
          <li className="list-none text-slate-500 dark:text-slate-400" >
                <a
                  href=""
                  className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
                 
                </a>
                Admin : 98XXXXXX
              </li>
              <li className="list-none text-slate-500 dark:text-slate-400" >
                <a
                  href=""
                  className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
                 
                </a>
                Omjeet Rawat: 98XXXXXX
              </li>
              <li className="list-none text-slate-500 dark:text-slate-400" >
                <a
                  href=""
                  className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
                 
                </a>
                Manoj Kc : 98XXXXXX
              </li>
              
         
          </div>
        </div>
      </div>
)

}
export default Footer; 
