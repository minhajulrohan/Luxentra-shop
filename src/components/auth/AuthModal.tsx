// src/components/auth/AuthModal.tsx

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";
import { X } from "lucide-react";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// লগইন (Login) এবং সাইনআপ (Sign Up) স্টেট
type AuthType = 'login' | 'signup';

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
    // ডিফল্টভাবে লগইন স্টেট দিয়ে শুরু হবে
    const [authType, setAuthType] = useState<AuthType>('login'); 

    const handleToggle = () => {
        setAuthType(authType === 'login' ? 'signup' : 'login');
    };

    const isLogin = authType === 'login';

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent 
                // ✅ মোবাইল মোডে ছোট করার জন্য:
                className="p-0 max-w-[425px] w-11/12 overflow-hidden [&>button]:hidden" 
                // Daraz এর মতো Modal এর প্রস্থ কমানো হলো
                style={{ borderRadius: '8px' }} 
            >
                {/* Header Section (Daraz-এর মতো) */}
                <DialogHeader className="p-4 border-b">
                    {/* ✅ মোবাইলের জন্য টাইটেল একটু ছোট করা হলো (text-xl থেকে text-lg) */}
                    <DialogTitle className="text-lg font-bold text-gray-700"> 
                        {isLogin ? "Welcome to Luxentra" : "Create Account"}
                    </DialogTitle>
                    {/* Daraz-এর মতো ডানদিকে X বাটন */}
                    <DialogClose asChild>
                        <button 
                            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                            onClick={onClose}
                        >
                            <X className="h-5 w-5" />
                            <span className="sr-only">Close</span>
                        </button>
                    </DialogClose>
                </DialogHeader>

                {/* Form Content Section */}
                {/* ✅ মোবাইলের জন্য প্যাডিং কমানো হলো (p-6 থেকে p-4) */}
                <div className="p-4"> 
                    {isLogin ? (
                        <LoginForm 
                            onToggle={handleToggle} 
                            // Daraz স্টাইল সক্রিয় করা হলো
                            isDarazStyle={true} 
                            // সফল লগইনের পরে Modal বন্ধ করতে
                            onLoginSuccess={onClose}
                        />
                    ) : (
                        <SignUpForm 
                            onToggle={handleToggle} 
                            // Daraz স্টাইল সক্রিয় করা হলো
                            isDarazStyle={true}
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};