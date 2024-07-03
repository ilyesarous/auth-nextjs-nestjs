"use client";

import { request } from "@/api/AxiosHelper";
import React, { useEffect, useState } from "react";
import Crad from "./Crad";
import { Offer } from "@/app/definitions";
import { BiSearchAlt2 } from "react-icons/bi";

const ShowOffers = ({ position }: any) => {
  const [offers, setOffer] = useState([]);
  const [search, setSearch] = useState("");

  const getOffers = async () => {
    const data = await request("GET", "/offers");
    const l = data.data.filter((offer: any) => offer.position === position);
    setOffer(l);
  };

  useEffect(() => {
    getOffers();
  }, []);

  return (
    <div className=" flex flex-col pl-5 pr-10 py-10 gap-5 w-full">
      <span className="flex justify-end items-center">
        <div className="flex justify-end p-2 items-center border border-gray-300 rounded-md">
          <input
            type="text"
            placeholder="Search for a postion"
            className="bg-transparent text-sm block"
            onChange={(e) => setSearch(e.target.value)}
          />
          <BiSearchAlt2 color="#9ca3af" size={20} />
        </div>
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
        {offers
          .filter((offer: Offer) =>
            search !== "" ? offer.positioname.includes(search) : offer
          )
          .map((offer: Offer) => {
            return (
              <>
                <Crad key={offer.id} {...offer} />
              </>
            );
          })}
      </div>
    </div>
  );
};

export default ShowOffers;
