
import React, { useState } from 'react';

export const GiftBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-32 flex flex-col items-center opacity-0 animate-fadeIn relative z-40" style={{ animationDelay: '5.5s', animationFillMode: 'forwards' }}>
      <h2 className="vibes-font text-6xl text-yellow-200 mb-16 drop-shadow-lg">A special gift for you! 🎁</h2>
      
      <div className="relative cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {/* Surprise Reveal - Positioned higher and with more z-index */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-80 h-56 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/30 transition-all duration-1000 flex flex-col items-center justify-center p-8 text-center shadow-[0_0_60px_rgba(255,255,255,0.3)] z-50 ${isOpen ? '-translate-y-64 opacity-100 scale-125' : 'opacity-0 scale-50 pointer-events-none'}`}>
          <div className="text-5xl mb-4 animate-bounce">🎫</div>
          <h4 className="vibes-font text-4xl text-pink-300 mb-2">Infinite Joy Ticket</h4>
          <p className="text-base text-white/80 leading-snug">This enchanted ticket grants Sunidhi a lifetime of breathtaking moments, success, and pure love.</p>
          <div className="mt-6 pt-4 border-t border-white/10 w-full text-[11px] text-pink-400 font-bold tracking-[0.2em] uppercase">Issued with admiration</div>
        </div>

        {/* The Box - Realistic 3D-ish CSS box */}
        <div className="relative w-56 h-56 group">
          {/* Lid */}
          <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-64 h-16 bg-rose-700 rounded-xl shadow-xl z-30 transition-all duration-700 origin-bottom ${isOpen ? '-translate-y-32 -rotate-45 opacity-0' : ''}`}>
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-full bg-pink-400/40"></div>
             <div className="absolute inset-0 border border-white/10 rounded-xl"></div>
          </div>
          
          {/* Main Box Body */}
          <div className="absolute bottom-0 left-0 w-56 h-48 bg-rose-600 rounded-b-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-20 flex items-center justify-center overflow-hidden">
             {/* Ribbon Cross */}
             <div className="w-10 h-full bg-pink-400/40"></div>
             <div className="absolute top-1/2 left-0 w-full h-10 bg-pink-400/40 -translate-y-1/2"></div>
             <div className="absolute inset-0 border-t-2 border-white/20"></div>
          </div>

          {/* Ribbon Bow */}
          <div className={`absolute -top-12 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${isOpen ? 'opacity-0 scale-0' : 'animate-bounce'}`}>
            <div className="flex gap-1">
              <div className="w-10 h-10 border-4 border-pink-300 rounded-full rotate-45 shadow-sm bg-pink-400/20"></div>
              <div className="w-10 h-10 border-4 border-pink-300 rounded-full -rotate-45 shadow-sm bg-pink-400/20"></div>
            </div>
            <div className="w-4 h-4 bg-pink-200 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md"></div>
          </div>
        </div>
      </div>
      
      <p className={`mt-10 text-rose-200/40 font-bold tracking-widest uppercase text-xs transition-opacity ${isOpen ? 'opacity-0' : 'animate-pulse'}`}>
        Tap the box to open
      </p>
    </div>
  );
};
