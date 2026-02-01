"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const router = useRouter();

  const handleUnlock = () => {
    setIsUnlocked(true);
    setTimeout(() => {
      router.push("/diary");
    }, 1500); // Slightly longer delay to enjoy the animation
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden relative bg-pastel-cream">
      {/* Background texture overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-50 z-0 pointer-events-none" />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 flex flex-col items-center"
      >
        <motion.h1 
          className="text-7xl md:text-9xl font-hand text-ink mb-12 tracking-wider drop-shadow-sm"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          Secret Diary
        </motion.h1>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUnlock}
          className={cn(
            "rounded-full shadow-xl cursor-pointer w-32 h-32 flex items-center justify-center border-4 transition-colors duration-500",
            isUnlocked 
              ? "bg-pastel-green border-green-200 text-white" 
              : "bg-pastel-pink border-pink-200 text-ink"
          )}
        >
          <motion.div
            animate={isUnlocked ? { rotate: 0, scale: 1.2 } : { rotate: [0, -10, 10, 0] }}
            transition={isUnlocked ? { type: "spring" } : { repeat: Infinity, repeatDelay: 2, duration: 0.5 }}
          >
            {isUnlocked ? (
              <Unlock className="w-12 h-12" />
            ) : (
              <Lock className="w-12 h-12" />
            )}
          </motion.div>
        </motion.div>

        <p className="mt-8 text-ink/60 font-hand text-3xl">
          {isUnlocked ? "Welcome back..." : "Touch to open"}
        </p>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-black/5 to-transparent z-0" />
      <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-red-300/20 z-0" />
    </main>
  );
}
