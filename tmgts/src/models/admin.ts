import mongoose, { Schema, Document } from "mongoose";

export interface AdminDocument extends Document {
  username: string;
  name: string;
  mobileNum: string;
  email: string;
  gender: string;
  registrationDate: Date;
  isMasterAdmin: boolean;
  password: string;
}

const adminSchema: Schema<AdminDocument> = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }, // `select: false` means password won't be included by default in queries
  mobileNum: { type: String },
  gender: { type: String },
  registrationDate: { type: Date, default: Date.now },
  isMasterAdmin: { type: Boolean, default: false },
});

// Export model with correct naming conventions
export const Admin = mongoose.models?.admins || mongoose.model<AdminDocument>("admins", adminSchema);

export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return

  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not defined')

  return mongoose.connect(uri)
}
