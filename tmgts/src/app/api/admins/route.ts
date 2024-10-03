import { NextResponse } from 'next/server';
import { Admin } from '@/models/admin'; // Assuming you have a DB connection helper
import dbConnect from '@/lib/DBconnect';
import bcrypt from 'bcryptjs'

// Fetch all admins
export async function GET() {
  await dbConnect();
  const admins = await Admin.find().select("-password"); // Exclude password
  return NextResponse.json(admins);
}

// Create a new admin
export async function POST(req: Request) {
  try {
    await dbConnect();

    const data = await req.json();  // Parse request body

    const { username, name, email, password, mobile, gender, isMasterAdmin } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      username,
      name,
      email,
      password: hashedPassword,
      mobileNum: mobile,
      gender,
      isMasterAdmin,
      registrationDate: new Date(),
    });

    await newAdmin.save();
    return NextResponse.json({ success: true, admin: newAdmin });

  } catch (error) {
    console.error("Error creating admin:", error);  // Log detailed error
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
