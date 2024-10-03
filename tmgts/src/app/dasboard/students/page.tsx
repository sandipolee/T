"use client"
import { useState, } from "react"

import {
  Bus,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  Search,
  Settings,
  UserPlus,
  Users2,
  X,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AddStudent } from "./addStudent"
import StudentTable from "./studentTable"

export default function Component() {
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [viewingStudent, setViewingStudent] = useState(null)
  const [newStudent, setNewStudent] = useState({
    name: "",
    mobileNum: "",
    gender: "",
    dob: "",
    class: "",
    course: "",
    fathersname: "",
    mothername: "",
    travellinglocation: "",
    travellingstartdate: "",
    profilePic: "",
  })
  const [isFormVisible, setIsFormVisible] = useState(false)


  const openEditModal = (student:any) => {
    setEditingStudent(student)
    setEditModalOpen(true)
  }

  const closeEditModal = () => {
    setEditingStudent(null)
    setEditModalOpen(false)
  }

  const openViewModal = (student:any) => {
    setViewingStudent(student)
    setViewModalOpen(true)
  }

  const closeViewModal = () => {
    setViewingStudent(null)
    setViewModalOpen(false)
  }
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
     

        <main className="flex-1 space-y-4 p-8 pt-6">
          
          {!isFormVisible && (
        <Button onClick={() => setIsFormVisible(true)} variant="outline">
          <UserPlus className="mr-2 h-4 w-4" /> Add Student
        </Button>
      )}

      {isFormVisible && (
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Add New Student</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsFormVisible(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <AddStudent></AddStudent>
        </div>
      )}
          
            <StudentTable>

            </StudentTable>
            
        </main>

    </div>
  )
}