"use client";

import { request } from "@/api/AxiosHelper";
import Image from "next/image";
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
  const [role, setRole] = useState("");
  const [image, setImage] = useState<any>(
    require("../../../../auth-nest/images/UPLOADEDPROFILEPIC-661a3ff0-29b8-4592-808f-4b6e68e9cf68-836.jpg")
  );
  const [selectedFile, setSelectedFile] = useState<File>();
  const [password, setPassowrd] = useState("");
  const [verifPassword, setVerifPassword] = useState("");
  const router = useRouter();

  const showPassword = () => {
    setIsShown(!isShown);
    !isShown ? setShowPass("text") : setShowPass("password"); // change the type of the input from password into text
  };

  const changeFileHandler = (e: any) => {
    if (e.target) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const registerHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    verifPassword !== password ? setShowError(true) : setShowError(false);
    if (!showError) {
      const formData = new FormData();
      if (selectedFile) {
        formData.append("image", selectedFile);
      }
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);

      request("POST", "/user", formData, "multipart/form-data")
        .then((res) => {
          console.log(res.data);
          router.push("/login");
        })
        .catch((e: any) => {
          alert(e.response.data.message);
        });
    }
  };

  return (
    <div className="rounded-lg p-10 shadow-md">
      <form onSubmit={registerHandler} className="flex flex-col gap-6">
        <p className="text-xl font-semibold">Register</p>
        <label
          htmlFor="file-upload"
          className="bg-transparent border border-gray-300 text-sm rounded-md py-4 block w-full p-2.5 hover:cursor-pointer"
        >
          <div className="flex flex-col items-center gap-3">
            <Image
              src={image}
              alt="img"
              className="rounded object-contain"
              width={100}
              height={100}
            />
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={(e: any) => {
                changeFileHandler(e);
              }}
            />
            <p>Upload your profile image</p>
          </div>
        </label>
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
        <select
          onChange={(e) => setRole(e.target.value)}
          className="bg-transparent border border-gray-300 text-sm rounded-md py-4 block w-full p-2.5"
        >
          <option value="">choose a role</option>
          <option value="ADMIN">admin</option>
          <option value="INTERN">intern</option>
          <option value="CONDIDAT">condidat</option>
        </select>

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
