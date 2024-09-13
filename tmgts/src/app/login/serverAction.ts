
"use server";

import { CredentialsSignin } from "next-auth";
;
import dbConnect from "@/lib/DBconnect";
import { signIn } from "@/auth";



export const credentialsLogin = async (username:string, password:string) => {
 
  try {
    await signIn("credentials", {
      username,
      password,
    });
    
  } catch (error) {
    const err = error as CredentialsSignin;
    return err.cause;
  }

    
 

    
  
};
