// src/hooks/useSessionId.ts
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; 

// টাইপস্ক্রিপ্ট অনুযায়ী, আমরা useState এর জন্য স্পষ্টভাবে টাইপ উল্লেখ করতে পারি
export const useSessionId = () => {
    // null অথবা string হতে পারে, তাই useState<string | null> ব্যবহার করা হলো
    const [sessionId, setSessionId] = useState<string | null>(null);

    useEffect(() => {
        let storedId = localStorage.getItem('product_session_id');

        if (!storedId) {
            // যদি আগে সেশন আইডি না থাকে, নতুন আইডি তৈরি করুন
            const newId = uuidv4();
            localStorage.setItem('product_session_id', newId);
            storedId = newId;
        }

        setSessionId(storedId);
    }, []);

    // হুকটি string অথবা null রিটার্ন করবে
    return sessionId;
};