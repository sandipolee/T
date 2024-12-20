"use client";

import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  isCollapsed: boolean;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, text, isCollapsed, isActive }) => {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={`rounded-sm flex items-center gap-2 px-4 py-2 transition-colors
            ${isActive 
              ? 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/60 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100'
            }
            ${isCollapsed ? 'justify-center' : ''}
          `}
        >
          {icon}
          {!isCollapsed && <span>{text}</span>}
        </Link>
      </TooltipTrigger>
      {isCollapsed && <TooltipContent side="right">{text}</TooltipContent>}
    </Tooltip>
  );
};

export default NavItem;
