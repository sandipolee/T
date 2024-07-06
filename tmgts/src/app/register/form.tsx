"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import { useState } from "react";
import FormSchema from "./form_schema";

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


  const getCourses = (selectedClass: string) => {
    switch (selectedClass) {
      case '11':
        return ['S1', 'S2', 'S3', 'S4', 'S5' ];
      case '12':
        return ['M1', 'M2', 'M3', 'M4', 'M5' ];
      case 'bachelor':
        return ['BCA', 'BBS', 'BSC'];
      default:
        return [];
    }
  }


function onSubmit(data: z.infer<typeof FormSchema>) {
  toast( <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  </pre>);
  
}

export function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });
  const listItems = pick_location.map((data, index) => (
    // eslint-disable-next-line react/jsx-key
    <SelectItem value={data.value}> {data.display} </SelectItem>
  ));

  const [date, setDate] = useState<string>("");

  return (
    <>
      <Toaster />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>pick up location</FormLabel>
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
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Date of birth</FormLabel>
                <FormControl>
                  <NepaliDatePicker
                    inputClassName="form-control flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    className="mt-2"
                    value= "" 
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
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Gender</FormLabel>
                <FormControl>
                <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div  className=" grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="class"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Class </FormLabel>
                <FormControl>
                <Select onValueChange={field.onChange}>
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
                <FormLabel> course </FormLabel>
                <FormControl>
                <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="course" />
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
          </div>
          
          
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
