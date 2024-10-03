"use client";
import { useState } from "react";
import { ResizablePanel } from "@/components/ui/resizable";
import { Home, Bus, GraduationCap, Users2, IdCard } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider, // Import TooltipProvider
} from "@/components/ui/tooltip"; // Adjust the path accordingly

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // const handleResize = (size: number) => {
  //   setIsCollapsed(size <= 15); // Adjust the size threshold as needed
  // };

  return (
    <TooltipProvider>
      <ResizablePanel
        collapsible={true}
        defaultSize={20}
        minSize={15}
        maxSize={20}
        collapsedSize={5}
        onCollapse={() => {
          setIsCollapsed(true);
        }}
        className={` ${
                isCollapsed ? "transition-all duration-300 ease-in-out" : ""
              }`}
        
        onResize={() => {
          setIsCollapsed(false)}} // Track size change
      >
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <nav
              className={`flex flex-col gap-4 ${
                isCollapsed ? "items-center" : ""
              }`}
            >
              {/* Logo or title with Tooltip in collapsed mode */}
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href="/dasboard"
                    className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground"
                  >
                    <GraduationCap className="h-5 w-5" />
                    {!isCollapsed && (
                      <span className="text-lg font-semibold">TMS</span>
                    )}
                  </Link>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">TMS</TooltipContent>
                )}
              </Tooltip>

              {/* Navigation Links */}
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href="/dasboard"
                    className="flex items-center gap-4 rounded-lg px-4 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Home className="h-5 w-5" />
                    {!isCollapsed && <span>Dashboard</span>}
                  </Link>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">Dashboard</TooltipContent>
                )}
              </Tooltip>

              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className="flex items-center gap-4 rounded-lg px-4 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Bus className="h-5 w-5" />
                    {!isCollapsed && <span>Routes</span>}
                  </Link>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">Routes</TooltipContent>
                )}
              </Tooltip>

              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href="/dasboard/students"
                    className="flex items-center gap-4 rounded-lg bg-accent px-4 py-2 text-accent-foreground"
                  >
                    <Users2 className="h-5 w-5" />
                    {!isCollapsed && <span>Students</span>}
                  </Link>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">Students</TooltipContent>
                )}
              </Tooltip>

              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href="/dasboard/idcard"
                    className="flex items-center gap-4 rounded-lg px-4 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <IdCard className="h-5 w-5" />
                    {!isCollapsed && <span>ID-Cards</span>}
                  </Link>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">ID-Cards</TooltipContent>
                )}
              </Tooltip>
            </nav>
          </div>
        </div>
      </ResizablePanel>
    </TooltipProvider>
  );
};

export default SideBar;
