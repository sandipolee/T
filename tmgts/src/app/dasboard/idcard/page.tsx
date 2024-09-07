// pages/index.tsx
import type { NextPage } from 'next'
import IdCard from './idcard'
import Navbar from '../navbar'
import Sidebar from '../../component/sidebar'
import { Button } from '@/components/ui/button'

const Home: NextPage = () => {
  return (

    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar></Sidebar>
      <div className="flex flex-col z-0">
        <Navbar></Navbar>
        <main className="">
          <div className="container mx-auto py-20 space-y-6">
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
