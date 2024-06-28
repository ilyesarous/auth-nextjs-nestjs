"use client";
import { request } from "@/api/AxiosHelper";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfileComponent = () => {
  const [user, setUser] = useState<any>({});
  const [image, setImage] = useState<any>();
  const [isUser, setISUser] = useState(true);
  const router = useRouter();
  const getUser = async () => {
    await request("GET", "/user/getUser")
      .then((res) => {
        setImage(require(`../../../../auth-nest/images/${res.data.image}`));
        setUser(res.data);
      })
      .catch(() => {
        setISUser(false);
      });
  };
  useEffect(() => {
    getUser();
  }, []);
  const showContent = () => {
    if (!isUser) return notFound(); // in case there is no cookie, we cannot access the profile page, therefore, i've forced the not found page
    return (
      <div>
        {/* show the user name */}
        <p className="text-3xl"> welcome {user.name} </p>
        <Image src={image} alt="" width={100} height={100} />
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
