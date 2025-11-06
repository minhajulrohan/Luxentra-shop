// ForgotPasswordForm.tsx
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messageSent, setMessageSent] = useState(false);

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Supabase-কে পাসওয়ার্ড রিসেট ইমেল পাঠানোর অনুরোধ
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            // এই URL-এ ক্লিক করলে ইউজারকে আপনার অ্যাপে রিডাইরেক্ট করবে
            // এটি অবশ্যই Supabase ড্যাশবোর্ডের Redirect URLs-এ সেট করা থাকতে হবে
            redirectTo: `${window.location.origin}/reset-password`, 
        });

        setIsLoading(false);

        if (error) {
            console.error('Password Reset Error:', error.message);
            toast.error(error.message);
        } else {
            setMessageSent(true);
            toast.success("Password reset instructions sent! Please check your email.");
        }
    };

    if (messageSent) {
        return (
            <div className="text-center p-6">
                <p className="text-lg font-semibold text-green-500">
                    ✅ Check Your Inbox
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                    We've sent a recovery link to {email}. Please follow the instructions to set a new password.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handlePasswordReset} className="space-y-4">
            <h1 className="text-xl font-bold">Forgot Your Password?</h1>
            <p className="text-sm text-muted-foreground">
                Enter your email address and we'll send you a link to reset your password.
            </p>
            <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
        </form>
    );
};