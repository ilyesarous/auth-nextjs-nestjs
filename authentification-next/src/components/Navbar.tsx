"use client";

import { request } from "@/api/AxiosHelper";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoPersonSharp, IoSettingsSharp } from "react-icons/io5";

const Navbar = () => {
  const [user, setUser] = useState<any>({});
  const [isUser, setisUser] = useState(true);
  const [image, setImage] = useState<any>();
  const router = useRouter();

  const getUser = async () => {
    await request("GET", "/user/getUser")
      .then((res) => {
        setImage(require(`../../../auth-nest/images/${res.data.image}`));
        setUser(res.data);
      })
      .catch(() => setisUser(false));
  };
  useEffect(() => {
    getUser();
  }, []);

  if (!isUser) return notFound();
  return (
    <div className="flex items-center justify-between py-5 px-5 md:px-24 w-full shadow-sm">
      <p className="font-semibold text-lg">Logo.</p>
      <span className="flex gap-5 items-center">
        <p className="font-medium text-lg">welcome {user.name}</p>
        <div className="relative group hover:cursor-pointer transition-all">
          <Image
            className="rounded-full shadow-md w-12 h-12 object-contain"
            src={image}
            alt=""
            onClick={() => router.push("/profile")}
          />
          <ul className="p-5 rounded-lg shadow-md bg-white absolute transition-all hidden w-auto flex-col gap-1 group-hover:flex">
            <Link href={"/profile"} className="flex gap-2 items-center">
              <IoPersonSharp color="#9ca3af" />
              <p className="text-gray-400 font-medium hover:text-black transition-all">profile</p>
            </Link>
            <li className="flex gap-2 items-center">
              <IoSettingsSharp color="#9ca3af" />
              <p className="text-gray-400 font-medium hover:text-black transition-all ">settings</p>
            </li>
          </ul>
        </div>
      </span>
    </div>
  );
};

export default Navbar;
