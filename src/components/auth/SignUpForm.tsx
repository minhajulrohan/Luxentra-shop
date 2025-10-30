import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
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
  const [date, setDate] = useState<Date>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log("Sign up data:", data);
    toast.success("Account created successfully!");
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
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="firstName" className="text-sm text-muted-foreground mb-2 block">
              First Name
            </Label>
            <Input
              id="firstName"
              placeholder="Raj"
              className="h-12 rounded-xl bg-input border-0"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-destructive text-xs mt-1">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="lastName" className="text-sm text-muted-foreground mb-2 block">
              Last Name
            </Label>
            <Input
              id="lastName"
              placeholder="Sarkar"
              className="h-12 rounded-xl bg-input border-0"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-destructive text-xs mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="email" className="text-sm text-muted-foreground mb-2 block">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="sarkarraj0766@gmail.com"
            className="h-12 rounded-xl bg-input border-0"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-destructive text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label className="text-sm text-muted-foreground mb-2 block">
            Birth of date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl bg-input border-0 justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "dd/MM/yyyy") : <span>15/06/2000</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  setDate(newDate);
                  if (newDate) {
                    setValue("dateOfBirth", newDate);
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.dateOfBirth && (
            <p className="text-destructive text-xs mt-1">{errors.dateOfBirth.message}</p>
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
              placeholder="(454) 726-0592"
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

        <div>
          <Label htmlFor="confirmPassword" className="text-sm text-muted-foreground mb-2 block">
            Set Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••"
              className="h-12 rounded-xl bg-input border-0 pr-12"
              {...register("confirmPassword")}
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

        <Button type="submit" className="w-full h-12 rounded-full text-base font-semibold">
          Sign Up
        </Button>
      </form>
    </div>
  );
};
