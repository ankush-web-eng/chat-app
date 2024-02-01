"use client";

import axios from "axios";
import React, { useEffect } from "react";
import Link from "next/link";
import ProfileNav from "@/components/navbar";

export default function ProfilePage() {
  return (
    <>
      <ProfileNav />
      <div className="h-screen flex flex-col justify-center text-black bg-white dark:bg-black dark:text-white">
        <div className=" flex flex-row justify-center space-x-8 items-center top-4 ">
          <div className="shadow-2xl rounded-2xl px-2 py-3 drop-shadow-2xl border-black border-2 dark:border-white ease-in-out duration-300 hover:scale-x-125 hover:scale-y-125">
            <Link href="/profile/chat-app">Community Chat</Link>
          </div>
        </div>
      </div>
    </>
  );
}
