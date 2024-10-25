"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import CreateAdmin from "./createAdmin";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ConfirmationDialog from "@/app/component/ConfirmationDialog";
import AdminTableSkeleton from "@/app/component/admnsTableSkeleton";

interface Admin {
  _id: string;
  username: string;
  name: string;
  email: string;
  mobileNum: string;
  gender: string;
  registrationDate: string;
  isMasterAdmin: boolean;
  __v?: number;
}

// Fetch admins from the API using async function
const fetchAdmins = async (): Promise<Admin[]> => {
  const response = await fetch("/api/admins");
  if (!response.ok) {
    throw new Error("Failed to fetch admins");
  }
  return response.json();
};

export default function SettingsPage() {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  // React Query setup
  const queryClient = useQueryClient();

  const { data: admins = [], isLoading, isError, error } = useQuery({
    queryKey: ["admins"],
    queryFn: fetchAdmins,
  });

  const [editingAdminIndex, setEditingAdminIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    _id: "",
    name: "",
    username: "",
    email: "",
    gender: "",
    mobile: "",
    isMasterAdmin: false,
    password: "",
  });

  const handleEditClick = (index: number) => {
    setEditingAdminIndex(index);

    // Map Admin object to form data
    const admin = admins[index];
    const editForm = {
      _id: admin._id,
      name: admin.name,
      username: admin.username,
      email: admin.email,
      gender: admin.gender,
      mobile: admin.mobileNum,
      isMasterAdmin: admin.isMasterAdmin,
      password: "",
    };

    setEditForm(editForm);
  };
  const handleDeleteClick = (index: number) => {
    setDeleteIndex(index);
    setIsDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteIndex !== null) {
      const adminId = admins[deleteIndex]._id;

      try {
        const response = await fetch(`/api/admins/${adminId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete admin");
        }

        queryClient.invalidateQueries({ queryKey: ["admins"] });
        setIsDialogOpen(false); // Close the dialog
      } catch (error) {
        console.error("Error deleting admin:", error);
      }
    }
  };
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleEditSelectChange = (value: string) => {
    setEditForm({ ...editForm, gender: value });
  };

  const handleEditSwitchChange = (checked: boolean) => {
    setEditForm({ ...editForm, isMasterAdmin: checked });
  };

  const handleCancelEdit = () => {
    setEditingAdminIndex(null);
    setEditForm({
      _id: "",
      name: "",
      username: "",
      email: "",
      gender: "",
      mobile: "",
      isMasterAdmin: false,
      password: "",
    });
  };

  const handleUpdateAdmin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/admins/${editForm._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        throw new Error("Failed to update admin");
      }

      const updatedAdmin = await response.json();
      // Invalidate and refetch the admin data
      queryClient.invalidateQueries({ queryKey: ["admins"] });

      handleCancelEdit();
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add Admin</Button>
        </DialogTrigger>
        <DialogContent>
          <CreateAdmin />
        </DialogContent>
      </Dialog>

      <ConfirmationDialog 
        open={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        onConfirm={confirmDelete} 
      />

      <Card>
        <CardHeader>
          <CardTitle>Existing Admins</CardTitle>
          <CardDescription>Manage existing administrator accounts</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <AdminTableSkeleton />
          ) : isError ? (
            <p>Error: {error.message}</p>
          ) : (
            
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
                  <TableRow key={admin._id}>
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
                        <TableCell>{admin.name}</TableCell>
                        <TableCell>{admin.username}</TableCell>
                        <TableCell>{admin.email}</TableCell>
                        <TableCell>{admin.gender}</TableCell>
                        <TableCell>{admin.mobileNum}</TableCell>
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
                              <DropdownMenuItem onClick={() => handleDeleteClick(index)}   className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
