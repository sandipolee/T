import { Link } from "lucide-react";

const Footer =()=>{
return(
    <div className="bg-blue-950 py-20 h-full mx-auto w-full max-w-screen-x1 px-2.5 md:px-20 ">
        <div className="flex justify-between max-sm:flex-wrap ">
          <div className="flex items-center  ">
            <img src="./logo.png" className="size-20" alt="" />
            <div className="ml-4">
            <h3 className="text-white font-bold">Gyan Joti Secondary School</h3>
            <p className="text-white">Tulsipur 6, Dang </p>
            </div>
           
          </div>
          <div className="max-sm:pt-10 ml-24">
            <h3 className="text-white font-bold"> Important Contact</h3>
          <li className="list-none text-white" >
                <a
                  href=""
                  className="text-sm font-semibold text-gray-800 hover:text-gray-900">
                 
                </a>
                Admin : 98XXXXXX
              </li>
              <li className="list-none text-white" >
                <a
                  href=""
                  className="text-sm font-semibold text-gray-800 hover:text-gray-900">
                 
                </a>
                Omjeet Rawat: 98XXXXXX
              </li>
              <li className="list-none text-white" >
                <a
                  href=""
                  className="text-sm font-semibold text-gray-800 hover:text-gray-900">
                 
                </a>
                Manoj Kc : 98XXXXXX
              </li>
              
         
          </div>
        </div>
      </div>
)

}
export default Footer; 