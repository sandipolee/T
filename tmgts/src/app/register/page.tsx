"use client";
import { Header } from "../component/header";
import Footer from "../component/footer";
import "nepali-datepicker-reactjs/dist/index.css"
import React from 'react';
import { InputForm } from "./form";


const Register = () => {
  return (
    <>
      <Header></Header>
      <div className="h-full mx-auto w-full max-w-screen-x1 px-2.5 md:px-20 items-center dark:bg-slate-900">
      
      <InputForm></InputForm>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Register;
