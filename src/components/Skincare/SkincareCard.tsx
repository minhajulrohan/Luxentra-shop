import React from "react";

const SkincareCard = ({ title, image, href }) => {
  return (
    <a
      href={href}
      className="relative block w-full h-60 rounded-lg overflow-hidden shadow-sm 
                 hover:shadow-lg transition-shadow duration-300 group"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Hover Overlay (optional) */}
      <div
        className="absolute inset-0 flex items-end justify-center bg-black/30 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <p className="mb-4 text-lg font-semibold text-white">{title}</p>
      </div>
    </a>
  );
};

export default SkincareCard;
