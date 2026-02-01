"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import * as PortOne from "@portone/browser-sdk/v2";
import { motion } from "framer-motion";
import { Check, Sparkles, Crown } from "lucide-react";

export default function PremiumPage() {
  const handlePayment = async () => {
    try {
      // Mock Payment ID generation
      const paymentId = `payment-${crypto.randomUUID()}`;
      
      const response = await PortOne.requestPayment({
        storeId: "store-4ff4af41-85e3-4573-9e83-0309995150f8", // Demo Store ID
        channelKey: "channel-key-3b3d3b3d-3b3d-3b3d-3b3d-3b3d3b3d3b3d", // Demo Channel Key
        paymentId: paymentId,
        orderName: "Secret Diary Lifetime Access",
        totalAmount: 9900,
        currency: "CURRENCY_KRW",
        payMethod: "CARD",
      });

      if (response?.code != null) {
        // Error handling
        return alert(`Payment Failed: ${response.message}`);
      }

      // Success
      alert("Payment Successful! Welcome to Premium.");
      // Here you would call your backend to verify payment and update user status
      // await fetch('/api/payment/complete', { ... })
      
    } catch (error) {
      console.error(error);
      alert("Payment Error or Cancelled");
    }
  };

  return (
    <div className="min-h-screen bg-pastel-cream flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-pastel-purple/30 relative"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pastel-pink via-pastel-purple to-pastel-blue" />
        
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-pastel-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Crown className="w-10 h-10 text-pastel-purple" />
          </div>
          
          <h1 className="text-4xl font-hand font-bold mb-2 text-ink">Lifetime Access</h1>
          <p className="text-stone-500 mb-8 font-hand text-xl">Unlock all magical features forever</p>
          
          <div className="text-5xl font-bold text-ink mb-2">₩9,900</div>
          <div className="text-stone-400 mb-8 font-hand text-lg">One-time payment</div>

          <div className="space-y-4 text-left mb-8">
            {[
              "Unlimited AI Analysis",
              "Exclusive Sticker Packs",
              "Custom Themes & Fonts",
              "Cloud Backup & Sync"
            ].map((feature, i) => (
              <div key={i} className="flex items-center text-ink/80">
                <div className="bg-pastel-green/20 p-1 rounded-full mr-3">
                  <Check className="w-4 h-4 text-pastel-green" />
                </div>
                <span className="font-hand text-xl">{feature}</span>
              </div>
            ))}
          </div>

          <Button 
            onClick={handlePayment}
            className="w-full py-6 text-xl bg-gradient-to-r from-pastel-purple to-pastel-pink text-white hover:opacity-90 transition-opacity shadow-lg shadow-pastel-purple/20"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Get Premium Now
          </Button>
          
          <p className="mt-4 text-xs text-stone-400">
            Secure payment powered by PortOne
          </p>
        </div>
      </motion.div>
    </div>
  );
}
