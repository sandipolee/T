import StudentTableSkeleton from "@/app/component/studenTableSkliton";
import { Loader2 } from "lucide-react";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className="flex h-screen bg-background">
   
    <div className="flex p-8">
      
      </div>
      <div className="mt-8 flex items-center justify-center w-full">
        <Loader2 className=" m-auto h-16 w-16 animate-spin text-primary" />
      </div>
  </div>
  }