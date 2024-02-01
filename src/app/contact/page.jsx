"use client";

import React, { useEffect } from "react";
import ProfileNav from "@/components/navbar";
import Link from "next/link";

export default function ProfilePage() {
  const email = "deshwalankush23@gmail.com";

  function textCopy() {
    window.navigator.clipboard.writeText(email);
    confirm("Email Id Copied");
  }

  return (
    <>
      <ProfileNav />
      <div className="h-screen flex flex-col justify-center bg-white dark:bg-black">
        <div className=" flex flex-col justify-center space-x-8 items-center top-4 ">
          <div className="shadow-2xl rounded-2xl px-2 py-3 drop-shadow-2xl italic font-serif items-center flex flex-col border-black border-2 dark:border-white ease-in-out duration-300 hover:scale-x-125 hover:scale-y-125">
            <p>
              Email: {email}{" "}
              <button
                className="bg-blue-400 rounded-r-2xl px-2 py-1 ml-4"
                onClick={textCopy}
              >
                Copy
              </button>
            </p>
          </div>
          <Link href="/profile" className="pt-4">Home</Link>
        </div>
      </div>
    </>
  );
}
