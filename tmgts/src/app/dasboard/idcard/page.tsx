"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { IDCardPreview } from "./IDCardPreview"
import { StudentSelector } from "./studentSelector"
import { IStudent } from "@/models/student"

export default function StudentIDCardPrinter() {
  const [selectedStudents, setSelectedStudents] = useState<IStudent[]>([])
  const [showPreview, setShowPreview] = useState(false)

  const handleShowPreview = () => {
    setShowPreview(true)
  }

  const handleBackToSelection = () => {
    setShowPreview(false)
  }

  const handleStudentSelection: React.Dispatch<React.SetStateAction<IStudent[]>> = (students) => {
    setSelectedStudents(students);
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Student ID Card Printer</h1>
      {!showPreview ? (
        <>
          <StudentSelector
            selectedStudents={selectedStudents}
            setSelectedStudents={handleStudentSelection}
          />
          <Button 
            onClick={handleShowPreview}
            disabled={selectedStudents.length === 0}
          >
            Preview ID Cards
          </Button>
        </>
      ) : (
        <IDCardPreview 
          selectedStudents={selectedStudents}
          onBack={handleBackToSelection} 
        />
      )}
    </div>
  )
}
