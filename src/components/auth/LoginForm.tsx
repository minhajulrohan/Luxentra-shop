import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { SocialLogin } from "./SocialLogin";
import { toast } from "sonner";

const loginSchema = z.object({
  identifier: z.string().min(1, "Phone number or email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onToggle: () => void;
}

export const LoginForm = ({ onToggle }: LoginFormProps) => {
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login data:", data);
    toast.success("Login functionality would be implemented here!");
  };

  return (
    <div className="bg-card p-8 rounded-3xl shadow-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
        <p className="text-muted-foreground text-sm">Login to access your account</p>
      </div>

      <div className="flex gap-2 mb-6">
        <Button
          type="button"
          variant={loginMethod === "phone" ? "default" : "secondary"}
          className="flex-1 rounded-full"
          onClick={() => setLoginMethod("phone")}
        >
          Phone Number
        </Button>
        <Button
          type="button"
          variant={loginMethod === "email" ? "default" : "secondary"}
          className="flex-1 rounded-full"
          onClick={() => setLoginMethod("email")}
        >
          Email
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Label htmlFor="identifier" className="text-sm text-muted-foreground mb-2 block">
            {loginMethod === "phone" ? "Phone Number" : "Email"}
          </Label>
          <Input
            id="identifier"
            type={loginMethod === "phone" ? "tel" : "email"}
            placeholder={loginMethod === "phone" ? "+880177547701" : "Enter your email"}
            className="h-12 rounded-xl bg-input border-0"
            {...register("identifier")}
          />
          {errors.identifier && (
            <p className="text-destructive text-xs mt-1">{errors.identifier.message}</p>
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
              placeholder="••••••"
              className="h-12 rounded-xl bg-input border-0 pr-12"
              {...register("password")}
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

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" {...register("rememberMe")} />
            <Label htmlFor="remember" className="text-sm text-foreground cursor-pointer">
              Remember me
            </Label>
          </div>
          <button
            type="button"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit" className="w-full h-12 rounded-full text-base font-semibold">
          Log In
        </Button>
      </form>

      <SocialLogin />

      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <button
            onClick={onToggle}
            className="text-primary hover:underline font-semibold"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};
