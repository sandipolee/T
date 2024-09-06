import { Value } from "@radix-ui/react-select";
import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 1; // 1MB


const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  fathers_name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  mothers_name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phone: z.string().min(10, {
    message: "phonemost be 10 characters.",
  }),
  parents_phone: z.string().min(10, {
    message: "phonemost be 10 characters.",
  }),
  location: z.string().min(2, {
    message: "pickup location is required",
  }),
  dob: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    })
    .transform((date) => new Date(date)),

  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
  }),
  class: z.enum(["11", "12", "bachelor"], {
    required_error: "Class is required",
  }),
  course: z.string().min(1, { message: "Course is required" }),
  acceptTerms: z
    .boolean().default(false)
    .describe("Accept terms and conditions.")
    .refine((value) => value, {
      message: "You must accept the terms and conditions.",
      path: ["acceptTerms"],
    }),
    travlingDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    })
    .transform((date) => new Date(date)),
    image:  z
    .instanceof(File)
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, {
      message: "File size must be less than 1MB.",
    })
    .refine((file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type), {
      message: "Only jpg, png, and gif formats are allowed.",
    }),
});

export default FormSchema;
