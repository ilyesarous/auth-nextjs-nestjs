"use client";
import NewOffer from "@/components/dashboard/NewOffer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";

const Dashboard = () => {
  const [childData, setChildData] = useState("");

  const receiveChildData = (data: any) => {
    // Handle the data received from the child component
    console.log("Data received from child:", data);
    setChildData(data); // Update parent component state with received data
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex gap-5 h-screen">
        <Sidebar sendDataToParent={receiveChildData} />
        <div className="w-[1.5px] bg-gray-200"></div>
        {childData !== "Create new offer" ? (
          <p className="text-4xl font-normal font-serif text-gray-400">
            still coding this part!
          </p>
        ) : (
          <NewOffer />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
