"use client"
import { useState } from "react"
import {
  UserPlus,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AddStudent } from "./addStudent"
import StudentTable from "./studentTable"

export default function StudentManagementDashboard() {
  

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <main className="flex-1 space-y-4 p-4">
                <StudentTable />
      </main>
    </div>
  )
}