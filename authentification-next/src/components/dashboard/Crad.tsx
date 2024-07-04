import React from "react";
import { BsArrowRightShort } from "react-icons/bs";

const Crad = ({ data }: any) => {
  return (
    <div className="flex flex-col gap-3 overflow-hidden rounded-md shadow-md hover:shadow-lg hover:cursor-pointer transition-all p-3 w-full">
      <p className="text-2xl font-semibold border-b pb-1">{data.positioname}</p>
      <span className="flex justify-between">
        <p className="text-xl font-medium">{data.departement}</p>
        {data.position === "JOB" ? (
          <p className="text-xl font-normal">${data.salary}</p>
        ) : (
          <p className="text-xl font-normal">{data.nbCondidats}</p>
        )}
      </span>
      <span className="flex justify-between">
        <p className="text-gray-500 text-lg">
          {data.description.substring(-1, 10)}
        </p>
        <span className="flex gap-1 items-center">
          <p className="text-gray-400 text-sm underline hover:decoration-gray-600 transition-all">
            show more
          </p>
          <BsArrowRightShort color="#9ca3af" />
        </span>
      </span>
    </div>
  );
};

export default Crad;
