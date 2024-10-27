

import { auth } from "@/auth";
import { redirect,  } from "next/navigation";
import Loginform from "./loginform";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function  Page() {
  const session = await auth();
  if(session?.user) redirect("/dasboard");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md rounded-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Transport Management System</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
        <Loginform/>
        </CardContent>
      </Card>
    </div>
  );
}







