import React from "react";
import { MdClear } from "react-icons/md";

const OfferDetails = ({ data, isVisible, onClose }: any) => {
  if (!isVisible) return null;

  const applicationHandler = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 w-full bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center transition-all">
      <div className="flex flex-col bg-white w-2/4 p-5 gap-5 rounded-md">
        <MdClear
          size={30}
          className="hover:cursor-pointer"
          onClick={() => onClose()}
        />
        <div className="flex flex-col gap-3 px-5">
          <p className="text-2xl font-semibold border-b pb-2">
            {data.positioname}
          </p>
          <span>
            <p className="text-xl font-medium">Postion: </p>
            <p className="text-base font-normal">{data.position}</p>
          </span>
          <span>
            <p className="text-xl font-medium">Departement: </p>
            <p className="text-base font-normal"> {data.departement} </p>
          </span>
          <span>
            <p className="text-xl font-medium">Description:</p>
            <p className="text-base font-normal">{data.description}</p>
          </span>
          {!data.salary ? (
            <span>
              <p className="text-xl font-medium">
                Nember of Condidats needed for this role:
              </p>
              <p className="text-base font-normal">{data.nbCondidats}</p>
            </span>
          ) : (
            <span>
              <p className="text-xl font-medium">Salary:</p>
              <p className="text-base font-normal">{data.salary}</p>
            </span>
          )}
          <div className="flex justify-end">
            <button
              onClick={applicationHandler}
              className="border rounded-md py-1 px-3 border-gray-400 hover:bg-gray-400 hover:text-white transition-all"
            >
              apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetails;
