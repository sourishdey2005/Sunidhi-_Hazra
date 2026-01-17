
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
    <div className="mt-32 w-full max-w-5xl mx-auto px-4 opacity-0 animate-fadeIn" style={{ animationDelay: '5s', animationFillMode: 'forwards' }}>
      <h2 className="vibes-font text-6xl text-pink-300 mb-16 text-center drop-shadow-lg">A Thousand Wishes For You</h2>
      <div className="space-y-12">
        {wishes.map((w, i) => (
          <div key={i} className="relative group pl-8 md:pl-16">
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-pink-500 to-transparent rounded-full opacity-30 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute -left-2 top-0 w-5 h-5 bg-pink-500 rounded-full blur-[2px] opacity-0 group-hover:opacity-80 transition-opacity"></div>
            <h3 className="dancing-font text-3xl text-rose-200 mb-3 group-hover:text-pink-300 transition-colors">{w.title}</h3>
            <p className="text-lg text-white/70 leading-relaxed font-light italic max-w-3xl">
              "{w.text}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
