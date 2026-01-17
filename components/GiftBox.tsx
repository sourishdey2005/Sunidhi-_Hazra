
import React, { useState } from 'react';

export const GiftBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-60 flex flex-col items-center opacity-0 animate-fadeIn relative z-40 w-full" style={{ animationDelay: '5.5s', animationFillMode: 'forwards' }}>
      <h2 className="vibes-font text-8xl text-yellow-200 mb-24 drop-shadow-2xl animate-pulse">A special gift for you! 🎁</h2>
      
      <div className="relative cursor-pointer mb-24 scale-125 md:scale-[1.5]" onClick={() => setIsOpen(!isOpen)}>
        {/* The Box - 3D CSS Construct */}
        <div className="relative w-56 h-56 group">
          {/* Lid */}
          <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-64 h-20 bg-rose-700 rounded-xl shadow-2xl z-30 transition-all duration-1000 origin-bottom ${isOpen ? '-translate-y-64 -rotate-[15deg] opacity-0 scale-75' : 'hover:scale-105'}`}>
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-full bg-pink-400/50"></div>
             <div className="absolute inset-0 border border-white/20 rounded-xl"></div>
          </div>
          
          {/* Box Body */}
          <div className="absolute bottom-0 left-0 w-56 h-48 bg-rose-600 rounded-b-3xl shadow-[0_40px_80px_rgba(0,0,0,0.6)] z-20 flex items-center justify-center overflow-hidden border border-rose-500/50">
             <div className="w-12 h-full bg-pink-400/50"></div>
             <div className="absolute top-1/2 left-0 w-full h-12 bg-pink-400/50 -translate-y-1/2"></div>
             <div className="absolute inset-0 border-t-4 border-white/10 shadow-inner"></div>
             
             {/* Magical Core */}
             {isOpen && <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/40 via-white/20 to-transparent blur-3xl animate-pulse"></div>}
          </div>

          {/* Luxury Ribbon Bow */}
          <div className={`absolute -top-16 left-1/2 -translate-x-1/2 z-40 transition-all duration-700 ${isOpen ? 'opacity-0 scale-0 -translate-y-40' : 'animate-bounce'}`}>
            <div className="flex gap-2">
              <div className="w-14 h-14 border-[6px] border-pink-200 rounded-full rotate-45 shadow-lg bg-pink-400/40 backdrop-blur-sm"></div>
              <div className="w-14 h-14 border-[6px] border-pink-200 rounded-full -rotate-45 shadow-lg bg-pink-400/40 backdrop-blur-sm"></div>
            </div>
            <div className="w-6 h-6 bg-yellow-100 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl border-2 border-pink-300"></div>
          </div>
        </div>
      </div>

      {/* Infinite Joy Ticket Reveal - Sophisticated & Large */}
      <div className={`w-full max-w-5xl bg-gradient-to-br from-white/10 via-pink-900/10 to-transparent backdrop-blur-3xl rounded-[3rem] border border-white/20 transition-all duration-1000 flex flex-col items-center justify-center p-16 md:p-24 text-center shadow-[0_30px_100px_rgba(0,0,0,0.7)] transform ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-90 pointer-events-none'}`}>
        <div className="text-9xl mb-10 animate-bounce filter drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">🎫</div>
        <h4 className="vibes-font text-8xl md:text-9xl text-pink-300 mb-10 drop-shadow-[0_4px_20px_rgba(244,114,182,0.6)]">Infinite Joy Ticket</h4>
        <div className="relative px-4">
          <p className="dancing-font text-4xl md:text-6xl text-rose-50 leading-relaxed mb-12 italic max-w-4xl mx-auto">
            “This enchanted ticket grants <span className="text-pink-300 font-bold underline decoration-pink-500/30">Sunidhi</span> a lifetime of breathtaking moments, astronomical success, and pure, unconditional love.”
          </p>
        </div>
        <div className="pt-10 border-t border-white/10 w-full mt-4">
          <p className="text-lg md:text-xl text-pink-400 font-bold tracking-[0.6em] uppercase animate-pulse">Issued with profound admiration ✨</p>
        </div>
      </div>
      
      <p className={`mt-16 text-rose-200/50 font-bold tracking-[0.3em] uppercase text-sm transition-opacity ${isOpen ? 'opacity-0' : 'animate-pulse'}`}>
        Tap the box to receive your gift
      </p>
    </div>
  );
};
