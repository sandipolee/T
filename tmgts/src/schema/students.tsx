import { Value } from "@radix-ui/react-select";
import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 1; // 1MB


const  StudentSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  fathersname: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  mothername: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  mobileNum: z.string().min(10, {
    message: "phonemost be 10 characters.",
  }),
  parentsphone: z.string().min(10, {
    message: "phonemost be 10 characters.",
  }),
  travellinglocation: z.string().min(2, {
    message: "pickup location is required",
  }),
  dob: z
    .string({required_error: "Date of Birth is required",})
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
      
    })
    .transform((date) => new Date(date)),

  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required",
  }),
  studentClass: z.enum(["11", "12", "bachelor"], {
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
    profilePic: z.instanceof(File).refine((file) => file.size <= 1000000, `Max image size is 1MB.`)
    .refine((file) => ['image/jpg','image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'].includes(file.type), "Only .jpg, .png, .gif, and .svg formats are supported."),
  
    travellingstartdate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    })
    .transform((date) => new Date(date)),
});

export default StudentSchema;
