import { z } from 'zod';

// Zod validation schema
const adminSchemaZod = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }), // Minimum length check
  mobileNum: z.string().optional(), // Optional field
  gender: z.enum(["Male", "Female", "other"]).optional(), // Enum for predefined gender options
  registrationDate: z.date().default(new Date()), // Defaults to current date
  isMasterAdmin: z.boolean().optional(), // Optional, default handled by Mongoose
});

export default adminSchemaZod;

