import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import mongoose from 'mongoose';
import Student from '@/models/student';
import dbConnect from '@/lib/DBconnect';


// Get student data
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const student = await Student.findById(params.id);
    if (!student) {
      return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    }
    return NextResponse.json(student, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching student', error }, { status: 500 });
  }
}

// Update student data
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const id = params.id;
    const body = await req.json();

    const updatedStudent = await Student.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedStudent) {
      return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json(updatedStudent, { status: 200 });
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json({ message: 'Error updating student', error: (error as Error).message }, { status: 500 });
  }
}

// Delete student data
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    await Student.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Student deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting student', error }, { status: 500 });
  }
}
