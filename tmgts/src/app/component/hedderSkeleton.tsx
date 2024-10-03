import { Skeleton } from "@/components/ui/skeleton"

export default function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-5 w-24" />
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Skeleton className="h-9 w-[200px] md:w-[300px]" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </header>
  )
}