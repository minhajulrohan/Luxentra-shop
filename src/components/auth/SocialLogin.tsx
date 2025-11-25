// src/components/auth/SocialLogin.tsx

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client"; 
import { FcGoogle } from "react-icons/fc"; 
import { FaFacebook } from "react-icons/fa";
import { useState } from "react";
import { toast } from "sonner";

// Daraz Style Classes
const DARAZ_SOCIAL_BUTTON_CLASS = "w-full h-12 text-base rounded-lg border-gray-300 shadow-sm flex items-center justify-center gap-2";

export const SocialLogin = () => {
    const [isLoading, setIsLoading] = useState(false);

    // ✅ ফাংশন: সোশ্যাল লগইনের জন্য (Supabase OAuth)
    const handleSocialLogin = async (provider: 'google' | 'facebook') => {
        setIsLoading(true);
        try {
            // Supabase-এর signInWithOAuth ফাংশনটি কল করা
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: provider,
                options: {
                    // সফল লগইন এবং ভেরিফিকেশনের পর ইউজারকে এই URL-এ পাঠানো হবে।
                    // নিশ্চিত করুন যে এই URL টি Supabase ড্যাশবোর্ডের Allowed Redirect URLs-এ আছে।
                    redirectTo: `${window.location.origin}/`, 
                },
            });

            if (error) {
                throw error;
            }
            
            // signInWithOAuth স্বয়ংক্রিয়ভাবে ব্রাউজারকে রিডাইরেক্ট করে দেয়।
            // তাই এখানে আর ম্যানুয়ালি window.location.href পরিবর্তনের প্রয়োজন নেই।
            
        } catch (error: any) {
            toast.error("Social login failed. Please ensure your Supabase redirect URLs are correct.");
            console.error("Social Login Error:", error);
        } finally {
            // Loading স্টেটটি reset করার প্রয়োজন নেই, কারণ ইউজার অন্য পেইজে রিডাইরেক্ট হয়ে যাবে।
            // তবে ব্যর্থ হলে reset করা প্রয়োজন:
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-3 pt-3">
            <div className="flex items-center justify-center space-x-2">
                <hr className="w-full border-t border-gray-300" />
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                    Or, sign up with
                </span>
                <hr className="w-full border-t border-gray-300" />
            </div>
            
            {/* Google Button */}
            <Button
                variant="outline"
                className={DARAZ_SOCIAL_BUTTON_CLASS}
                onClick={() => handleSocialLogin('google')} // ✅ লজিক কল
                disabled={isLoading}
            >
                <FcGoogle className="w-6 h-6" /> Google
            </Button>

            {/* Facebook Button */}
            {/* <Button
                variant="outline"
                className={DARAZ_SOCIAL_BUTTON_CLASS}
                onClick={() => handleSocialLogin('facebook')} // ✅ লজিক কল
                disabled={isLoading}
            >
                <FaFacebook className="w-5 h-5 text-[#3b5998]" /> Facebook
            </Button> */}
        </div>
    );
};