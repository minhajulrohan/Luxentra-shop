import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Banner from '@/assets/banner-9.webp' 

interface KoreanSkincarePromoProps {
  /** The target date/time for the countdown (e.g., '2025-12-31T23:59:59'). */
  targetDate: string;
  /** Link for the 'Shop Now' button. */
  shopNowLink?: string;
  /** Link for the 'Read More' button. */
  readMoreLink?: string;
}
const calculateTimeRemaining = (target: string) => {
  const now = new Date().getTime();
  const targetTime = new Date(target).getTime();
  const difference = targetTime - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isFinished: true };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isFinished: false };
};

// --- Main Component ---
const KoreanSkincarePromo: React.FC<KoreanSkincarePromoProps> = ({ 
  targetDate,
  shopNowLink = "/shop-korean",
  readMoreLink = "/about-skincare"
}) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeRemaining(targetDate));

  useEffect(() => {
    if (timeLeft.isFinished) return;
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, timeLeft.isFinished]);

  const formatTime = (time: number) => time.toString().padStart(2, '0');
  
  const TimerUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center mx-2 sm:mx-3">
      <span className="text-3xl lg:text-4xl font-normal leading-none text-gray-800">
        {formatTime(value)}
      </span>
      <span className="text-xs sm:text-sm font-bold text-gray-500 uppercase mt-1">
        {label}
      </span>
    </div>
  );

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden my-12 mx-auto max-w-4xl">
      <div className="flex flex-col md:flex-row">
        
        {/* --- Left Content Section --- */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-center items-center text-center">
          <div className="max-w-md">
            {/* ফন্ট সাইজ সামান্য কমানো হয়েছে */}
            <h2 className="text-lg sm:text-xl font-normal text-gray-800 mb-1">
              ENJOY THE BEST QUALITY
            </h2>
            <h1 className="text-3xl sm:text-4xl font-semibold text-pink-600 mb-3 sm:mb-4">
              Korean skin care products
            </h1>
            <h2 className="text-lg sm:text-xl font-normal text-gray-800 mb-5">
              in Bangladesh
            </h2>
            
            {/* Company Info - ফন্ট সাইজ কমানো হয়েছে */}
            <p className="text-sm font-bold text-gray-900 mb-1">
              Luxentra-shop Skin Care BD
            </p>
            <p className="text-xs text-gray-600 mb-1">
              We directly import all our products from **Korea 🇰🇷**
            </p>
            <p className="text-xs text-gray-600 mb-3">
              That's why our customers always get **100% Original** Korean Skin Care Products ✅
            </p>
            <p className="text-sm font-bold text-gray-800 mb-5">
              Trust us for your skincare journey
            </p>

            {/* Countdown Timer */}
            <div className="flex justify-center mb-6">
              <TimerUnit value={timeLeft.days} label="Days" />
              <TimerUnit value={timeLeft.hours} label="Hr" />
              <TimerUnit value={timeLeft.minutes} label="Min" />
              <TimerUnit value={timeLeft.seconds} label="Sc" />
            </div>
            
            {/* Buttons */}
            <div className="flex justify-center space-x-3">
              <Link to={shopNowLink}>
                <button className="px-6 py-2 bg-pink-600 text-white font-bold uppercase rounded-md shadow-lg hover:bg-pink-700 transition duration-300 text-sm">
                  SHOP NOW
                </button>
              </Link>
              <Link to={readMoreLink}>
                <button className="px-6 py-2 bg-white text-gray-800 font-bold uppercase rounded-md border border-gray-300 hover:bg-gray-50 transition duration-300 text-sm">
                  READ MORE
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* --- Right Image Section (মোবাইল ফুল হাইট এবং লিঙ্ক যুক্ত) --- */}
        <div className="md:w-1/2 relative min-h-[400px] bg-[#f5e9e9] flex items-center justify-center">
          <Link to={shopNowLink} className="absolute inset-0">
            {/* Image Container */}
            <div className="w-full h-full">
              {/* Image কম্পোনেন্ট - height full সেট করা হয়েছে */}
              <img 
                src={Banner} 
                alt="Original Korean Skincare Products in Bangladesh" 
                className="w-full h-full object-cover" 
              />
            </div>

          </Link>
        </div>
      </div>
    </div>
  );
};

export default KoreanSkincarePromo;