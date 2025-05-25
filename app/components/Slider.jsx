"use client";

import React, { useState } from "react";
import { FaChevronLeft ,  FaChevronRight} from "react-icons/fa6";
import { IoChevronBackCircleOutline } from "react-icons/io5";

const Slider = ({ vac }) => {
  const [current, setCurrent] = useState(0);

  console.log(vac) ; 

  const next = () => setCurrent((prev) => (prev + 1) % vac.images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + vac.images.length) % vac.images.length);

  if (vac.images.length === 0) return null;

  return (
    <div className="relative w-full h-full">
      <a href={vac.images[current]} >
      <img
        src={vac.images[current]}
        alt={`Slide ${current}`}
        className="w-full h-full object-cover rounded-t-md"
      />
      </a>
      {vac.images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute cursor-pointer left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
         <FaChevronLeft />
          </button>
          <button
            onClick={next}
            className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
          <FaChevronRight />
          </button>
        </>
      )}
    </div>
  );
};

export default Slider;
