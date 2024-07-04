"use client";

import { request } from "@/api/AxiosHelper";
import { Offer } from "@/app/definitions";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useRef, useState } from "react";

const NewOffer = () => {
  const [position, setPosition] = useState("");
  const [departement, setDepartement] = useState("");
  const [positionName, setPositionName] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [skills, setSkills] = useState("");
  const [duration, setDuration] = useState("");
  const [nbCondidats, setNbCondidats] = useState(0);
  const [salary, setSalary] = useState("");
  const [contract, setContract] = useState("");
  const positionRef = useRef("");
  const router = useRouter();

  const cancelationHandler = () => {
    router.back();
  };

  const createNewOffer = (e: SyntheticEvent) => {
    e.preventDefault();

    const offer: Offer = {
      position,
      positioname: positionName,
      departement,
      description,
      requirements,
      technologies,
      salary,
      contract,
      skills,
      duration,
      nbCondidats,
    };

    request("POST", "/offers", offer).then((res) => {
      console.log(res.data);
      router.refresh();
    });
  };

  return (
    <div className="flex justify-center w-full p-10">
      <form
        onSubmit={(e) => createNewOffer(e)}
        className="flex flex-col items-center w-full px-20 gap-5"
      >
        <div className="flex w-full gap-3">
          <select
            required
            className="bg-transparent border border-gray-300 text-sm rounded-md py-4 block w-full p-2.5"
            onChange={(e) => {
              setPosition(e.target.value);
              positionRef.current = e.target.value;
            }}
          >
            <option value="">Select a position</option>
            <option value="INTERNSHIP">INTERNSHIP</option>
            <option value="JOB">JOB</option>
          </select>
          <select
            required
            className="bg-transparent border border-gray-300 text-sm rounded-md py-4 block w-full p-2.5"
            onChange={(e) => {
              setDepartement(e.target.value);
            }}
          >
            <option value="">Select a departement</option>
            <option value="DEVELOPMENT">DEVELOPMENT</option>
            <option value="MARKETING">MARKETING</option>
            <option value="HR">HR</option>
            <option value="ACCOUNTING">ACCOUNTING</option>
          </select>
        </div>
        <input
          value={positionName}
          required
          type="text"
          placeholder="Position name"
          className="bg-transparent border border-gray-300 text-sm rounded-md py-4 block w-full p-2.5 "
          onChange={(e) => setPositionName(e.target.value)}
        />
        <input
          value={description}
          required
          type="text"
          placeholder="Description"
          className="bg-transparent border border-gray-300 text-sm rounded-md py-4 block w-full p-2.5 "
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          value={requirements}
          required
          type="text"
          placeholder="Requirements"
          className="bg-transparent border border-gray-300 text-sm rounded-md py-4 block w-full p-2.5 "
          onChange={(e) => setRequirements(e.target.value)}
        />
        <input
          value={technologies}
          required
          type="text"
          placeholder="Technologies"
          className="bg-transparent border border-gray-300 text-sm rounded-md py-4 block w-full p-2.5 "
          onChange={(e) => setTechnologies(e.target.value)}
        />
        {positionRef.current === "INTERNSHIP" && (
          <input
            value={skills}
            required
            type="text"
            placeholder="Skills to gain"
            className="bg-transparent border border-gray-300 text-sm rounded-md py-4 block w-full p-2.5 "
            onChange={(e) => setSkills(e.target.value)}
          />
        )}
        <div className="flex gap-3 w-full">
          {positionRef.current === "INTERNSHIP" ? (
            <input
              value={duration}
              required
              type="text"
              placeholder="Duration"
              className="bg-transparent border border-gray-300 text-sm rounded-md py-4 block w-full p-2.5 "
              onChange={(e) => setDuration(e.target.value)}
            />
          ) : (
            <select
              required
              className="bg-transparent border border-gray-300 text-sm rounded-md py-4 block w-full p-2.5"
              onChange={(e) => {
                setContract(e.target.value);
              }}
            >
              <option value="">Select a contract type</option>
              <option value="CIVP">CIVP</option>
              <option value="CDI">CDI</option>
            </select>
          )}
          {positionRef.current === "INTERNSHIP" ? (
            <input
              value={nbCondidats}
              required
              type="number"
              min={0}
              max={10}
              placeholder="Number of interns needed for this role"
              className="bg-transparent border border-gray-300 text-sm rounded-md py-4 block w-full p-2.5 "
              onChange={(e) => setNbCondidats(parseInt(e.target.value))}
            />
          ) : (
            <input
              value={salary}
              required
              type="number"
              min={0}
              placeholder="Salary"
              className="bg-transparent border border-gray-300 text-sm rounded-md py-4 block w-full p-2.5 "
              onChange={(e) => setSalary(e.target.value)}
            />
          )}
        </div>
        <div className="flex justify-end w-full gap-3">
          <button
            onClick={cancelationHandler}
            className="border rounded-md py-1 px-3 border-red-400 hover:bg-red-400 hover:text-white transition-all"
          >
            cancel
          </button>
          <button
            type="submit"
            className="border rounded-md py-1 px-3 border-gray-400 hover:bg-gray-400 hover:text-white transition-all"
          >
            create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewOffer;
