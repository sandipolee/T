"use client";

import React from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "./theme-toggle";

const montserrat = Montserrat({
  subsets: ["latin"],
});

const menuItems = [
  {
    name: "Home",
    href: "./",
  },
  {
    name: "How to fill Form ",
    href: "#",
  },
  {
    name: "All Bus Stops",
    href: "#",
  },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={`w-full sticky top-0 bg-white z-50 ${montserrat.className} dark:bg-slate-900`}
    >
      <div
        className={`h-full mx-auto w-full max-w-screen-x1 px-2.5 md:px-20 transition-all duration-200
        ${
          isScrolled
            ? "border-b border-zinc-200 dark:border-zinc-800"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between  py-4  ">
          <div className="inline-flex items-center space-x-2">
            <Image src="/logo.png" width={48} height={48} alt="Logo" />
            <span className="font-bold bg-gradient-to-b from-emerald-500 to-teal-600 text-transparent bg-clip-text">TMGTS</span>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className=" mr-2">
              <ModeToggle />
            </div>
            <div className="hidden lg:block">
              <Link href="/login">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-sm bg-transparent border-emerald-500
            px-3 py-2 text-sm font-semibold text-emerald-500 shadow-sm 
              transition duration-300 ease-in-out transform hover:scale-105  hover:bg-gradient-to-b from-emerald-500 to-teal-600 hover:text-white
               focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Log In
                </Button>
              </Link>
            </div>
            <div className="lg:hidden">
            <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
          </div>
          </div>

          {isMenuOpen && (
            <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
              <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pb-6 pt-5">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center space-x-2">
                      <span className="font-bold text-blue-950 ">TMGTS</span>
                    </div>
                    <div className="-mr-2">
                      <button
                        type="button"
                        onClick={toggleMenu}
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        <span className="sr-only">Close menu</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-y-4">
                      {menuItems.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                        >
                          <span className="ml-3 text-base font-medium text-gray-900">
                            {item.name}
                          </span>
                        </a>
                      ))}
                    </nav>
                  </div>

                  <Link href="/login">
                    <button
                      type="button"
                      className="mt-4 w-full rounded-sm  bg-gradient-to-b from-emerald-500 to-teal-600
                    px-3 py-2 text-sm font-semibold text-white shadow-sm
                    transition duration-300 ease-in-out transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      Log In
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
