import React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

export default function AdminTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Mobile</TableHead>
          <TableHead>Master Admin</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, index) => (
          <TableRow key={index}>
            <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[60px]" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[40px]" /></TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm" disabled>
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}