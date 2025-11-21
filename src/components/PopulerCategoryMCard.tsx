// components/CategoryCard.jsx
import React from 'react';

const PopulerCategoryMCard = ({ title, image, href }) => {
  return (
    <a 
      href={href} 
      className="flex flex-col items-center justify-start p-4 
                 bg-white rounded-lg shadow-sm 
                 hover:shadow-md transition-shadow duration-200 
                 w-full h-full aspect-square text-center" // 'aspect-square' makes it square
    >
      <div className="flex-grow flex items-center justify-center w-full">
        {/* The image container for sizing and centering */}
        <img 
          src={image} 
          alt={title} 
          className="max-w-[70%] max-h-[70%] object-contain" // Adjust size as needed, e.g., max-w-[80%]
        />
      </div>
      <p className="mt-2 text-sm font-medium text-gray-800 line-clamp-1">
        {title}
      </p>
    </a>
  );
};

export default PopulerCategoryMCard;