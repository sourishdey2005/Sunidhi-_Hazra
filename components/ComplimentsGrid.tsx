
import React from 'react';

const compliments = [
  { 
    icon: '✨', 
    title: 'Radiant Presence', 
    desc: 'Your energy isn\'t just a mood; it\'s a lighthouse. You have this innate ability to illuminate every room you enter, making even the grayest days feel like they are soaked in warm, golden sunshine.' 
  },
  { 
    icon: '🎨', 
    title: 'Infinite Creativity', 
    desc: 'You don\'t just see the world; you interpret it through a kaleidoscope of wonder. Your mind is a canvas where dreams and reality dance together, creating a perspective that is uniquely and beautifully yours.' 
  },
  { 
    icon: '💖', 
    title: 'Golden Heart', 
    desc: 'Your kindness is a silent force of nature. It’s in the quiet way you listen and the fierce way you protect the people you love. You have a heart that beats in sync with the happiness of those around you.' 
  },
  { 
    icon: '🌙', 
    title: 'Celestial Dreamer', 
    desc: 'You aim for the stars not because they are high, but because that’s where you belong. Your ambitions are fueled by a soul that refuses to settle for anything less than extraordinary.' 
  },
  { 
    icon: '🦋', 
    title: 'Effortless Grace', 
    desc: 'You handle life’s complexities with a poise that is nothing short of regal. Even in storms, you move like a butterfly—gentle, resilient, and always finding your way toward the light.' 
  },
  { 
    icon: '🌟', 
    title: 'Truly Peerless', 
    desc: 'One in a billion doesn\'t quite cover it. You are a singular event in time, a perfect blend of wit, charm, and depth. There has never been, and will never be, anyone quite like Sunidhi.' 
  }
];

export const ComplimentsGrid: React.FC = () => {
  return (
    <div className="mt-24 w-full px-4 opacity-0 animate-fadeIn" style={{ animationDelay: '4.5s', animationFillMode: 'forwards' }}>
      <div className="text-center mb-16">
        <h2 className="vibes-font text-6xl text-rose-200 mb-4">The Essence of You</h2>
        <p className="text-pink-200/60 font-light tracking-widest uppercase text-sm">A celebration of your extraordinary character</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {compliments.map((c, i) => (
          <div 
            key={i}
            className="group bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-pink-400/30 hover:bg-white/15 hover:scale-[1.03] transition-all duration-500 cursor-default shadow-2xl flex flex-col items-center text-center"
          >
            <div className="text-5xl mb-6 transform group-hover:scale-125 group-hover:rotate-[360deg] transition-all duration-700">{c.icon}</div>
            <h4 className="font-bold text-pink-300 text-xl mb-4 tracking-wide">{c.title}</h4>
            <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
