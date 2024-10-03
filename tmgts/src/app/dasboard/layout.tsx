
import SideBar from "@/app/component/sidebar"
import DashboardHeader from "@/app/component/DashBoardHeader"
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { useState } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
export default async function dasboard({
  children,
  
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  const session = await auth();
  if(!session?.user) redirect("/login");
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen">
    
     <SideBar/>

    
    <ResizableHandle withHandle />
    <ResizablePanel defaultSize={80}>
    <DashboardHeader></DashboardHeader>
    {children}
    </ResizablePanel>
  </ResizablePanelGroup>

  //   <div className="flex min-h-screen w-full bg-muted/40">
  //   <SideBar/>
  //   <div className="flex flex-1 flex-col pl-64">
  //     <DashboardHeader></DashboardHeader>
  //     {children}
  //   </div>
  // </div>
  );
}
