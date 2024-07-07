import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { DataTable } from "./data-table";
import React from "react";
import TestTable from "./test";

const Dasboard = async () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar></Sidebar>
      <div className="flex flex-col z-0">
        <Navbar></Navbar>
        <main className="">
          <div className="container mx-auto py-20 ">
            <TestTable></TestTable>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dasboard;
