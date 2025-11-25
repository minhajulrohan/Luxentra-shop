// src/components/auth/LoginForm.tsx

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
const loginSchema = z.object({
    email: z.string().min(1, "Email or Phone is required"),
    password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
    onToggle: () => void;
    onLoginSuccess: () => void;
    isDarazStyle?: boolean;
}

export const LoginForm = ({ onToggle, onLoginSuccess, isDarazStyle = false }: LoginFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    // Daraz Style Classes
    const DARAZ_INPUT_CLASS = "h-12 rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500";
    const DARAZ_BUTTON_CLASS = "w-full h-12 text-base font-semibold bg-orange-500 hover:bg-orange-600 rounded-lg";
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    // --- SUBMIT LOGIC ---
    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });

            if (error) throw error;

            toast.success("Login successful! Welcome back.");
            onLoginSuccess(); // সফল লগইনের পরে মডাল বন্ধ করা
        } catch (error: any) {
            toast.error(error.message || "Login failed. Check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };
    // ----------------------

    return (
        <div className="space-y-4"> 
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                {/* Email Field (Placeholder style) */}
                <div>
                    <Input
                        id="email"
                        type="text" // Email বা Phone দুটোই হতে পারে
                        placeholder="Please enter your Phone or Email"
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
                            placeholder="Please enter your password"
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

                {/* Forgot Password Link */}
                <div className="text-right">
                    <a href="#" className="text-xs text-orange-500 hover:text-orange-600 transition-colors">
                        Forgot password?
                    </a>
                </div>

                {/* Login Button */}
                <Button 
                    type="submit" 
                    className={DARAZ_BUTTON_CLASS} // Orange and full width button
                    disabled={isLoading}
                >
                    {isLoading ? "Signing In..." : "LOGIN"}
                </Button>
            </form>
            
            {/* Don't have an account link */}
            <div className="text-center text-sm mt-4">
                Don't have an account? <span 
                    className="text-orange-500 cursor-pointer hover:underline font-semibold"
                    onClick={onToggle} // সাইনআপ ফর্মে টগল
                >
                    Sign up
                </span>
            </div>

            {/* Social Login Section */}
            <SocialLogin />
        </div>
    );
};