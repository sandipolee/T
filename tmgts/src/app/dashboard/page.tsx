import { Button } from "@/components/ui/button"
import Sidebar from "./sidebar"
import Navbar from "./navbar"
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"




async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "verified",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "verified",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "verified",
      email: "m@example.com",
    }
    
  ]
}

const dashboard=async ()=> {
  const data = await getData()
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
     <Sidebar></Sidebar>
      <div className="flex flex-col">
        <Navbar></Navbar>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
        </main>
      </div>
    </div>
  )
}

export default dashboard;




