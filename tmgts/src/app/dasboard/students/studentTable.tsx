import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  VisibilityState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
  ArrowUpDown,
  SlidersHorizontal,
  UserPlus,
  UserX,
  Loader2,
} from "lucide-react";
import ConfirmationDialog from "@/app/component/ConfirmationDialog";
import TableSkeleton from "@/components/TableSkeleton"; 
import { useRouter } from 'next/navigation';

interface Student {
  _id: string;
  profilePic: string;
  name: string;
  travellinglocation: string;
  studentClass: string;
  course: string;
  travellingstartdate: string;
  fathersname:string,
}

const columnHelper = createColumnHelper<Student>();

const StudentTable = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    "fathersname": false, 
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const {
    data: studentsData,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["students", pageIndex, pageSize, globalFilter],
    queryFn: async () => {
      const { data } = await axios.get<{ data: Student[], totalCount: number }>(
        `/api/students?page=${pageIndex + 1}&pageSize=${pageSize}&search=${globalFilter}`
      );
      return data;
    },
  });

  const students = studentsData?.data || [];
  const totalCount = studentsData?.totalCount || 0;

  const columns = [
    columnHelper.accessor("profilePic", {
      id: "Photo",
      cell: (info) => (
        <Avatar>
          <AvatarImage src={info.getValue() || "/api/placeholder/32/32"} alt="Student" />
          <AvatarFallback>ST</AvatarFallback>
        </Avatar>
      ),
      header: () => <span>Image</span>,
      enableHiding: false,
    }),
    columnHelper.accessor("name", {
      id: "Name",
      cell: (info) => info.getValue(),
      header: ({ column }) => (
        <Button
        className="p-1"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    }),
    columnHelper.accessor("travellinglocation", {
      id: "Pickup Location",
      header: () => "Pickup Location",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("studentClass", {
      id: "Class",
      header: () => <span>Class</span>,
    }),
    columnHelper.accessor("course", {
      id: "Course",
      header: "Course",
    }),
    columnHelper.accessor("travellingstartdate", {
      id: "Start Date",
      header: ({ column }) => (
        <Button
        className="p-1"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Started Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor("fathersname", {
      id: "fathersname",
      header: "fathersname",
    }),
    columnHelper.display({
      id: "actions",
      cell: (info) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEditClick(info.row.original)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setDeleteIndex(info.row.index);
                setIsDialogOpen(true);
              }}
              className="text-destructive"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableHiding: false,
    }),
  ];

  const table = useReactTable({
    data: students,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    pageCount: Math.ceil(totalCount / pageSize),
    state: {
      globalFilter,
      sorting,
      columnVisibility,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: true,
  });

  const handleEditClick = (student: Student) => {
    router.push(`/dasboard/students/edit/${student._id}`);
  };

  const confirmDelete = async () => {
    if (deleteIndex !== null) {
      const studentId = students[deleteIndex]._id;

      try {
        const response = await fetch(`/api/students/${studentId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete student");
        }

        queryClient.invalidateQueries({ queryKey: ["students"] });
        setIsDialogOpen(false);
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

 

  if (isError) {
    return <div>Error loading data</div>;
  }
  
  return (
    <Card className="w-full border-none drop-shadow-none bg-zinc-50 dark:bg-zinc-900">
      <ConfirmationDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={confirmDelete}
      />

      <CardHeader className="py-4">
        <div className="flex items-center justify-between">
          <CardTitle className="dark:text-gray-100">Student Management</CardTitle>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => router.push('/dasboard/students/add')}
              className="dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="w-[200px] pl-8 dark:bg-zinc-800 dark:border-gray-700"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="ml-auto dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  View
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[150px] dark:bg-zinc-800 dark:border-gray-700">
                <DropdownMenuLabel className="dark:text-gray-100">Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator className="dark:border-gray-700" />
                {table
                  .getAllColumns()
                  .filter(
                    (column) =>
                      typeof column.accessorFn !== "undefined" && column.getCanHide()
                  )
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700">
        <Table>
          <TableHeader className="border dark:border-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="dark:border-gray-700">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="dark:text-gray-300">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading || isFetching ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center dark:text-gray-300">
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-gray-400 animate-spin mr-2" />
                    <span className="text-gray-500 dark:text-gray-400">Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <UserX className="w-10 h-10 text-gray-400 mb-2" />
                    <span className="text-lg font-medium text-gray-900 dark:text-gray-100">No students found</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filters</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="dark:border-gray-700">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="dark:text-gray-300">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="flex items-center justify-between px-6 bg-white dark:bg-zinc-800 pt-2 border-t border-gray-200 dark:border-gray-700">
        <div className="flex-1 text-sm text-muted-foreground dark:text-gray-400">
          {isFetching ? 'Updating...' : `${totalCount} total students`}
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium dark:text-gray-300">Rows per page</p>
            <Select>
              <SelectTrigger className="h-8 w-[70px] dark:border-gray-700 dark:bg-zinc-800">
                <SelectValue placeholder={pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top" className="dark:bg-zinc-800 dark:border-gray-700">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium dark:text-gray-300">
            Page {pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex dark:border-gray-700 dark:hover:bg-gray-800"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex dark:border-gray-700 dark:hover:bg-gray-800"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default StudentTable;
