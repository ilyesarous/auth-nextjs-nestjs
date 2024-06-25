"use client";
import { request } from "@/api/AxiosHelper";
// import Loading from "@/app/loading";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfileComponent = () => {
  const [user, setUser] = useState({});
  const [isUser, setISUser] = useState(true);
  const router = useRouter();
  const getUser = async () => {
    // await new Promise((res) => setTimeout(res, 2000));
    await request("GET", "/user/getUser")
      .then((res) => {
        setUser(res.data);
      })
      .catch((e) => {
        setISUser(false);
      });
  };
  useEffect(() => {
    getUser();
  }, []);
  const showContent = () => {
    if (!isUser) return notFound();
    return (
      <div>
        <p className="text-3xl"> welcome {user.name} </p>
        <button onClick={logoutHandler}>logout</button>
      </div>
    );
  };

  const logoutHandler = () => {
    request("POST", "/user/logout").then(() => {
      router.back();
    });
  };

  return showContent();
};

export default ProfileComponent;
