"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { AddStudent } from "./addStudent";
import { useRouter } from 'next/navigation';

const AddStudentPage = () => {
  const router = useRouter();

  return (
    <>
      <div className="px-5 sm:px-6 lg:px-8 py-2">
        <Button 
        className='rounded-sm'
          variant="outline" 
          onClick={() => router.back()} 
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </Button>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-10">
        <h1 className="text-2xl font-bold mb-6">Add New Student</h1>
        <AddStudent />
      </div>
    </>
  );
};

export default AddStudentPage;
