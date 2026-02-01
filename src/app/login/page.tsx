"use client";

import { motion } from "framer-motion";
import SocialLogin from "@/features/auth/SocialLogin";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-pastel-cream flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-stone-100 text-center"
      >
        <h1 className="text-4xl font-hand mb-2 text-ink">Welcome Back</h1>
        <p className="text-stone-400 mb-8 font-hand text-xl">
          Your secret stories are safe here.
        </p>

        <div className="flex justify-center">
          <SocialLogin />
        </div>
        
        <div className="mt-8 text-sm text-stone-300">
          By continuing, you agree to our Terms & Privacy Policy
        </div>
      </motion.div>
    </div>
  );
}
