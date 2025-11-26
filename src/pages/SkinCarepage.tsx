import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SkincareHero from "@/components/Skincare/SkincareHero";
import ShaharaSkinCare from "@/components/Skincare/ShaharaSkinCare";
import ScrollToTopButton from "@/components/Button";
// --- নতুন ইম্পোর্ট ---
import KoreanSkincarePromo from "@/components/Skincare/KoreanSkincarePromo"; 

const SkinCarepage = () => {
    // লক্ষ্য নির্ধারণ: বর্তমান সময় থেকে 4 দিন পর, বাংলাদেশ সময় অনুযায়ী
    const futureDate = new Date();
    // নভেম্বর 29, 2025-এর সন্ধ্যা 5:55:30 PM পর্যন্ত চলবে
    futureDate.setDate(futureDate.getDate() + 4); 
    futureDate.setHours(17, 55, 30, 0); 
    const targetDateString = futureDate.toISOString();


    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            
            <main className="flex-1">
            <section className="container mx-auto px-4 py-8">                    
            <SkincareHero />
            <ShaharaSkinCare />
            {/* এখানে নতুন কম্পোনেন্টটি যুক্ত করা হলো */}
            <KoreanSkincarePromo 
            targetDate={targetDateString} 
            shopNowLink="/shop/flash-sale" // আপনার কাস্টম লিঙ্ক
            readMoreLink="/blogs/korean-skincare-guide" // আপনার কাস্টম লিঙ্ক
            />
            </section>
            </main>
            <Footer />
            <ScrollToTopButton />
        </div>
    );
};

export default SkinCarepage;