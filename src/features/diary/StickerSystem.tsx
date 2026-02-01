"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lock, Smile, Heart, Star, Sun, Cloud, Moon, Coffee, Music, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Mock Sticker Data
export const STICKERS = [
  // Free
  { id: "smile", icon: Smile, isPremium: false },
  { id: "heart", icon: Heart, isPremium: false },
  { id: "star", icon: Star, isPremium: false },
  { id: "sun", icon: Sun, isPremium: false },
  { id: "cloud", icon: Cloud, isPremium: false },
  // Premium
  { id: "moon", icon: Moon, isPremium: true },
  { id: "coffee", icon: Coffee, isPremium: true },
  { id: "music", icon: Music, isPremium: true },
  { id: "zap", icon: Zap, isPremium: true },
  { id: "crown", icon: Crown, isPremium: true },
];

interface StickerShopProps {
  isPremium: boolean;
  onSelectSticker: (stickerId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const StickerShop = ({ isPremium, onSelectSticker, isOpen, onClose }: StickerShopProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 p-6 overflow-y-auto border-l border-stone-100"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-hand font-bold text-ink">Sticker Shop</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>Close</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {STICKERS.map((sticker) => {
          const Icon = sticker.icon;
          const isLocked = sticker.isPremium && !isPremium;

          return (
            <div
              key={sticker.id}
              className={cn(
                "aspect-square rounded-xl flex items-center justify-center relative cursor-pointer transition-all hover:scale-110",
                isLocked ? "bg-stone-100 opacity-50" : "bg-pastel-cream hover:bg-pastel-pink/20"
              )}
              onClick={() => {
                if (isLocked) {
                  alert("This is a Premium sticker! Upgrade to unlock.");
                } else {
                  onSelectSticker(sticker.id);
                }
              }}
            >
              <Icon className={cn("w-8 h-8", isLocked ? "text-stone-400" : "text-ink")} />
              {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 rounded-xl">
                  <Lock className="w-4 h-4 text-stone-500" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {!isPremium && (
        <div className="mt-8 p-4 bg-gradient-to-r from-pastel-purple to-pastel-pink rounded-xl text-white text-center">
          <p className="font-bold mb-2">Unlock All Stickers</p>
          <Button variant="secondary" size="sm" className="w-full text-sm">
            Go Premium
          </Button>
        </div>
      )}
    </motion.div>
  );
};

interface DraggableStickerProps {
  id: string;
  stickerId: string;
  x: number;
  y: number;
  onUpdatePosition: (id: string, x: number, y: number) => void;
  onDelete: (id: string) => void;
}

export const DraggableSticker = ({ id, stickerId, x, y, onUpdatePosition, onDelete }: DraggableStickerProps) => {
  const stickerData = STICKERS.find(s => s.id === stickerId);
  if (!stickerData) return null;
  
  const Icon = stickerData.icon;

  return (
    <motion.div
      drag
      dragMomentum={false}
      // Remove initial/animate x/y to prevent conflict with drag
      initial={{ scale: 0, x, y }} 
      animate={{ scale: 1, x, y }}
      onDragEnd={(_, info) => {
        // Calculate new position based on delta
        // We use the current visual position which framer motion handles
        // But we need to update our state so it persists on re-renders
        // However, updating state triggers re-render which might reset position if not careful
        // Better approach: Let framer handle visual drag, update state on end
        // IMPORTANT: info.point is absolute, we need relative to container.
        // For simplicity in this MVP, we accumulate offsets.
        // Actually, a safer way for simple 2D positioning is to use style={{ left: x, top: y }} and drag
        // But with Framer Motion 'drag', it uses transform.
        // Let's try to update the state with the NEW x/y
        
        // Since we are using x/y in animate prop, updating them will animate to new pos.
        // But info.offset is relative to start of drag.
        onUpdatePosition(id, x + info.offset.x, y + info.offset.y);
      }}
      className="absolute cursor-move group z-50 touch-none" // touch-none for better touch support
      style={{ x, y }} // Bind motion value directly if possible, or rely on animate
      whileHover={{ scale: 1.2, cursor: "grab" }}
      whileTap={{ scale: 0.9, cursor: "grabbing" }}
      whileDrag={{ scale: 1.1, cursor: "grabbing", zIndex: 100 }}
    >
      <div className="relative">
        <Icon className="w-16 h-16 text-ink drop-shadow-lg filter" />
        <button
          onPointerDown={(e) => {
            e.stopPropagation(); // Prevent drag start
          }}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          className="absolute -top-2 -right-2 bg-red-400 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
        >
          <div className="w-4 h-4 flex items-center justify-center text-[10px] font-bold">✕</div>
        </button>
      </div>
    </motion.div>
  );
};
