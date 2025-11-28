// src/components/EmailSubscription.jsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

const EmailSubscription = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  const isValidEmail = (email) => {
    // Simple regex for email validation
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // --- Dynamic Email Submission Logic ---
    // In a real application, you would make an API call here.
    // E.g., fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) })
    
    console.log(`Subscribing email: ${email}`);
    
    // Simulate a successful API response
    setTimeout(() => {
      setIsSubscribed(true);
      // Optional: Clear the email input after a slight delay
      // setEmail(""); 
    }, 500);
    // ----------------------------------------
  };

  return (
    <div className="py-2 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
        <h2 className="mt-2 text-2xl font-extrabold text-gray-900 dark:text-white sm:text-2xl">
          Subscribe to Our Newsletter
        </h2>
        {isSubscribed ? (
          <div className="mt-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            <p className="font-semibold">🥳 Thank you for subscribing!</p>
            <p>We've added{email}to our mailing list.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 sm:flex sm:max-w-md sm:mx-auto">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <Input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="Enter your email"
            />
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <Button
                type="submit"
                className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Subscribe
              </Button>
            </div>
          </form>
        )}
        
        {error && (
          <p className="mt-3 text-sm text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
};

export default EmailSubscription;