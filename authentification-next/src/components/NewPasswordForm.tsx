"use client";
import { request } from "@/api/AxiosHelper";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const NewPasswordForm = () => {
  const [isShown, setIsShown] = useState(false);
  const [user, setUser] = useState({});
  const [showPass, setShowPass] = useState("password");
  const [password, setPassowrd] = useState("");
  const [verifPassword, setVerifPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const router = useRouter();

  const getUser = async () => {
    // get the user saved in the cookie for updating his password 
    await request("GET", "/user/getUser").then((res) => {
      setUser(res.data);
    });
  };
  useEffect(() => {
    getUser();
  }, []);

  const showPassword = () => {
    setIsShown(!isShown);
    !isShown ? setShowPass("text") : setShowPass("password"); // change the type of the input from password into text
  };

  const registerHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    verifPassword !== password ? setShowError(true) : setShowError(false);
    if (!showError) {
      const userInfos = { password };
      await request("PATCH", `/user/${user.id}`, userInfos)
        .then( () => {
          //after updating the password, we need to delete the token saved in the cookie since we've finished using it's data
          request("POST", "/user/logout");
          alert(`password updated successfully for ${user.email}`);
          router.push("/login");
        })
        .catch((e: Error) => alert(e.response.data.message));
      // console.log(userInfos);
    }
  };
  return (
    <div className="w-96 rounded-lg p-10 shadow-md">
      <form onSubmit={registerHandler} className="flex flex-col gap-6">
        <p className="text-xl font-semibold">Change your password</p>

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
          update password
        </button>
      </form>
    </div>
  );
};

export default NewPasswordForm;
