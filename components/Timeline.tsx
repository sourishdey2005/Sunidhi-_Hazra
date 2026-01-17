
import React from 'react';

const milestones = [
  { date: 'March 11', title: 'The Universe Grew Brighter', desc: 'The day Sunidhi was born and the world gained a star.' },
  { date: 'Every Year', title: 'Spreading Magic', desc: 'Each year you bring more smiles than the last.' },
  { date: 'Today', title: 'Infinite Celebration', desc: 'A day reserved purely for your happiness.' },
];

export const Timeline: React.FC = () => {
  return (
    <div className="mt-24 w-full max-w-4xl mx-auto px-4 opacity-0 animate-fadeIn" style={{ animationDelay: '6.5s', animationFillMode: 'forwards' }}>
      <h2 className="vibes-font text-5xl text-purple-200 mb-16 text-center">Path of Joy</h2>
      <div className="relative border-l-2 border-pink-500/30 ml-8 md:ml-0 md:flex md:border-l-0 md:border-t-2 md:justify-between">
        {milestones.map((m, i) => (
          <div key={i} className="mb-12 md:mb-0 relative md:w-1/3 md:pt-8 md:px-4">
            <div className="absolute -left-[9px] top-0 md:left-1/2 md:-top-[9px] w-4 h-4 bg-pink-500 rounded-full shadow-[0_0_10px_#ec4899] z-10"></div>
            <div className="pl-8 md:pl-0 md:text-center">
              <span className="text-pink-400 font-bold text-sm uppercase tracking-tighter">{m.date}</span>
              <h4 className="dancing-font text-2xl text-white my-2">{m.title}</h4>
              <p className="text-white/60 text-sm leading-relaxed">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
