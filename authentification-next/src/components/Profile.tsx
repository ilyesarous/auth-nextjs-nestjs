"use client";
import { request } from "@/api/AxiosHelper";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfileComponent = () => {
  const [user, setUser] = useState({});
  const router = useRouter();
  const getUser = async () => {
    await request("GET", "/user/getUser").then((res) => {
      setUser(res.data);
      console.log(user);
    });
  };
  useEffect(() => {
    getUser();
  }, []);

  const logoutHandler = () => {
    request("POST", "/user/logout").then(() => {
      router.back();
    });
  };

  return (
    <div>
      <p className="text-3xl">welcome {user.name}</p>
      <button onClick={logoutHandler}>logout</button>
    </div>
  );
};

export default ProfileComponent;
