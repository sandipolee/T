"use client";
import { Header } from "../component/header";
import { useState } from "react";
import Footer from "../component/footer";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css"
import React from 'react';
import { useForm } from 'react-hook-form';
import { InputForm } from "./form";


const Register = () => {
  return (
    <>
      <Header></Header>
      <div className="h-full mx-auto w-full max-w-screen-x1 px-2.5 md:px-20 items-center">
      
      <InputForm></InputForm>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Register;
