"use client";

import { request } from "@/api/AxiosHelper";
import React, { Fragment, useEffect, useState } from "react";
import Crad from "./Crad";
import { Offer } from "@/app/definitions";
import { BiSearchAlt2 } from "react-icons/bi";
import OfferDetails from "./OfferDetails";

const ShowOffers = ({ position }: any) => {
  const [offers, setOffers] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [offerDetails, setOfferDetails]: any = useState({});
  const [search, setSearch] = useState("");

  const getOffers = async () => {
    const data = await request("GET", "/offers");
    const l = data.data.filter((offer: any) => offer.position === position);
    setOffers(l);
  };

  const setOfferDetailsHandler = async (id: any) => {
    await request("GET", `/offers/${id}`).then((res) => {
      setOfferDetails(res.data);
    });
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
      <Fragment>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          {offers
            .filter((offer: Offer) =>
              search !== "" ? offer.positioname.includes(search) : offer
            )
            .map((offer: Offer) => {
              return (
                <div
                  key={offer.id}
                  onClick={() => {
                    setOfferDetailsHandler(offer.id);
                    setShowDetails(true);
                  }}
                >
                  <Crad data={offer} />
                </div>
              );
            })}
        </div>

        <OfferDetails
          data={offerDetails}
          isVisible={showDetails}
          onClose={() => setShowDetails(false)}
        />
      </Fragment>
    </div>
  );
};

export default ShowOffers;
