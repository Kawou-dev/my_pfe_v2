import React from "react";
import { patterns } from "./HeroPattern";



const CourseCard = () => {
  const pattern = patterns[index % patterns.length]; // garantit un pattern unique par cours

  return (
    <div
      className="w-full h-28 rounded-md shadow-md text-white p-4"
      style={{
        backgroundImage: pattern.background,
        backgroundSize: "cover",
        backgroundColor: "#3f51b5", // couleur de fond derrière le motif
      }}
    > 
    </div>
  );
};

export default CourseCard;
