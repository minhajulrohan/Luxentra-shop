// src/components/Ads.tsx
import React, { useEffect, useState } from "react";
import { X, Gift, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";
import slider1 from "@/assets/slider-1.jpg";

type Props = {
  autoCloseSeconds?: number; // auto close after N seconds
  onDismiss?: () => void;    // notify parent when dismissed
};

export default function Ads({ autoCloseSeconds = 10, onDismiss }: Props) {
  const [open, setOpen] = useState(true);
  const [remaining, setRemaining] = useState(autoCloseSeconds);

  useEffect(() => {
    if (!open) return;
    if (remaining <= 0) {
      handleClose();
      return;
    }
    const t = setTimeout(() => setRemaining((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining, open]);

  const handleClose = () => {
    setOpen(false);
    if (typeof onDismiss === "function") onDismiss();
  };

  const handleClaim = () => {
    window.open("/claim", "_blank");
    handleClose();
  };

  const handleSurvey = () => {
    window.open("/survey", "_blank");
    handleClose();
  };

  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
    >
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ y: 20, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative z-10 max-w-3xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="hidden md:block">
          <img src={slider1} alt="promo" className="w-full h-full object-cover" />
        </div>

        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-xl font-extrabold">🎉 বিশেষ অফার!</h4>
              <p className="text-sm text-gray-500">৩টি অ্যাপ ইন্সটল করলেই একটি প্রিমিয়াম প্রোডাক্ট ফ্রি।</p>
            </div>

            <button aria-label="Close" onClick={handleClose} className="p-2 rounded-md hover:bg-gray-100">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1">
            <p className="text-sm text-gray-700">এই অফার সীমিত সময়ের জন্য — দ্রুত অংশগ্রহণ করুন।</p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleClaim}
                className="flex items-center justify-center gap-3 rounded-lg py-3 font-semibold bg-emerald-500 text-white shadow hover:scale-[1.02]"
              >
                <Gift size={16} />
                Claim Now
              </button>

              <button
                onClick={handleSurvey}
                className="flex items-center justify-center gap-3 rounded-lg py-3 font-semibold border border-gray-200 bg-white hover:shadow-md"
              >
                <ClipboardList size={16} />
                Complete Survey
              </button>
            </div>
          </div>

          <footer className="flex items-center justify-between text-xs text-gray-500">
            <span>ব্যবহারবিধি প্রযোজ্য • ঘোষিত সময়সীমা</span>
            <span className="font-mono">00:{String(remaining).padStart(2, "0")}</span>
          </footer>
        </div>
      </motion.div>
    </motion.div>
  );
}
