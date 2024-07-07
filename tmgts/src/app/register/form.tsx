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
import { Value } from "@radix-ui/react-select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

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

function onSubmit(data: z.infer<typeof FormSchema>) {
  toast(
    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    </pre>
  );
}

export function InputForm() {
  // let courseItems:React.ReactNode;

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

  const [course, setsourse] = useState(["defont"]);

  // let course: string[] = ["defont"];

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

    console.log(course);
  }

  return (
    <>
      <Toaster />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" grid grid-cols-2 gap-10 py-10 max-sm:grid-cols-none max-sm:px-4"
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
              name="phone"
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
                name="class"
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
              name="fathers_name"
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
              name="mothers_name"
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
              name="parents_phone"
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
              name="location"
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
              name="travlingDate"
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
            <Separator />
            <h3 className="font-bold text-lg">
              विद्यार्थी तथा अभिभावकले पालना गर्नुपर्ने नियमहरु ः
            </h3>
            <ul className="font-semibold text-sm space-y-3">
              <li>
                १. सवारी साधन प्रयोग गर्ने विद्यार्थीहरुले यो फारम अनिवार्यरुपमा
                भर्नुपर्नेछ र श्रावण २०७६ देखि सवार लाग्नेछ ।
              </li>
              <li>
                २. चालु शैक्षिक सत्रमा जम्मा १० महिनाको मात्र सवारी शुल्क
                लाग्नेछ ।
              </li>
              <li>
                ३. यदि विचमा विद्यार्थीले कुनै कारण देखाएर सवारी साधन प्रयोग
                गर्न छाडेमा विद्यार्थी वा अभिभावकले लिखित जानकारी गराउनु पर्ने छ
                । अन्यथा सवारी साधन शुल्क लागिरहनेछ ।
              </li>
              <li>
                ४. सवारी साधन शुल्क प्रत्यक महिनाको १० गते सम्म मासिक शुल्क संगै
                वुझाउनु पर्ने छ ।
              </li>
              <li>
                ५. सवारी साधन शुल्क हरेक महिनाको १० गते सम्म नबुझाएमा पहिलो १०
                दिन भित्रमा बुझाए बिलम्ब शुल्क रु.२० त्यसपछि मासिक बिलम्व शुल्क
                रु.५० लाग्नेछ ।
              </li>
            </ul>

            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem >
                  <FormControl>
                    <div className="items-top flex space-x-2 my-6">
                    <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                      
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms1"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Accept terms and conditions
                        </label>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
            <Button className="w-full my-20" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
