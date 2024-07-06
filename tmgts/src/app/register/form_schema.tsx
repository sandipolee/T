import { Value } from "@radix-ui/react-select";
import { z } from "zod";

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
});

export default FormSchema;
