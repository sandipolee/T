"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bus, CreditCard, GraduationCap, Home, MoreHorizontal, PlusCircle, Search, Settings, Users2, Play, IdCard } from "lucide-react"

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const initialAdmins = [
  { name: "John Doe", username: "johnd", email: "john@example.com", gender: "Male", mobile: "1234567890", isMasterAdmin: true },
  { name: "Jane Smith", username: "janes", email: "jane@example.com", gender: "Female", mobile: "9876543210", isMasterAdmin: false },
  { name: "Bob Johnson", username: "bobj", email: "bob@example.com", gender: "Male", mobile: "5555555555", isMasterAdmin: false },
]

export default function SettingsPage() {
  const [admins, setAdmins] = useState(initialAdmins)
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    username: "",
    email: "",
    gender: "",
    mobile: "",
    isMasterAdmin: false,
  })
  const [editingAdminIndex, setEditingAdminIndex] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({
    name: "",
    username: "",
    email: "",
    gender: "",
    mobile: "",
    isMasterAdmin: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewAdmin({ ...newAdmin, [name]: value })
  }

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditForm({ ...editForm, [name]: value })
  }

  const handleSelectChange = (value: string) => {
    setNewAdmin({ ...newAdmin, gender: value })
  }

  const handleEditSelectChange = (value: string) => {
    setEditForm({ ...editForm, gender: value })
  }

  const handleSwitchChange = (checked: boolean) => {
    setNewAdmin({ ...newAdmin, isMasterAdmin: checked })
  }

  const handleEditSwitchChange = (checked: boolean) => {
    setEditForm({ ...editForm, isMasterAdmin: checked })
  }

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault()
    setAdmins([...admins, newAdmin])
    setNewAdmin({
      name: "",
      username: "",
      email: "",
      gender: "",
      mobile: "",
      isMasterAdmin: false,
    })
  }

  const handleEditClick = (index: number) => {
    setEditingAdminIndex(index)
    setEditForm(admins[index])
  }

  const handleCancelEdit = () => {
    setEditingAdminIndex(null)
    setEditForm({
      name: "",
      username: "",
      email: "",
      gender: "",
      mobile: "",
      isMasterAdmin: false,
    })
  }

  const handleUpdateAdmin = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingAdminIndex !== null) {
      const updatedAdmins = [...admins]
      updatedAdmins[editingAdminIndex] = editForm
      setAdmins(updatedAdmins)
      setEditingAdminIndex(null)
      setEditForm({
        name: "",
        username: "",
        email: "",
        gender: "",
        mobile: "",
        isMasterAdmin: false,
      })
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <aside className="fixed left-0 top-0 z-20 h-full w-64 border-r bg-background">
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="flex flex-col gap-4">
              <Link
                href="#"
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground"
              >
                <GraduationCap className="h-5 w-5" />
                <span className="text-lg font-semibold">Gyan Joti</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 rounded-lg px-4 py-2 text-muted-foreground hover:text-foreground"
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 rounded-lg px-4 py-2 text-muted-foreground hover:text-foreground"
              >
                <Bus className="h-5 w-5" />
                Routes
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 rounded-lg px-4 py-2 text-muted-foreground hover:text-foreground"
              >
                <Users2 className="h-5 w-5" />
                Students
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 rounded-lg px-4 py-2 text-muted-foreground hover:text-foreground"
              >
                <CreditCard className="h-5 w-5" />
                Payments
              </Link>
              <Link
                href="./idcard"
                className="flex items-center gap-4 rounded-lg px-4 py-2 text-muted-foreground hover:text-foreground"
              >
                <IdCard className="h-5 w-5" />
                ID Cards
              </Link>
            </nav>
          </div>
          <div className="border-t p-4">
            <Link
              href="#"
              className="flex items-center gap-4 rounded-lg bg-accent px-4 py-2 text-accent-foreground"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </div>
        </div>
      </aside>
      <div className="flex flex-1 flex-col pl-64">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6">
          <h1 className="text-lg font-semibold">Settings</h1>
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <Image
                      src="/placeholder.svg?height=32&width=32"
                      width={32}
                      height={32}
                      alt="Avatar"
                      className="rounded-full"
                    />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="flex-1 space-y-4 p-8 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Admin</CardTitle>
              <CardDescription>Create a new administrator account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddAdmin} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter admin name"
                      value={newAdmin.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      placeholder="Enter username"
                      value={newAdmin.username}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter admin email"
                      value={newAdmin.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select onValueChange={handleSelectChange} value={newAdmin.gender}>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input
                      id="mobile"
                      name="mobile"
                      placeholder="Enter mobile number"
                      value={newAdmin.mobile}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="master-admin"
                      checked={newAdmin.isMasterAdmin}
                      onCheckedChange={handleSwitchChange}
                    />
                    <Label htmlFor="master-admin">Is Master Admin</Label>
                  </div>
                </div>
                <Button type="submit">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Admin
                </Button>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Existing Admins</CardTitle>
              <CardDescription>Manage existing administrator accounts</CardDescription>
            </CardHeader>
            <CardContent>
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
                  {admins.map((admin, index) => (
                    <TableRow key={admin.username}>
                      {editingAdminIndex === index ? (
                        <TableCell colSpan={7}>
                          <form onSubmit={handleUpdateAdmin} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-name">Name</Label>
                                <Input
                                  id="edit-name"
                                  name="name"
                                  value={editForm.name}
                                  onChange={handleEditInputChange}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-username">Username</Label>
                                <Input
                                  id="edit-username"
                                  name="username"
                                  value={editForm.username}
                                  onChange={handleEditInputChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-email">Email</Label>
                                <Input
                                  id="edit-email"
                                  name="email"
                                  type="email"
                                  value={editForm.email}
                                  onChange={handleEditInputChange}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-gender">Gender</Label>
                                <Select onValueChange={handleEditSelectChange} value={editForm.gender}>
                                  <SelectTrigger id="edit-gender">
                                    <SelectValue placeholder="Select gender" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-mobile">Mobile Number</Label>
                                <Input
                                  id="edit-mobile"
                                  name="mobile"
                                  value={editForm.mobile}
                                  onChange={handleEditInputChange}
                                  required
                                />
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="edit-master-admin"
                                  checked={editForm.isMasterAdmin}
                                  onCheckedChange={handleEditSwitchChange}
                                />
                                <Label htmlFor="edit-master-admin">Is Master Admin</Label>
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button type="submit" variant="default">
                                Update Admin
                              </Button>
                              <Button type="button" variant="outline" onClick={handleCancelEdit}>
                                Cancel
                              </Button>
                            </div>
                          </form>
                        </TableCell>
                      ) : (
                        <>
                          <TableCell className="font-medium">{admin.name}</TableCell>
                          <TableCell>{admin.username}</TableCell>
                          <TableCell>{admin.email}</TableCell>
                          <TableCell>{admin.gender}</TableCell>
                          <TableCell>{admin.mobile}</TableCell>
                          <TableCell>{admin.isMasterAdmin ? "Yes" : "No"}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEditClick(index)}>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Change Role</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}