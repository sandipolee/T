import {
  
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  BusFront,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NavSidebar from "./nav";
import Image from 'next/image';

const Sidebar = () => {
  return (
    <div className="  hidden border-r bg-muted/40  md:block ">
      <div className=" md:w-[220px] lg:w-[280px] fixed bg-slate-50 z-40 flex h-full max-h-screen flex-col gap-2 ">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <BusFront  className="h-6 w-6" />
            <span className="">TMGTS</span>
          </Link>
        </div>
        <div className="flex-1">
          <NavSidebar></NavSidebar>
        </div>
        
      </div>
    </div>
  );
};

export default Sidebar;
