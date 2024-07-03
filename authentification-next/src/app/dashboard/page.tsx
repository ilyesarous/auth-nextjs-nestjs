"use client";

import NewOffer from "@/components/dashboard/NewOffer";
import ShowOffers from "@/components/dashboard/ShowOffers";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";

const Dashboard = () => {
  const [childData, setChildData] = useState("");
  const [position, setPosition] = useState("");

  const receiveChildData = (data: any, position: string) => {
    // Handle the data received from the child component
    setChildData(data); // Update parent component state with received data
    setPosition(position)
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex gap-5 w-full h-screen">
        <Sidebar sendDataToParent={receiveChildData} />
        <div className="w-[1.5px] bg-gray-200"></div>
        {childData === "Create new offer" && <NewOffer />}
        {childData === "Internships available" && <ShowOffers position={position} />}
        {childData === "Job offer available" && <ShowOffers position={position} />}
      </div>
    </div>
  );
};

export default Dashboard;
