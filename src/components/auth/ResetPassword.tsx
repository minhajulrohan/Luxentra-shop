// ResetPassword.tsx
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } => '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleNewPasswordSet = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Supabase-এর সাহায্যে ইউজারের পাসওয়ার্ড আপডেট করা
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        setIsLoading(false);

        if (error) {
            console.error('Password Update Error:', error.message);
            toast.error(error.message);
        } else {
            // পাসওয়ার্ড সফলভাবে সেট হয়েছে, ইউজার এখন লগইন অবস্থায় আছে
            toast.success("Password successfully updated! You are now logged in.");
            navigate('/'); // হোম পেজে রিডাইরেক্ট
        }
    };

    return (
        <form onSubmit={handleNewPasswordSet} className="space-y-4 max-w-sm mx-auto p-6">
            <h1 className="text-2xl font-bold">Set New Password</h1>
            <p className="text-sm text-muted-foreground">
                Enter your new password below.
            </p>
            <div>
                <Label htmlFor="password">New Password</Label>
                <Input 
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                    disabled={isLoading}
                />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Password"}
            </Button>
        </form>
    );
};