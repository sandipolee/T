import React, { useState, useRef, useEffect, useCallback } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from 'axios';
import { 
  useReactTable, 
  getCoreRowModel, 
  getFilteredRowModel, 
  getPaginationRowModel,
  ColumnDef,
  flexRender
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IStudent } from '@/models/student'
import { SearchX, Loader2 } from 'lucide-react'  // Import the SearchX and Loader2 icons
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
interface StudentSelectorProps {
  selectedStudents: IStudent[]
  setSelectedStudents: React.Dispatch<React.SetStateAction<IStudent[]>>
}

const fetchStudents = async (page: number, pageSize: number, search: string): Promise<{ data: IStudent[], totalCount: number }> => {
  const response = await fetch(`/api/students?page=${page}&pageSize=${pageSize}&search=${search}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

// New SearchInput component
const SearchInput = React.memo(({ onSearch }: { onSearch: (value: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <div className="flex items-center justify-between py-4">
      <Input
        placeholder="Search students..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="max-w-sm focus:outline-none focus:ring-0"
      />
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

export function StudentSelector({ selectedStudents, setSelectedStudents }: StudentSelectorProps) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState("")
  const [totalPages, setTotalPages] = useState(0)

  const {
    data,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["students", page, pageSize, search],
    queryFn: async () => {
      const { data } = await axios.get<{ data: IStudent[], totalCount: number }>(
        `/api/students?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(search)}`
      );
      setTotalPages(Math.ceil(data.totalCount / pageSize));
      return data;
    },
  });

  const students = data?.data || [];
  const totalCount = data?.totalCount || 0;

  const columns: ColumnDef<IStudent>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
    },
    {
      accessorKey: 'profilePic',
      header: 'Image',
      cell: ({ row }) => (
        <Avatar>
        <AvatarImage src={row.original.profilePic || "/api/placeholder/32/32"} alt="Student" />
        <AvatarFallback>ST</AvatarFallback>
      </Avatar>
      ),
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'registerID',
      header: 'Register ID',
    },
    {
      accessorKey: 'studentClass',
      header: 'Class',
    },
    {
      accessorKey: 'course',
      header: 'Course',
    },
  ]

  const table = useReactTable({
    data: students,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: (updater) => {
      if (typeof updater === 'function') {
        const newSelection = updater(table.getState().rowSelection)
        const selectedStudentData = students.filter((student, index) => 
          newSelection[index] === true
        )
        setSelectedStudents(selectedStudentData)
      }
    },
    state: {
      rowSelection: Object.fromEntries(
        selectedStudents.map(student => [students.findIndex(s => s._id === student._id), true])
      ),
    },
    pageCount: Math.ceil(totalCount / pageSize),
    manualPagination: true,
  })

  const handleSearch = useCallback((searchTerm: string) => {
    setSearch(searchTerm);
    setPage(1); // Reset to first page when searching
    refetch();
  }, [refetch]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    refetch();
  }

  if (isLoading) {
    return (
      <div>
        <SearchInput onSearch={handleSearch} />
        <div className="bg-white rounded-sm border border-gray-200">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
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
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Loader2 className="h-8 w-8 text-gray-400 animate-spin mb-2" />
                    <span className="text-gray-500">Loading students...</span>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  return (
    <div>
      <SearchInput onSearch={handleSearch} />
      <div className="bg-white rounded-sm border border-gray-200">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
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
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <SearchX className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-gray-500">No students found</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between space-x-2 py-4 px-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          Page {page} of {totalPages}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(1)}
            disabled={page === 1}
          >
            First
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          {[...Array(Math.min(5, totalPages))].map((_, index) => {
            const pageNumber = page - 2 + index;
            return pageNumber > 0 && pageNumber <= totalPages ? (
              <Button
                key={pageNumber}
                variant={pageNumber === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </Button>
            ) : null;
          })}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(totalPages)}
            disabled={page === totalPages}
          >
            Last
          </Button>
        </div>
      </div>
      </div>
      
    </div>
  )
}
