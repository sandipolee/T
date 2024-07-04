"use client";
import { Header } from "../component/header";
import { useState } from "react";
import Footer from "../component/footer";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css"
import { toast } from "@/components/ui/use-toast";
import React from 'react';
import { useForm } from 'react-hook-form';
import { InputForm } from "./form";
import { ToastWithTitle } from "./test";


const Register = () => {
  return (
    <>
      <Header></Header>
      <div className="h-full mx-auto w-full max-w-screen-x1 px-2.5 md:px-20 items-center">
      <div className="grid grid-cols-2 gap-10 py-10 max-sm:grid-cols-none max-sm:px-4">
      <InputForm></InputForm>
      <ToastWithTitle></ToastWithTitle>
    </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Register;
