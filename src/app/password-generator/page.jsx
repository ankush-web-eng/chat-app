"use client";

import { useCallback, useEffect, useState } from "react";
import React from "react";
import Link from "next/link";
import ProfileNav from "@/components/navbar";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [characters, setCharacters] = useState(false);

  const allInput = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbers) str += "1234567890";
    if (characters) str += "!@#$%&?";

    for (let i = 1; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    }
    setPassword(pass);
  }, [length, numbers, characters]);

  useEffect(() => {
    allInput();
  }, [length, characters, numbers, allInput]);

  function textCopy() {
    window.navigator.clipboard.writeText(password);
    confirm("Password Copied");
  }

  function handleNumbers() {
    if (numbers == true) {
      setNumbers(false);
    } else {
      setNumbers(true);
    }
  }
  function handleCharacters() {
    if (characters == true) {
      setCharacters(false);
    } else {
      setCharacters(true);
    }
  }

  return (
    <>
      <ProfileNav />
      <div className="w-full h-screen items-center flex-col dark:bg-black dark:text-white flex justify-center bg-white text-black ">
        <div className="px-6 py-3 w-fit h-fit rounded-xl shadow-2xl drop-shadow-2xl">
          <h1>Password generator</h1>
          <div className="p-3 ">
            <input
              type="text"
              value={password}
              className="rounded-l-lg bg-gray-200 w-80 text-black py-1 "
              id="input1"
              readOnly
            />
            <button
              className="bg-blue-400 rounded-r-2xl px-2 py-1"
              onClick={textCopy}
            >
              Copy
            </button>
          </div>
          <div className="space-x-2">
            <input
              type="range"
              min={6}
              max={24}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer"
              id="range"
            />
            <label htmlFor="range">Length: {length}</label>
            <input
              type="checkbox"
              defaultChecked={numbers}
              id="numbers"
              onChange={handleNumbers}
            />
            <label htmlFor="numbers">Numbers</label>
            <input
              type="checkbox"
              id="characters"
              defaultChecked={characters}
              onChange={handleCharacters}
            />
            <label htmlFor="characters">Characters</label>
          </div>
        </div>
        <Link href="/signup" className="py-4">
          Visit Signup Page
        </Link>
      </div>
    </>
  );
}

export default App;
