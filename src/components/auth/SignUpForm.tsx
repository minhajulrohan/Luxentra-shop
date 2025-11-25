// src/components/auth/SignUpForm.tsx

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SocialLogin } from "./SocialLogin"; // সোশ্যাল লগইন ইম্পোর্ট

// --- ZOD SCHEMA ---
const signUpSchema = z.object({
    fullName: z.string().min(1, "Full name is required").max(100),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

interface SignUpFormProps {
    onToggle: () => void;
    isDarazStyle?: boolean;
}

export const SignUpForm = ({ onToggle, isDarazStyle = false }: SignUpFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    // Daraz Style Classes
    const DARAZ_INPUT_CLASS = "h-12 rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500";
    const DARAZ_BUTTON_CLASS = "w-full h-12 text-base font-semibold bg-orange-500 hover:bg-orange-600 rounded-lg";
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
    });

    // --- SUBMIT LOGIC ---
    const onSubmit = async (data: SignUpFormData) => {
        setIsLoading(true);
        try {
            const { error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    emailRedirectTo: `${window.location.origin}/`,
                    data: {
                        full_name: data.fullName,
                    },
                },
            });

            if (error) throw error;

            toast.success("Registration successful! Please check your email to verify your account.");
            onToggle(); // সফল সাইনআপের পর লগইন ফর্মে ফিরে যাওয়া
        } catch (error: any) {
            toast.error(error.message || "Failed to create account. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    // ----------------------

    return (
        <div className="space-y-4">
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                {/* Full Name Field */}
                <div>
                    <Input
                        id="fullName"
                        placeholder="Please enter your Full Name"
                        className={DARAZ_INPUT_CLASS} 
                        {...register("fullName")}
                        disabled={isLoading}
                    />
                    {errors.fullName && (
                        <p className="text-destructive text-xs mt-1">{errors.fullName.message}</p>
                    )}
                </div>

                {/* Email Field */}
                <div>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Please enter your Email"
                        className={DARAZ_INPUT_CLASS} 
                        {...register("email")}
                        disabled={isLoading}
                    />
                    {errors.email && (
                        <p className="text-destructive text-xs mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Password Field */}
                <div>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Please enter a Password (min 6 chars)"
                            className={`${DARAZ_INPUT_CLASS} pr-12`} 
                            {...register("password")}
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-orange-500 transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-destructive text-xs mt-1">{errors.password.message}</p>
                    )}
                </div>

                {/* Confirm Password Field */}
                <div>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className={`${DARAZ_INPUT_CLASS} pr-12`} 
                            {...register("confirmPassword")}
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-orange-500 transition-colors"
                        >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-destructive text-xs mt-1">{errors.confirmPassword.message}</p>
                    )}
                </div>

                <Button 
                    type="submit" 
                    className={DARAZ_BUTTON_CLASS} // Orange and full width button
                    disabled={isLoading}
                >
                    {isLoading ? "Creating account..." : "Sign Up"}
                </Button>
            </form>

            {/* Already have an account link */}
            <div className="text-center text-sm mt-4">
                Already have an account? <span 
                    className="text-orange-500 cursor-pointer hover:underline font-semibold"
                    onClick={onToggle} // লগইন ফর্মে টগল
                >
                    Login
                </span>
            </div>
            
            {/* Social Login Section */}
            <SocialLogin />
        </div>
    );
};