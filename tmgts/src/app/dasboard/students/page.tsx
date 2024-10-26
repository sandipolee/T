"use client"
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