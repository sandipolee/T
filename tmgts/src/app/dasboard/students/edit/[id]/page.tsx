"use client";

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Loader2,
  ArrowLeft
} from 'lucide-react';

interface Student {
  _id: string;
  profilePic: string;
  name: string;
  travellinglocation: string;
  studentClass: string;
  course: string;
  travellingstartdate: string;
  fathersname: string;
}

const EditStudentPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: student, isLoading, isError } = useQuery<Student>({
    queryKey: ['student', id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/students/${id}`);
      return data;
    },
  });

  const updateStudentMutation = useMutation({
    mutationFn: (updatedStudent: Student) =>
      axios.put(`/api/students/${id}`, updatedStudent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      router.push('/dasboard/students');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!student) return;

    const formData = new FormData(e.currentTarget);
    const updatedStudent = {
      ...student,
      name: formData.get('name') as string,
      travellinglocation: formData.get('travellinglocation') as string,
      studentClass: formData.get('studentClass') as string,
      course: formData.get('course') as string,
      travellingstartdate: formData.get('travellingstartdate') as string,
      fathersname: formData.get('fathersname') as string,
    };

    updateStudentMutation.mutate(updatedStudent);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading student data</div>;
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center">
        <Button 
          variant="ghost" 
          onClick={() => router.back()} 
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <CardTitle>Edit Student</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" defaultValue={student?.name} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="travellinglocation">Pickup Location</Label>
            <Input
              id="travellinglocation"
              name="travellinglocation"
              defaultValue={student?.travellinglocation}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="studentClass">Class</Label>
            <Input
              id="studentClass"
              name="studentClass"
              defaultValue={student?.studentClass}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="course">Course</Label>
            <Input id="course" name="course" defaultValue={student?.course} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="travellingstartdate">Start Date</Label>
            <Input
              id="travellingstartdate"
              name="travellingstartdate"
              type="date"
              defaultValue={student?.travellingstartdate ? new Date(student.travellingstartdate).toISOString().split('T')[0] : ''}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fathersname">Father&apos;s Name</Label>
            <Input
              id="fathersname"
              name="fathersname"
              defaultValue={student?.fathersname}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={updateStudentMutation.isPending}>
              {updateStudentMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Student'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditStudentPage;
