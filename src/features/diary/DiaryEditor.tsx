"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Image as ImageIcon, Sparkles, Save, X, Plus } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { VoiceRecorder } from "./VoiceRecorder";
import { StickerShop, DraggableSticker } from "./StickerSystem";
import { createClient } from "@/lib/supabase/client";

interface StickerItem {
  id: string;
  stickerId: string;
  x: number;
  y: number;
}

export const DiaryEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  
  // New State for features
  const [isPremium, setIsPremium] = useState(false); // Should fetch from Supabase
  const [showStickerShop, setShowStickerShop] = useState(false);
  const [stickers, setStickers] = useState<StickerItem[]>([]);
  const [bgColor, setBgColor] = useState("#FDF5E6");
  const [bgImage, setBgImage] = useState<string | null>(null);

  // Fetch Premium Status (Mock for now, or real if connected)
  React.useEffect(() => {
    const checkPremium = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('is_premium').eq('id', user.id).single();
        if (data?.is_premium) setIsPremium(true);
      }
    };
    try {
      checkPremium();
    } catch(e) {
      console.log("Supabase not configured or error", e);
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!content.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/diary/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, imageUrl: image }),
      });
      
      const data = await response.json();
      
      if (data.rewritten_content) {
        setContent(data.rewritten_content); // Update with AI rewritten content
      }
      if (data.color) {
        setBgColor(data.color);
      }
      if (data.image_prompt) {
        // Generate image URL using Pollinations.ai
        const encodedPrompt = encodeURIComponent(data.image_prompt);
        // Add some random seed to ensure new image every time
        const seed = Math.floor(Math.random() * 1000);
        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${seed}&nologo=true&model=flux`;
        setBgImage(imageUrl);
      }
      if (data.stickers) {
        // Map AI suggested stickers to our canvas
        const newStickers = data.stickers.map((s: any, i: number) => ({
          id: `ai-${Date.now()}-${i}`,
          stickerId: s.stickerId,
          x: s.x || Math.random() * 200,
          y: s.y || Math.random() * 200,
        }));
        setStickers((prev) => [...prev, ...newStickers]);
      }
      
      setIsPreview(true); // Switch to preview to show the result
    } catch (error) {
      console.error("Analysis failed", error);
      alert("AI Analysis failed. Try again!");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleVoiceTranscript = (text: string) => {
    setContent((prev) => prev + (prev ? " " : "") + text);
  };

  const addSticker = (stickerId: string) => {
    setStickers((prev) => [
      ...prev,
      {
        id: `manual-${Date.now()}`,
        stickerId,
        x: 50, // Default position
        y: 50,
      },
    ]);
    setShowStickerShop(false);
  };

  const updateStickerPosition = (id: string, x: number, y: number) => {
    setStickers((prev) => prev.map((s) => (s.id === id ? { ...s, x, y } : s)));
  };

  const removeSticker = (id: string) => {
    setStickers((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 font-hand relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl text-ink font-bold">Today's Story</h2>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            onClick={() => setIsPreview(!isPreview)}
            className="text-xl"
          >
            {isPreview ? "Edit Mode" : "Preview Mode"}
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!isPreview ? (
          <motion.div
            key="editor"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="min-h-[60vh] flex flex-col gap-4 relative">
              <input
                type="text"
                placeholder="오늘의 제목을 적어주세요..."
                className="w-full text-4xl bg-transparent border-b-2 border-dashed border-stone-200 pb-2 focus:outline-none focus:border-pastel-pink placeholder:text-stone-300"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <div className="flex-1 relative">
                <textarea
                  className="w-full h-full min-h-[400px] resize-none bg-transparent focus:outline-none text-2xl leading-relaxed bg-[linear-gradient(transparent,transparent_29px,#E5E5E5_30px)] bg-[length:100%_30px]"
                  placeholder="오늘 무슨 일이 있었나요? 직접 쓰거나 마이크를 눌러 말해보세요..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  style={{ lineHeight: "30px" }}
                />
                <div className="absolute bottom-4 right-4 z-10">
                   <VoiceRecorder onTranscript={handleVoiceTranscript} />
                </div>
              </div>

              {image && (
                <div className="relative w-40 h-40 rounded-xl overflow-hidden shadow-sm group">
                  <img src={image} alt="Upload" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setImage(null)}
                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t border-stone-100">
                <div className="flex gap-2">
                  <label className="cursor-pointer hover:bg-stone-50 p-2 rounded-full transition-colors text-stone-400 hover:text-pastel-blue">
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    <ImageIcon size={24} />
                  </label>
                </div>
                
                <Button 
                  onClick={handleSave} 
                  isLoading={isAnalyzing}
                  className="bg-gradient-to-r from-pastel-pink to-pastel-purple text-white border-none"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  AI Auto-Write & Decorate
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card 
              className="min-h-[60vh] transition-all duration-1000 relative overflow-hidden bg-cover bg-center"
              style={{ 
                backgroundColor: bgColor,
                backgroundImage: bgImage ? `url(${bgImage})` : undefined
              }}
            >
              {/* Overlay for readability if image is present */}
              {bgImage && (
                <div className="absolute inset-0 bg-white/70 pointer-events-none z-0" />
              )}

              {/* Sticker Layer */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                 {/* Background pattern could go here */}
              </div>

              <div className="absolute inset-0 z-50">
                {stickers.map((sticker) => (
                  <DraggableSticker
                    key={sticker.id}
                    {...sticker}
                    onUpdatePosition={updateStickerPosition}
                    onDelete={removeSticker}
                  />
                ))}
              </div>

              <div className="text-center mb-8 relative z-20 pointer-events-none">
                <h1 className="text-5xl mb-2">{title}</h1>
                <p className="text-ink/60 text-xl">{new Date().toLocaleDateString()}</p>
              </div>
              
              {image && (
                <div className="mb-6 flex justify-center rotate-[-2deg] relative z-20 pointer-events-none">
                  <div className="bg-white p-3 shadow-md pb-8">
                    <img src={image} alt="Memory" className="max-w-md max-h-80 object-cover" />
                  </div>
                </div>
              )}

              <div className="prose prose-lg max-w-none font-hand text-2xl text-ink leading-loose relative z-20 pointer-events-none">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>

              {/* Floating Action Button for Stickers */}
              <div className="absolute bottom-6 right-6 z-30">
                <Button
                  onClick={() => setShowStickerShop(true)}
                  className="rounded-full w-14 h-14 bg-white shadow-xl text-pastel-purple hover:scale-110 transition-transform p-0"
                >
                  <Plus size={30} />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <StickerShop 
        isOpen={showStickerShop} 
        onClose={() => setShowStickerShop(false)} 
        onSelectSticker={addSticker}
        isPremium={isPremium}
      />
    </div>
  );
};
