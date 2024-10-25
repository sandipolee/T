"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { IDCardPreview } from "./IDCardPreview"
import { StudentSelector } from "./studentSelector"
import { Student as LocalStudent, students } from "@/types/student"
import { Student as IDCardStudent } from "./IDCardPreview"


export default function StudentIDCardPrinter() {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [showPreview, setShowPreview] = useState(false)

  const handlePrintIDCards = () => {
    setShowPreview(true) 
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Student ID Card Printer</h1>
      {!showPreview ? (
        <>
         <div className="mt-4">
            <Button
              onClick={handlePrintIDCards}
              disabled={selectedStudents.length === 0}
            >
              Print ID Cards
            </Button>
          </div>
          <StudentSelector
            selectedStudents={selectedStudents}
            setSelectedStudents={setSelectedStudents}
          />
  
        </>
      ) : (
        <div>
          
        </div>
          
      )}
    </div>
  )
}  

