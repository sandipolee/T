"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { AddStudent } from "./addStudent";
import { useRouter } from 'next/navigation';

const AddStudentPage = () => {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => router.back()} 
            aria-label="Go back"
            className="mr-1 p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </Button>
          <h1 className="text-2xl font-bold">Add New Student</h1>
        </div>
        <AddStudent />
      </div>
    </div>
  );
};

export default AddStudentPage;
