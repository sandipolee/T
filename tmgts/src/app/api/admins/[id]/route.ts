import { NextResponse } from 'next/server';
import { Admin } from '@/models/admin';

import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/DBconnect';

// Update an admin
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const data = await req.json();
  const { username, name, email, mobile, gender, isMasterAdmin } = data;
  
  let updateFields = { username, name, email, mobileNum: mobile, gender, isMasterAdmin };

  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(params.id, updateFields, { new: true });
    if (!updatedAdmin) throw new Error("Admin not found");
    return NextResponse.json({ success: true, admin: updatedAdmin });
  } catch (error) {
    const err = error as string;
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}

// Delete an admin
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const deletedAdmin = await Admin.findByIdAndDelete(params.id);
    if (!deletedAdmin) throw new Error("Admin not found");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
