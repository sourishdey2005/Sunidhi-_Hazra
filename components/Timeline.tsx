
import React from 'react';

const milestones = [
  { 
    date: 'March 11', 
    title: 'The Universe Grew Brighter', 
    desc: 'The day Sunidhi was born and the world gained a star that shines with unparalleled brilliance and warmth.' 
  },
  { 
    date: 'Every Year', 
    title: 'Spreading Magic', 
    desc: 'With every passing year, you bring more genuine smiles, more selfless kindness, and more infinite wonder than the last.' 
  },
  { 
    date: 'Today', 
    title: 'Infinite Celebration', 
    desc: 'A day reserved purely for your happiness, honoring the incredible, radiant person you have become.' 
  },
];

export const Timeline: React.FC = () => {
  return (
    <div className="mt-40 w-full max-w-7xl mx-auto px-6 opacity-0 animate-fadeIn" style={{ animationDelay: '6.5s', animationFillMode: 'forwards' }}>
      <div className="text-center mb-32">
        <h2 className="vibes-font text-8xl md:text-[10rem] text-purple-200 mb-6 drop-shadow-2xl">Path of Joy</h2>
        <div className="w-48 h-1.5 bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto rounded-full"></div>
      </div>
      
      <div className="relative border-l-4 border-pink-500/20 ml-10 md:ml-0 md:flex md:border-l-0 md:border-t-4 md:justify-between">
        {milestones.map((m, i) => (
          <div key={i} className="mb-32 md:mb-0 relative md:w-1/3 md:pt-16 md:px-12 group">
            {/* Pulsing Marker */}
            <div className="absolute -left-[18px] top-0 md:left-1/2 md:-top-[18px] md:-translate-x-1/2 w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-600 rounded-full shadow-[0_0_30px_#ec4899] z-10 transition-transform duration-700 group-hover:scale-150 animate-pulse"></div>
            
            <div className="pl-16 md:pl-0 md:text-center">
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 transition-all duration-500 group-hover:bg-white/10 group-hover:border-pink-400/30">
                <span className="text-pink-400 font-black text-xl md:text-2xl uppercase tracking-[0.4em] drop-shadow-md mb-6 block">{m.date}</span>
                <h4 className="vibes-font text-5xl md:text-6xl text-white my-6 group-hover:text-pink-200 transition-colors duration-300 drop-shadow-lg">{m.title}</h4>
                <p className="dancing-font text-3xl md:text-4xl text-rose-100/90 leading-relaxed italic font-light drop-shadow-sm">
                  “{m.desc}”
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
