"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ProfileNav from "@/components/navbar";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [failed, setFailed] = React.useState("");

  const onSignup = async () => {
    try {
      setLoading(true);
      setFailed("");
      const response = await axios.post("/api/users/signup", user, {
        headers: {
          "Content-Type": "application/JSON",
        },
      });
      console.log(response.data);
      toast.success("Signup Successful!");
      router.push("/login");
    } catch (error) {
      setFailed("Invalid Credentials!");
      console.log("Signup Failed!!", error.response.data);
      toast.error("Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 3 &&
      user.password.length > 3
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  


  return (
    <>
      <ProfileNav />
      <div className="h-screen flex-col flex justify-center items-center dark:bg-black dark:text-white bg-white text-black scroll-smooth">
        <div className="flex-col flex justify-center shadow-2xl drop-shadow-2xl shadow-stone-400  py-2 px-8  rounded-lg">
          <h1 className="text-5xl flex justify-center items-center font-serif">
            {loading ? "Processing" : "Signup"}
          </h1>
          <h2 className="text-1xl flex justify-center items-center pt-2 text-2xl font-serif text-red-500">
            {failed}
          </h2>
          <br />
          <label className="pb-1 pt-3">Username</label>
          {/* <br /> */}
          <input
            id="username"
            type="text"
            value={user.username}
            className="py-2 text-black px-2 rounded-lg border-black border-2 "
            placeholder="Unique Username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <label className="pb-1 pt-3">Email</label>
          {/* <br /> */}
          <input
            id="email"
            type="email"
            value={user.email}
            className="py-2 text-black px-2 rounded-lg border-black border-2"
            placeholder="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <label className="pb-1 pt-3">Password</label>
          {/* <br /> */}
          <input
            id="password"
            type="password"
            value={user.password}
            className="py-2 text-black px-2 rounded-lg border-black border-2"
            placeholder="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <br />
          <Link
            className="flex justify-center items-center pt-0"
            href="/password-generator"
          >
            Password Generator
          </Link>
          <button
            onClick={onSignup}
            className="bg-black border border-gray-300 mb-4 my-4 px-2 py-2 rounded-lg text-white hover:bg-gray-300 active:bg-green-500 hover:text-black"
          >
            {/* {buttonDisabled ? "No signup" : "signup"} */}Signup
          </button>
          <Link
            className="flex justify-center items-center animate-pulse"
            href="/login"
          >
            Visit Login Page
          </Link>
        </div>
      </div>
    </>
  );
}
