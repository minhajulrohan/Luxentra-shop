import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

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
}

export const SignUpForm = ({ onToggle }: SignUpFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

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

      toast.success("Please check your email to verify your account before logging in.");
      onToggle(); // Switch to login form
    } catch (error: any) {
      toast.error(error.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card p-8 rounded-3xl shadow-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Get Started Now</h1>
        <p className="text-muted-foreground text-sm">Create an account or log in to explore about our app</p>
      </div>

      <div className="flex gap-2 mb-6">
        <Button
          type="button"
          variant="default"
          className="flex-1 rounded-full"
        >
          Sign Up
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="flex-1 rounded-full"
          onClick={onToggle}
        >
          Log In
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Label htmlFor="fullName" className="text-sm text-muted-foreground mb-2 block">
            Full Name
          </Label>
          <Input
            id="fullName"
            placeholder="Enter your full name"
            className="h-12 rounded-xl bg-input border-0"
            {...register("fullName")}
            disabled={isLoading}
          />
          {errors.fullName && (
            <p className="text-destructive text-xs mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="text-sm text-muted-foreground mb-2 block">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="h-12 rounded-xl bg-input border-0"
            {...register("email")}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-destructive text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password" className="text-sm text-muted-foreground mb-2 block">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="h-12 rounded-xl bg-input border-0 pr-12"
              {...register("password")}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-destructive text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="confirmPassword" className="text-sm text-muted-foreground mb-2 block">
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="h-12 rounded-xl bg-input border-0 pr-12"
              {...register("confirmPassword")}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
          className="w-full h-12 rounded-full text-base font-semibold"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};
