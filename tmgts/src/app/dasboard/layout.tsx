"use client"
import SideBar from "@/app/component/sidebar";
import DashboardHeader from "@/app/component/DashBoardHeader";
import { auth } from "@/auth";
import { redirect, usePathname } from "next/navigation";
import React, { useState } from "react";
import { Home, Bus, GraduationCap, Users2, IdCard, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import NavItem from "@/app/component/sidebar";

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const isAddStudentPage = pathname === '/dasboard/students/add';

  return (
    <>
      {!isAddStudentPage && (
        <TooltipProvider>
          <div className={`border border-r-1 border-zinc-200 fixed left-0 top-0 flex h-full z-10 flex-col transition-all duration-300 ${isCollapsed ? 'w-[5%]' : 'w-[15%]'}`}>
            <div className="flex-1 overflow-y-auto p-2">
              <nav className={`flex flex-col gap-4 ${isCollapsed ? "items-center" : ""}`}>
                {/* Logo or title with Tooltip in collapsed mode */}
                <Tooltip delayDuration={0} >
                  <TooltipTrigger asChild>
                    <Link
                      href="/dasboard"
                      className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground"
                    >
                      <GraduationCap className="h-5 w-5" />
                      {!isCollapsed && <span className="text-lg font-semibold">TMS</span>}
                    </Link>
                  </TooltipTrigger>
                  {isCollapsed && <TooltipContent side="right">TMS</TooltipContent>}
                </Tooltip>

                {/* Navigation Links */}
                <NavItem href="/dasboard" icon={<Home className="h-5 w-5" />} text="Dashboard" isCollapsed={isCollapsed} isActive={pathname === '/dasboard'} />
                <NavItem href="/dasboard/routes" icon={<Bus className="h-5 w-5" />} text="Routes" isCollapsed={isCollapsed} isActive={pathname === '/dasboard/routes'} />
                <NavItem href="/dasboard/students" icon={<Users2 className="h-5 w-5" />} text="Students" isCollapsed={isCollapsed} isActive={pathname === '/dasboard/students'} />
                <NavItem href="/dasboard/idcard" icon={<IdCard className="h-5 w-5" />} text="ID-Cards" isCollapsed={isCollapsed} isActive={pathname === '/dasboard/idcard'} />
              </nav>
            </div>
            <Button 
              onClick={() => setIsCollapsed(!isCollapsed)} 
              variant="ghost" 
              className="self-end mb-4 mr-2"
              size="icon"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </TooltipProvider>
      )}
      
      <div className={`flex-1 transition-all duration-300 ${
        isAddStudentPage ? 'ml-0' : (isCollapsed ? 'ml-[5%]' : 'ml-[15%]')
      }`}>
        <div className={`fixed top-0 right-0 z-10 bg-background transition-all duration-300 ${
          isAddStudentPage ? 'w-full' : (isCollapsed ? 'w-[95%]' : 'w-[85%]')
        }`}>
          <DashboardHeader />
        </div>
        <div className="pt-16 bg-zinc-50">{children}</div>
      </div>
    </>
  );
}
