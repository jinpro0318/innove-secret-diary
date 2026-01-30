"use client";

import { useState, useRef, useEffect } from 'react';

type Sticker = {
  emoji: string;
  x: string;
  y: string;
  rotation: string;
};

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [diaryContent, setDiaryContent] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [isDecorating, setIsDecorating] = useState(false);
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [paperTint, setPaperTint] = useState('');

  // Voice Recognition Setup
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      // @ts-ignore
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) setDiaryContent((prev) => prev + ' ' + transcript);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
    setIsRecording(!isRecording);
  };

  const handleRefine = async () => {
    if (!diaryContent) return;
    setIsRefining(true);
    try {
      const res = await fetch('/api/diary/refine', {
        method: 'POST',
        body: JSON.stringify({ text: diaryContent }),
      });
      const data = await res.json();
      if (data.refinedText) {
        setDiaryContent(data.refinedText);
        handleDecorate(data.refinedText);
      }
    } catch (e) {
      console.error(e);
      alert('Failed to refine diary.');
    } finally {
      setIsRefining(false);
    }
  };

  const handleDecorate = async (text: string) => {
    setIsDecorating(true);
    try {
      const res = await fetch('/api/diary/decorate', {
        method: 'POST',
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (data.stickers) setStickers(data.stickers);
      if (data.backgroundColor) setPaperTint(data.backgroundColor);
    } catch (e) {
      console.error(e);
    } finally {
      setIsDecorating(false);
    }
  };

  return (
    <main className={`flex min-h-screen items-center justify-center p-4 overflow-hidden ${isOpen ? 'book-open' : ''}`}>
      
      {/* 3D Book Container */}
      <div className="book-container relative">
        
        {/* Cover (Front) */}
        <div 
          className="book-cover flex flex-col items-center justify-center p-12 cursor-pointer border-l-4 border-l-[#5e3a24]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="border-4 border-[#5e3a24] p-8 rounded-lg bg-[#a06b46] shadow-inner">
            <h1 className="text-6xl font-hand text-[#3e2718] text-center drop-shadow-md">
              Secret<br/>Diary
            </h1>
            <p className="mt-4 text-center text-[#3e2718] font-bold opacity-70">TAP TO OPEN</p>
          </div>
          {/* Decorative Gold Foil effect */}
          <div className="absolute top-10 bottom-10 left-12 w-1 bg-[#d4af37] opacity-50"></div>
        </div>

        {/* Inside Pages */}
        <div className="absolute inset-y-4 inset-x-0 flex perspective-1000 z-10 pointer-events-none">
           {/* We use pointer-events-none on container but auto on pages if needed, 
               but for the open book effect, we place pages behind cover in DOM order or use Z-index.
               Actually, in this CSS 3D setup, the cover is Z-50.
               We need pages to be visible when cover rotates.
           */}
           
           {/* Left Page (Decorations) */}
           <div className="page-left absolute top-0 bottom-0 pointer-events-auto p-8 flex flex-col justify-center items-center">
              <h2 className="text-4xl font-hand text-brand-leather mb-6 rotate-[-2deg]">Memory Lane</h2>
              <div className="w-full h-64 bg-gray-200/50 rounded-sm border-2 border-dashed border-gray-400 flex items-center justify-center rotate-1 transform hover:scale-105 transition-transform">
                <span className="text-gray-400 font-hand text-2xl">Photo Area</span>
              </div>
              <p className="mt-8 text-xl font-hand text-text-sepia text-center">
                "The best way to predict the future is to create it."
              </p>
              
              {/* Ribbon */}
              <div className="ribbon-marker" onClick={() => setIsOpen(false)}></div>
           </div>

           {/* Right Page (Writing Area) */}
           <div 
              className="page-right absolute top-0 bottom-0 pointer-events-auto p-8 overflow-hidden transition-colors duration-1000"
              style={{ backgroundColor: paperTint || 'transparent' }}
           >
              {/* Stickers Layer */}
              {stickers.map((sticker, idx) => (
                <div key={idx} 
                     className="absolute text-5xl pointer-events-none drop-shadow-sm animate-bounce-slow z-20"
                     style={{ 
                       left: sticker.x, 
                       top: sticker.y, 
                       transform: `rotate(${sticker.rotation})` 
                     }}>
                  {sticker.emoji}
                </div>
              ))}

              <div className="flex justify-between items-center mb-4 border-b border-brand-leather/20 pb-2">
                <span className="text-brand-leather font-bold text-lg">JAN 30, 2026</span>
                <div className="flex gap-2">
                   <span className="text-xl">☀️</span>
                   <span className="text-xl">mood: Calm</span>
                </div>
              </div>

              <textarea 
                className="w-full h-[60%] bg-transparent border-none outline-none resize-none text-xl leading-[2.5rem] text-text-sepia font-body placeholder-text-muted/40"
                placeholder="Dear Diary, today I..."
                value={diaryContent}
                onChange={(e) => setDiaryContent(e.target.value)}
              />

              {/* Action Area */}
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center">
                <button 
                  onClick={toggleRecording}
                  className={`btn-stamp text-sm py-1 px-4 ${isRecording ? 'text-red-600 border-red-400' : ''}`}
                >
                  {isRecording ? 'Listening...' : '🎙️ Record'}
                </button>

                <button 
                   onClick={handleRefine}
                   disabled={!diaryContent || isRefining}
                   className="btn-stamp bg-brand-wax text-white border-transparent text-sm py-1 px-4 hover:bg-brand-wax/90 disabled:opacity-50"
                >
                   {isRefining ? '✨ Magic...' : '✨ Magic Refine'}
                </button>
              </div>

              {/* Loading Overlay */}
              {(isRefining || isDecorating) && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-[2px] z-30">
                  <div className="text-2xl font-hand text-brand-leather animate-pulse">
                    Thinking...
                  </div>
                </div>
              )}
           </div>
        </div>

      </div>
    </main>
  );
}
