"use client"

import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { credentialsLogin } from "./serverAction";


export default function Loginform() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState<string | null>(null);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const router= useRouter();
  
      const data = new FormData(e.currentTarget);
      const username = data.get("username") as string;
      const password = data.get("password") as string;
  
      if (!username || !password) {
        return toast({
          variant: "destructive",
          title: "Error",
          description: "please provide all fields",
        });
      } else {
        const error = await credentialsLogin(username, password);
  
        if (!error){
          toast({
            title: "sucess",
            description: "login sucessfull",
          });
         
         router.refresh();
  
        }else {
          // console.log(error)
          toast({
            variant: "destructive",
            title: `${error}`,
          });
        }
      }
  }
    return(
<form onSubmit={handleSubmit} className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="text-base font-medium text-gray-900"
                >
                  Admin ID
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Username"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-base font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-yellow-500 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-yellow-400"
                >
                  Log in
                </button>
              </div>
            </div>
          </form>
    )
}