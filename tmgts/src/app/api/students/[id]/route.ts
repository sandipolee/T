import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import mongoose from 'mongoose';
import Student from '@/models/student';
import dbConnect from '@/lib/DBconnect';

// Connect to MongoDB


// Update student data
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const formData = await req.formData();
    const studentData = JSON.parse(formData.get('student') as string);
    
    // Handle image upload
    let profilePicUrl = studentData.profilePic;
    const file = formData.get('file');
    if (file && typeof file === 'object') {
      const result = await cloudinary.uploader.upload(file as unknown as string, {
        folder: 'students',
      });
      profilePicUrl = result.secure_url;
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      params.id,
      { ...studentData, profilePic: profilePicUrl },
      { new: true }
    );

    return NextResponse.json(updatedStudent, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating student', error }, { status: 500 });
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
