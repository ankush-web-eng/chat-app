"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ModeToggle } from "./ui/toggle-button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProfileNav() {
  const router = useRouter();
  const [data, setData] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dataFromUser = async () => {
    const res = await axios.get("/api/users/me");
    // console.log(res.data);
    setData(res.data.data.username);
  };

  useEffect(() => {
    dataFromUser();
  });

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      // console.log(response.data);
      router.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <nav className="fixed top-0 z-20 flex flex-wrap max-h-full ease-in-out duration-300 justify-between w-full items-center ">
        <Image
          className="h-12 w-12 rounded-full my-2 cursor-crosshair"
          src="/Ankush_1mb.jpg"
          width={12}
          height={12}
          alt="Owner Image"
        />
        <ul className=" hidden md:flex justify-end space-x-6 ltr:px-3 my-4  mr-4 ease-in-out duration-500">
          {data && (
            <li
              id="logout"
              className=" cursor-pointer font-serif drop-shadow-1xl py-1 ease-in-out duration-500 rounded-full hover:bg-blue-400 hover:text-white px-2"
            >
              <button className="active:text-red-500" onClick={logout}>
                Logout({data})
              </button>
            </li>
          )}
          <li className=" cursor-pointer font-serif drop-shadow-1xl py-1 ease-in-out duration-500 rounded-full hover:bg-blue-400 hover:text-white px-2 ">
            <Link href="/about">About</Link>
          </li>
          <li className=" cursor-pointer font-serif drop-shadow-1xl py-1 ease-in-out duration-500 rounded-full hover:bg-blue-400 hover:text-white px-2">
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
        <div className="md:hidden mr-2">
          <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
        </div>
        {isOpen && (
          <ul className="flex flex-col items-center basis-full z-20 justify-end">
            {data && (
              <li
                id="logout"
                className=" cursor-pointer font-serif drop-shadow-1xl py-1 ease-in-out duration-500 rounded-full hover:bg-blue-400 hover:text-white px-2"
              >
                <button className="active:text-red-500" onClick={logout}>
                  Logout({data})
                </button>
              </li>
            )}
            <li className=" cursor-pointer font-serif drop-shadow-1xl py-1 ease-in-out duration-500 rounded-full hover:bg-blue-400 hover:text-white px-2 ">
              <Link href="/about">About</Link>
            </li>
            <li className=" cursor-pointer font-serif drop-shadow-1xl py-1 ease-in-out duration-500 rounded-full hover:bg-blue-400 hover:text-white px-2">
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <ModeToggle />
            </li>
          </ul>
        )}
      </nav>
    </>
  );
}
