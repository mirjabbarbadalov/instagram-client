import React, { useState } from "react";
import Modal from "./Modal";

interface GridProps {
  images: string[];
}

export const Grid: React.FC<GridProps> = ({ images }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="grid grid-cols-3 gap-4 mt-5 mb-5">
      {images.map((imageUrl, index) => (
        <div
          key={index}
          className="relative w-56 h-56 cursor-pointer"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={imageUrl}
            alt={`Post ${index + 1}`}
            className="object-cover w-56 h-56"
          />
          {hoveredIndex === index && (
            <Modal key={index} onClose={handleMouseLeave} />
          )}
        </div>
      ))}
    </div>
  );
};
