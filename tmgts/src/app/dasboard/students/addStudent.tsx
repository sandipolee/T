"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeEvent, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import StudentSchema from "@/schema/students";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import { Loader2, PlusCircle, Upload, X } from "lucide-react";
import { CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion"

const pick_location = [
  {
    value: "tulsipur",
    display: "Tulsipur",
  },
  {
    value: "salyan",
    display: "Salyan",
  },
  {
    value: "Luham",
    display: "Luham",
  },
  {
    value: "kavra",
    display: "kavra",
  },
  {
    value: "darimjula",
    display: "Darimjula",
  },
  {
    value: "phalbang",
    display: "Phalabang",
  },
  {
    value: "Kathmandu",
    display: "Kathmandu",
  },
  {
    value: "palpa",
    display: "Palpa",
  },
  {
    value: "rolpa",
    display: "rolpa",
  },
  {
    value: "lanti",
    display: "lanti",
  },
];

interface formStudent {
  name: string;
  mobileNum: string;
  gender: "Male" | "Female" | "Other";
  dob: Date;
  studentClass: "11" | "12" | "bachelor";
  course: string;
  fathersname: string;
  mothername: string;
  travellinglocation: string;
  travellingstartdate: Date;
  profilePic: File | null;
  parentsphone: string;
}

export function AddStudent() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [course, setsourse] = useState(["defont"]);
  const [formError, setFormError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // let courseItems:React.ReactNode;

  const form = useForm<z.infer<typeof StudentSchema>>({
    resolver: zodResolver(StudentSchema),
    defaultValues: {
      name: "",
      mobileNum: "",
      acceptTerms: true,
    },
  });
  const listItems = pick_location.map((data) => (
    // eslint-disable-next-line react/jsx-key
    <SelectItem value={data.value}> {data.display} </SelectItem>
  ));

  function handleClassChange(value: string) {
    console.log(value);

    if (value == "11") {
      setsourse(["M1", "M2", "M3"]);
    } else if (value == "12") {
      setsourse(["M1", "M2", "M3"]);
    } else if (value == "bachelor") {
      setsourse(["BCA", "BBS"]);
    } else {
      setsourse([""]);
    }
  }
  const queryClient = useQueryClient();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("profilePic", file);

    }
    
  };
  const handleRemove = () => {
    setImagePreview(null);
    form.reset();
    setUploadProgress(0);
  };

  //*************** React query*********** */

  const AddStudent = async (
    formData: FormData
  ): Promise<formStudent> => {
    const response = await axios.post("/api/students", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  };


  const { mutate, isPending: isLoading } = useMutation<
  formStudent,
    Error,
   FormData
  >({
    mutationFn: AddStudent,
    onSuccess: () => {
      
      toast({
        title: "Success",
        description: "student Upload sucessfull ",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["students"] });
     
    },
    onError: (error) => {
      setFormError(error.message);
    },
  });

  async function onSubmit(data: Omit<formStudent, "_id">) {

   
    if (!imageFile) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please upload a profile picture.",
      });
      return;
    }
   
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("mobileNum", data.mobileNum);
    formData.append("gender", data.gender);
    formData.append("dob", data.dob.toISOString());
    formData.append("studentClass", data.studentClass);
    formData.append("course", data.course);
    formData.append("fathersname", data.fathersname);
    formData.append("mothername", data.mothername);
    formData.append("travellinglocation", data.travellinglocation);
    formData.append("travellingstartdate", data.travellingstartdate.toISOString());
    formData.append("parentsphone", data.parentsphone);
    formData.append("profilePic", imageFile);

    mutate(formData);

  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" grid grid-cols-2 gap-10 pb-10 max-sm:grid-cols-none max-sm:px-4"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>YOUR NAME</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobileNum"
            render={({ field }) => (
              <FormItem>
                <FormLabel>MOBILE NUMBER</FormLabel>
                <FormControl>
                  <Input placeholder="Phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase"> Gender</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase"> Date of birth</FormLabel>
                <FormControl>
                  <NepaliDatePicker
                    inputClassName="form-control flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    className="mt-2"
                    value=""
                    onChange={field.onChange}
                    options={{ calenderLocale: "ne", valueLocale: "en" }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className=" grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="studentClass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase"> Class </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value: string) => {
                        handleClassChange(value);
                        field.onChange(value);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="11">11</SelectItem>
                        <SelectItem value="12">12</SelectItem>
                        <SelectItem value="bachelor">Bachelor</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase"> course </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {course.map((data) => (
                          // eslint-disable-next-line react/jsx-key
                          <SelectItem value={data}> {data} </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="fathersname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase">Fathers Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mothername"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase">Mother's Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parentsphone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase">Parent's Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <Separator />
          <FormField
            control={form.control}
            name="travellinglocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TRAVELLING LOCATION</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>{listItems}</SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="travellingstartdate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TRAVELLING Start DATE</FormLabel>
                <FormControl>
                  <NepaliDatePicker
                    inputClassName="form-control flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    className="mt-2"
                    value=""
                    onChange={field.onChange}
                    options={{ calenderLocale: "ne", valueLocale: "en" }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profilePic"
            render={() => (
              <FormItem>
                <FormLabel>profile picture </FormLabel>
                <FormControl>
                  {!imagePreview ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <Upload className="h-12 w-12 text-gray-400" />
                          <span className="mt-2 text-sm font-medium text-gray-700">
                            Click to upload
                          </span>
                          <span className="mt-1 text-xs text-gray-500">
                            PNG, JPG (max. 1MB)
                          </span>
                        </div>
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="relative">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        width={200}
                        height={200}
                        className="rounded-md object-cover "
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={handleRemove}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </FormControl>
                <FormDescription>
                  Upload an image file (max 1MB).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <CardFooter className="flex flex-col space-y-2">
            {isUploading && (
              <Progress value={uploadProgress} className="w-full" />
            )}
          </CardFooter>

          <Button className="w-full my-20" type="submit">
          
          {isLoading ? (
           <>
           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
           Uploading...
         </>
          ) : (
            "Submit"
          )}
       
          </Button>
        </div>
      </form>
    </Form>
  );
}
