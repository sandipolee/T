
import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Loginform from "./loginform";

export default async function  Page() {
  const session = await auth();
  if(session?.user) redirect("/dasboard/admin");

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <Image
              src="/logo.png"
              alt="logo"
              className="size-20"
              width={40}
              height={40}
            />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Admin
          </h2>
          <Loginform/>
          
        </div>
      </div>
    </section>
  );
}
