"use client"
import DashboardHeader from "@/app/component/DashBoardHeader";
import { usePathname } from "next/navigation";
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
  
  const hideSidebarPages = ['/dasboard/students/add', '/dasboard/students/edit'];
  const showSidebar = !hideSidebarPages.some(page => pathname.startsWith(page));

  return (
    <>
      {showSidebar && (
        <TooltipProvider>
          <div className={`border border-r-1 border-zinc-200 fixed left-0 top-0 flex h-full z-10 flex-col transition-all duration-300 ${isCollapsed ? 'w-[5%]' : 'w-[15%]'}`}>
            <div className="flex-1 overflow-y-auto px-2">
              <nav className={`flex flex-col gap-2 ${isCollapsed ? "items-center" : ""}`}>
                {/* Logo or title with Tooltip in collapsed mode */}
                <Tooltip delayDuration={0} >
                  <TooltipTrigger asChild>
                    <Link
                      href="/dasboard"
                      className="flex items-center gap-2  h-14  px-4  text-primary border-b border-zinc-200"
                    >
                      <GraduationCap className="h-5 w-5" />
                      {!isCollapsed && <span className="text-lg font-semibold">TMGTS</span>}
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
        showSidebar ? (isCollapsed ? 'ml-[5%]' : 'ml-[15%]') : 'ml-0'
      }`}>
        <div className={`fixed top-0 right-0 z-10 bg-background transition-all duration-300 ${
          showSidebar ? (isCollapsed ? 'w-[95%]' : 'w-[85%]') : 'w-full'
        }`}>
          <DashboardHeader />
        </div>
        <div className="pt-16 bg-zinc-50">{children}</div>
      </div>
    </>
  );
}
