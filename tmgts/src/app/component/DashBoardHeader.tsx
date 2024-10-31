'use client';
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react"; // or auth.js equivalent
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import LogoutButton from "./LogoutButton";
import { User } from 'next-auth';
import HeaderSkeleton from "./hedderSkeleton";
import { useRouter } from "next/navigation";
import DynamicBreadcrumb from "./DynamicBreadcrumb";
import { ModeToggle } from "./theme-toggle";

const DashboardHeader = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <HeaderSkeleton />;
  }

  if (!session) {
    router.refresh;
    return <p>You are not logged in.</p>;
  }

  const isMasterAdmin = session.user?.isMasterAdmin;
  const role = isMasterAdmin ? "MasterAdmin" : "Admin";
  const user: User = session?.user as User;

  return (
    <header className="sticky top-0 z-10 flex justify-between h-14 items-center gap-4  border-b bg-background px-6">
      <DynamicBreadcrumb></DynamicBreadcrumb>
      <div className="flex  justify-between gap-2">
        <div className=" mr-2">
        <ModeToggle />
        </div>
      <div className="ml-auto flex items-center gap-4">
        
        <div className="text-right">
          <p className="text-sm font-medium">{user?.name || "Admin"}</p>
          <p className="text-xs text-muted-foreground">{role}</p> {/* Display role */}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              {user?.name?.[0] || "A"} {/* Show user's first letter or default */}
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {isMasterAdmin && ( /* Conditionally show Settings if isMasterAdmin is true */
              <>
                <DropdownMenuItem>
                  <Link href="/dasboard/setting" className="text-sm">Manage Users</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem>
              <LogoutButton /> {/* Use the client-side LogoutButton */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      </div>
      
    </header>
  );
};

export default DashboardHeader;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await getSession(context);
  return {
    props: { session },
  };
};
