
import React from 'react';

const wishes = [
  { 
    title: "Unwavering Peace", 
    text: "May your heart always find a sanctuary of calm amidst the noise of the world. I wish for you nights of deep, restful sleep and mornings where you wake up feeling genuinely excited for the day ahead." 
  },
  { 
    title: "Fearless Success", 
    text: "I wish for every door you knock on to fly open with opportunity. May your hard work yield fruits sweeter than you ever imagined, and may you reach the heights you've only whispered about in your dreams." 
  },
  { 
    title: "Laughter Without End", 
    text: "May your life be punctuated by those deep, soul-cleansing belly laughs that make your eyes water. I wish for you a circle of friends and family who celebrate your wins as if they were their own." 
  },
  { 
    title: "Endless Discovery", 
    text: "May you travel to places that take your breath away and meet people who expand your horizons. I wish for your curiosity to never fade and for the world to keep revealing its most beautiful secrets to you." 
  }
];

export const DeepWishes: React.FC = () => {
  return (
    <div className="mt-40 w-full max-w-6xl mx-auto px-6 opacity-0 animate-fadeIn" style={{ animationDelay: '5s', animationFillMode: 'forwards' }}>
      <div className="text-center mb-24">
        <h2 className="vibes-font text-7xl md:text-9xl text-pink-300 mb-6 drop-shadow-[0_0_20px_rgba(244,114,182,0.4)]">A Thousand Wishes</h2>
        <p className="text-pink-200/40 uppercase tracking-[0.8em] text-xs font-bold">Written in the stars for you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        {wishes.map((w, i) => (
          <div key={i} className="relative group p-10 rounded-[3rem] bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-700 hover:bg-white/10 hover:border-pink-500/30 hover:-translate-y-4">
            {/* Constellation Star */}
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-pink-500 rounded-full blur-[20px] opacity-0 group-hover:opacity-40 transition-opacity"></div>
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_#fff] animate-pulse"></div>
            
            <h3 className="dancing-font text-4xl md:text-5xl text-rose-200 mb-6 group-hover:text-pink-300 transition-colors duration-500 drop-shadow-md">{w.title}</h3>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light italic">
              "{w.text}"
            </p>
            
            {/* Fairy Dust Particles */}
            <div className="absolute bottom-6 right-8 text-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:-translate-y-2">✨</div>
          </div>
        ))}
      </div>
    </div>
  );
};
