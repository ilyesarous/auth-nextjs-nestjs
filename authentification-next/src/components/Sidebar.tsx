"use client";

import { request } from "@/api/AxiosHelper";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Sidebar = ({ sendDataToParent }: any) => {
  const items = [
    {
      id: 1,
      text: "Interships request",
    },
    {
      id: 2,
      text: "Jobs request",
    },
    {
      id: 3,
      text: "Internships available",
    },
    {
      id: 4,
      text: "Job offer available",
    },
    {
      id: 5,
      text: "Create new offer",
    },
  ];
  const [selectedId, setSelectedId] = useState(1);
  const router = useRouter();

  const sendDataToParentHandler = (item: any) => {
    // const text = items.find((item) => item.id === id);
    sendDataToParent(item.text);
  };

  const logoutHandler = () => {
    request("POST", "/user/logout").then(() => {
      router.push("/login");
    });
  };
  return (
    <div className="flex flex-col w-1/5 py-10 pl-5 justify-between">
      <div className="flex flex-col gap-5">
        {items.map((item) => {
          return (
            <p
              key={item.id}
              onClick={() => {
                setSelectedId(item.id);
                sendDataToParentHandler(item);
              }}
              className={
                selectedId === item.id
                  ? "font-semibold text-black transition-all hover:cursor-pointer"
                  : "font-medium text-gray-400 hover:text-black hover:font-semibold hover:cursor-pointer transition-all"
              }
            >
              {item.text}
            </p>
          );
        })}
      </div>
      <button
        onClick={logoutHandler}
        className="border rounded-md w-full p-1 border-gray-400 hover:bg-gray-400 hover:text-white transition-all"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
