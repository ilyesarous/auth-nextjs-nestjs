"use client";

import Link from "next/link";
import React, { SyntheticEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Form = () => {
  const [isShown, setIsShown] = useState(false);
  const [showPass, setShowPass] = useState("password");
  const [email, setEmail] = useState("");
  const [passowrd, setPassowrd] = useState("");

  const showPassword = () => {
    setIsShown(!isShown);
    !isShown ? setShowPass("text") : setShowPass("password");
  };

  const registerHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    
  }

  return (
    <div className="rounded-lg p-10 shadow-md">
      <form onSubmit={registerHandler} className="flex flex-col gap-6">
        <p className="text-xl font-semibold">Login</p>
        
        <input
          type="email"
          placeholder="email"
          className="bg-transparent border border-gray-300 text-sm rounded-md py-4 block w-full p-2.5 "
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="flex border border-gray-300 rounded-md items-center px-2.5">
          <input
            type={showPass}
            placeholder="password"
            className="bg-transparent text-sm py-4 block w-full"
            onChange={(e) => setPassowrd(e.target.value)}
          />
          <span
            className="hover:bg-slate-100 rounded-full p-2 transition-all"
            onClick={showPassword}
          >
            {isShown ? (
              <FaEye color="#9ca3af" />
            ) : (
              <FaEyeSlash color="#9ca3af" />
            )}
          </span>
        </span>
        
        <button type="submit" className="bg-gray-500 p-2 rounded-md text-white font-medium">
          login
        </button>
        <span className="flex w-80 justify-center">
          <p className="text-sm">don't have an account? &nbsp;</p>
          <Link className="text-sm text-blue-400" href="/signup">
            create an account!
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Form;
