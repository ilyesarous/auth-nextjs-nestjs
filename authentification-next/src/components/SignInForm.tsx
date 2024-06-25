"use client";

import { request } from "@/api/AxiosHelper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Form = () => {
  const [isShown, setIsShown] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showPass, setShowPass] = useState("password");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [verifPassword, setVerifPassword] = useState("");
  const router = useRouter();

  const showPassword = () => {
    setIsShown(!isShown);
    !isShown ? setShowPass("text") : setShowPass("password");
  };

  const registerHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    verifPassword !== password ? setShowError(true) : setShowError(false);
    if (!showError) {
      const user = {
        name,
        email,
        password,
      };
      request("POST", "/user", user)
        .then((res) => {
          console.log(res.data);
          router.push("/login");
        })
        .catch((e: Error) => {
          alert(e.response.data.message);
        });
    }
  };

  return (
    <div className="rounded-lg p-10 shadow-md">
      <form onSubmit={registerHandler} className="flex flex-col gap-6">
        <p className="text-xl font-semibold">Register</p>
        <input
          type="text"
          placeholder="name"
          className="bg-transparent border border-gray-300 text-sm rounded-md py-4 block w-full p-2.5 "
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="email"
          className="bg-transparent border border-gray-300 text-sm rounded-md py-4 block w-full p-2.5 "
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <span className="flex border border-gray-300 rounded-md items-center px-2.5">
          <input
            type={showPass}
            placeholder="password"
            className="bg-transparent text-sm py-4 block w-full"
            onChange={(e) => setPassowrd(e.target.value)}
            required
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
        <div>
          <input
            type={showPass}
            placeholder="verif password"
            className="bg-transparent border border-gray-300 text-sm rounded-md py-4 block w-full p-2.5 "
            onChange={(e) => setVerifPassword(e.target.value)}
            required
          />
          {showError ? (
            <p className="text-red-500 text-xs">
              you need to enter the same password
            </p>
          ) : (
            <p></p>
          )}
        </div>
        <button
          type="submit"
          className="bg-gray-500 p-2 rounded-md text-white font-medium"
        >
          register
        </button>
        <span className="flex w-80 justify-center">
          <p className="text-sm">already have an account?&nbsp;</p>
          <Link className="text-sm text-blue-400" href="/login">
            login from here!
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Form;
