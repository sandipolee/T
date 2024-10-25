import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import Student from '@/models/student'; // Adjust the import path to your project structure
import dbConnect from '@/lib/DBconnect';

function generateRandomRegisterID(): string {
  const randomNum = Math.floor(100 + Math.random() * 900); // Generates a random number between 100 and 999
  return randomNum.toString(); // Convert the number to a string
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const DataAll = await req.formData();
    
    // Extract file and other fields from formData
    const file = DataAll.get("profilePic") as File | null; // 'profilePic' must match your frontend key name
    const name = DataAll.get('name') as string;
    const mobileNum = DataAll.get('mobileNum') as string;
    const parentsphone = DataAll.get('parentsphone') as string;
    const gender = DataAll.get('gender') as string;
    const dob = DataAll.get('dob') as string;
    const studentClass = DataAll.get('studentClass') as string;
    const course = DataAll.get('course') as string;
    const fathersname = DataAll.get('fathersname') as string;
    const mothername = DataAll.get('mothername') as string;
    const travellinglocation = DataAll.get('travellinglocation') as string;
    const travellingstartdate = DataAll.get('travellingstartdate') as string;

    // Default profile pic URL
    let profilePicUrl = 'Error handling';

    if (file && file.size > 0) {
      // Convert the file to a base64 string for Cloudinary upload
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64File = buffer.toString('base64');
      const uploadResult = await cloudinary.uploader.upload(`data:${file.type};base64,${base64File}`, {
        folder: 'students',
      });
      profilePicUrl = uploadResult.secure_url; // Assign the uploaded image URL
    }

    // Create new student with the extracted form data
    const registerID = generateRandomRegisterID();

    const newStudent = new Student({
      registerID,
      name,
      mobileNum,
      parentsphone,
      gender,
      dob,
      studentClass,
      course,
      fathersname,
      mothername,
      travellinglocation,
      travellingstartdate,
      profilePic: profilePicUrl, // Store URL not file
      verifiedByAdmin: false, // Default to false
      registrationDate: new Date(), // Set registration date
    });

    // Save the student to the database
    await newStudent.save();

    return NextResponse.json(newStudent, { status: 201 });

  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json({ message: 'Error creating student', error }, { status: 500 });
  }
}

// GET: Fetch students with search and pagination
export async function GET(req: NextRequest) {
  await dbConnect();
  
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
    const search = searchParams.get('search') || '';

    const skip = (page - 1) * pageSize;

    // Create a search query
    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { registerID: { $regex: search, $options: 'i' } },
            { studentClass: { $regex: search, $options: 'i' } },
            { course: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    // Fetch students based on search and pagination
    const students = await Student.find(searchQuery)
      .skip(skip)
      .limit(pageSize)
      .lean();

    // Get total count for pagination
    const totalCount = await Student.countDocuments(searchQuery);

    return NextResponse.json({ data: students, totalCount }, { status: 200 });
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ message: 'Error fetching students', error }, { status: 500 });
  }
}
