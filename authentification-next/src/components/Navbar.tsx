'use client'

import { request } from '@/api/AxiosHelper';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { IoSettingsOutline } from 'react-icons/io5'

const Navbar = () => {
  const [user, setUser] = useState<any>({});
  const [image, setImage]= useState<any>()

  const getUser = async () => {
    await request("GET", "/user/getUser")
      .then((res) => {
        setImage(require(`../../../auth-nest/images/${res.data.image}`))
        setUser(res.data);
      })
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className='flex items-center justify-between py-5 px-5 md:px-24 w-full shadow-sm'>
        <p className='font-semibold text-lg'>Logo.</p>
        <span className='flex gap-5 items-center'>
            <p className='font-medium text-lg'>welcome {user.name}</p>
            <Image className='rounded-full shadow-sm w-12 h-12 object-contain' src={image} alt=''/>
            {/* <IoSettingsOutline size="30px"/> */}
        </span>
    </div>
  )
}

export default Navbar