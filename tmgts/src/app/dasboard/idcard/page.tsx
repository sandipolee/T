// pages/index.tsx
import type { NextPage } from 'next'
import IdCard from './idcard'
import { Button } from '@/components/ui/button'
import DashboardHeader from '../../component/DashBoardHeader'
import Sidebar from '../../component/sidebar'

const Home: NextPage = () => {
  return (

    <div className="flex min-h-screen w-full bg-muted/40">

      <Sidebar/>

      <div className="flex flex-1 flex-col pl-64">
        
      <DashboardHeader/>
      <main className="flex-1 space-y-4 p-8 pt-6">
      <div className="">
      <h2 className="text-3xl font-bold tracking-tight">ID Card</h2>
          <IdCard
        studentName="Surya Thapa"
        studentId="5625052"
        class="2"
        dob="2073-06-24"
        address="Tusipur-07 Dang"
        transportLocation="Bhumke"
        validity="2080-12-31"    
        photoUrl="../student.jpg"
      />
      


      <div className="float-end ">
        <Button>
          Print
        </Button>
      </div>
          </div>
        </main>
      </div>
    </div>
    
      
  )
}

export default Home
