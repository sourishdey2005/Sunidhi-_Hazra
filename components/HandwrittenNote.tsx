
import React from 'react';

export const HandwrittenNote: React.FC = () => {
  return (
    <div className="mt-20 mb-16 relative w-full max-w-3xl mx-auto px-4 opacity-0 animate-fadeIn" style={{ animationDelay: '3.5s', animationFillMode: 'forwards' }}>
      <div className="bg-[#fffdf5] p-10 md:p-16 rounded-sm shadow-[20px_20px_40px_rgba(0,0,0,0.4)] border-l-[12px] border-pink-300 relative transform -rotate-1 transition-transform hover:rotate-0 duration-700">
        {/* Paper texture/lines effect */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '100% 2.5rem' }}></div>
        
        <h3 className="vibes-font text-5xl text-pink-700 mb-8 border-b border-pink-100 pb-2 inline-block">My Dearest Sunidhi,</h3>
        
        <div className="dancing-font text-2xl md:text-3xl text-gray-800 leading-[1.8] space-y-6">
          <p>
            Today is a day that the universe itself must be celebrating. It marks another year of your beautiful existence, another chapter in the story of a girl who carries sunshine in her pockets and stars in her eyes. Watching you grow and navigate the world is like watching a rare flower bloom in high definition—vibrant, steady, and utterly breathtaking.
          </p>
          <p>
            You possess a rare kind of magic, Sunidhi. It’s in the way you find beauty in the mundane, and the way your laughter can dissolve the heaviest of clouds. You aren't just a part of the world; you make the world a significantly better, kinder, and more colorful place just by standing in it.
          </p>
          <p>
            As you blow out your candles today, I hope you realize that you are the wish that came true for so many people. May this year be a masterpiece of joy, filled with unexpected adventures, soul-stirring music, and the kind of happiness that makes your heart feel like it's overflowing. Never stop being the magnificent soul that you are.
          </p>
        </div>
        
        <div className="mt-12 text-right">
          <p className="vibes-font text-4xl text-pink-600">With infinite love & deepest admiration,</p>
          <p className="dancing-font text-xl text-gray-500 mt-2 tracking-widest">— Your biggest cheerleader, forever ✨</p>
        </div>

        {/* Decorative elements on paper */}
        <div className="absolute -top-6 -right-6 text-5xl transform rotate-12 drop-shadow-md">🌸</div>
        <div className="absolute -bottom-6 -left-6 text-5xl transform -rotate-12 drop-shadow-md">🦋</div>
        <div className="absolute top-1/2 -right-8 text-3xl animate-pulse">✨</div>
      </div>
    </div>
  );
};
