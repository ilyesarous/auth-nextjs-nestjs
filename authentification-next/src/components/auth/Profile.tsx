"use client";
import { request } from "@/api/AxiosHelper";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

const ProfileComponent = () => {
  const [user, setUser] = useState<any>({});
  const [image, setImage] = useState(
    require(`../../../../auth-nest/images/836.jpg`)
  );
  const [isUser, setISUser] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [name, setName] = useState("");
  const router = useRouter();

  const getUser = async () => {
    await request("GET", "/user/getUser")
      .then((res) => {
        if (res.data.image) {
          setImage(require(`../../../../auth-nest/images/${res.data.image}`));
        }
        setUser(res.data);
      })
      .catch(() => {
        setISUser(false);
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  const changeFileHandler = (e: any) => {
    if (e.target) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const updateChangesHandler = (e: SyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    if (name !== "") {
      formData.append("name", name);
    }
    // formData.append("role", role);

    request("PATCH", `/user/${user.id}`, formData, "multipart/form-data")
      .then((res) => {
        router.refresh();
      })
      .catch((e: any) => {
        alert(e.response.data.message);
      });
  };

  const showContent = () => {
    if (!isUser) return notFound(); // in case there is no cookie, we cannot access the profile page, therefore, i've forced the not found page
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        {/* user details */}
        <div className="flex shadow-md rounded-lg gap-10 justify-between pt-5 pb-10 pl-5 pr-10">
          <div className="absolute h-fit hover:shadow-md rounded-full p-2">
            <IoIosArrowBack
              className="hover:cursor-pointer"
              onClick={() => router.back()}
            />
          </div>
          <div className="flex flex-col gap-5 pt-5  pl-5 items-center pr-10 border-r-2">
            <Image
              src={image}
              alt=""
              className="rounded-full shadow-md object-contain w-52 h-52"
              width={150}
              height={100}
            />
            <p className="text-3xl"> welcome {user.name} </p>
            <button
              className="border rounded-md py-1 w-full border-gray-400 hover:bg-gray-400 hover:text-white transition-all"
              onClick={logoutHandler}
            >
              logout
            </button>
          </div>
          <form
            className="flex flex-col gap-6 justify-center"
            onSubmit={(e) => updateChangesHandler(e)}
          >
            <div className="flex gap-3">
              <input
                type="text"
                placeholder={user.name}
                className="bg-transparent border border-gray-300 text-sm rounded-md py-4 block w-full p-2.5 "
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder={user.email}
                className="bg-transparent border border-gray-300 text-sm rounded-md py-4 block w-full p-2.5 "
                required
                disabled
              />
            </div>
            <input
              type="text"
              placeholder={user.role}
              className="bg-transparent border border-gray-300 text-sm rounded-md py-4 block w-full p-2.5 "
              disabled
            />
            <label
              htmlFor="file-upload"
              className="bg-transparent border border-gray-300 text-sm rounded-md py-4 block w-full p-2.5 hover:cursor-pointer"
            >
              <div className="flex flex-col items-center gap-3">
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={(e: any) => {
                    changeFileHandler(e);
                  }}
                />
                <p>Upload an image</p>
              </div>
            </label>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => router.back()}
                className="border rounded-md py-1 px-3 border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition-all"
              >
                cancel
              </button>
              <button
                type="submit"
                className="border rounded-md py-1 px-3 border-gray-400 hover:bg-gray-400 hover:text-white transition-all"
              >
                save changes
              </button>
            </div>
          </form>
          {/* </form> */}
        </div>
      </div>
    );
  };

  const logoutHandler = () => {
    request("POST", "/user/logout").then(() => {
      router.push("/login");
    });
  };

  return showContent();
};

export default ProfileComponent;
