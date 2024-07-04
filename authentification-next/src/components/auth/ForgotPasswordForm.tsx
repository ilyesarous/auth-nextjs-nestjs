"use client";
import { request } from "@/api/AxiosHelper";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const sendDataHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    const user = {
      email,
    };
    await request("POST", "/user/forgetPassword", user)
      .then((res) => {
        alert(`an emali was sent to ${email}`);
        router.push("/login");
      })
      .catch((e: any) => {
        alert(e.response.data.message);
      });
  };

  return (
    <div className="flex justify-center items-center p-24">
      <form
        onSubmit={(e) => sendDataHandler(e)}
        className="w-full flex flex-col gap-3"
      >
        <div>
          <label>enter your email</label>
          <input
            type="email"
            placeholder="example@example.com"
            className="bg-transparent border border-gray-300 text-sm rounded-md py-4 block w-full p-2.5 "
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="border rounded-md w-full p-1 border-gray-400 hover:bg-gray-400 hover:text-white transition-all"
        >
          send
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
