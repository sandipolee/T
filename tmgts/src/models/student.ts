import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for Student
export interface IStudent extends Document {
  registerID: string;
  name: string;
  mobileNum: string;
  parentsphone: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: Date;
  studentClass: string;
  course: string;
  fathersname: string;
  mothername: string;
  travellinglocation: string;
  travellingstartdate: Date;
  profilePic: string;
  verify: boolean;
}

// Define the schema for Student
const StudentSchema: Schema = new Schema({
  registerID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  mobileNum: { type: String, required: true },
  parentsphone: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  dob: { type: Date, required: true },
  studentClass: { type: String, required: true },
  course: { type: String, required: true },
  fathersname: { type: String, required: true },
  mothername: { type: String, required: true },
  travellinglocation: { type: String, required: true },
  travellingstartdate: { type: Date, required: true },
  profilePic: { type: String },
  verify: { type: Boolean, default: false },
});

// Check if the model is already compiled
const Student: Model<IStudent> = mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);

export default Student;
