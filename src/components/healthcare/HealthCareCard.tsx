import React from 'react';

const HealthCareCard = ({ title, image, href }) => {
  return (
    <a 
      href={href} 
      className="flex flex-col items-center justify-start p-4 
                 bg-white rounded-lg shadow-sm 
                 hover:shadow-md transition-shadow duration-200 
                 w-full h-60 text-center" // 1. aspect-square সরিয়ে h-60 দেওয়া হয়েছে
    >
      <div className="flex-grow flex items-center justify-center w-full overflow-hidden">
        {/* The image container */}
        <img 
          src={image} 
          alt={title} 
          className="max-w-[90%] max-h-[90%] object-contain" // 2. ইমেজের সাইজ আরও একটু বাড়িয়ে 90% করা হয়েছে
        />
      </div>
      <p className="mt-3 text-sm font-medium text-gray-800 line-clamp-1">
        {title}
      </p>
    </a>
  );
};

export default HealthCareCard;