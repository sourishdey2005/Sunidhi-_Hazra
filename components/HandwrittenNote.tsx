
import React, { useState, useEffect, useRef } from 'react';

export const HandwrittenNote: React.FC = () => {
  const fullText = [
    "Today is a day that the universe itself must be celebrating. It marks another year of your beautiful existence, another chapter in the story of a girl who carries sunshine in her pockets and stars in her eyes. Watching you grow and navigate the world is like watching a rare flower bloom in high definition—vibrant, steady, and utterly breathtaking.",
    "You possess a rare kind of magic, Sunidhi. It’s in the way you find beauty in the mundane, and the way your laughter can dissolve the heaviest of clouds. You aren't just a part of the world; you make the world a significantly better, kinder, and more colorful place just by standing in it.",
    "As you blow out your candles today, I hope you realize that you are the wish that came true for so many people. May this year be a masterpiece of joy, filled with unexpected adventures, soul-stirring music, and the kind of happiness that makes your heart feel like it's overflowing. Never stop being the magnificent soul that you are."
  ];

  const [displayedParagraphs, setDisplayedParagraphs] = useState<string[]>(["", "", ""]);
  const [currentParaIndex, setCurrentParaIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger typewriter when component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isStarted) return;

    if (currentParaIndex < fullText.length) {
      if (currentCharIndex < fullText[currentParaIndex].length) {
        const timer = setTimeout(() => {
          setDisplayedParagraphs(prev => {
            const next = [...prev];
            next[currentParaIndex] = fullText[currentParaIndex].slice(0, currentCharIndex + 1);
            return next;
          });
          setCurrentCharIndex(prev => prev + 1);
        }, 30); // Speed of typing
        return () => clearTimeout(timer);
      } else {
        // Move to next paragraph after a small pause
        const nextParaTimer = setTimeout(() => {
          setCurrentParaIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 500);
        return () => clearTimeout(nextParaTimer);
      }
    }
  }, [isStarted, currentParaIndex, currentCharIndex]);

  return (
    <div 
      ref={containerRef}
      className="mt-20 mb-32 relative w-full max-w-4xl mx-auto px-4 opacity-0 animate-fadeIn" 
      style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
    >
      <div className="bg-[#fffdf5] p-8 md:p-20 rounded-sm shadow-[30px_30px_60px_rgba(0,0,0,0.5)] border-l-[15px] border-pink-400 relative transform -rotate-1 transition-transform hover:rotate-0 duration-1000 overflow-hidden">
        {/* Paper texture/lines effect */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px)', backgroundSize: '100% 3rem' }}></div>
        
        {/* Subtle ink blotches */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-pink-200/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-40 left-10 w-48 h-48 bg-purple-200/10 rounded-full blur-3xl pointer-events-none"></div>

        <h3 className="vibes-font text-5xl md:text-6xl text-pink-800 mb-12 border-b-2 border-pink-100 pb-4 inline-block transform -rotate-2">
          My Dearest Sunidhi,
        </h3>
        
        <div className="dancing-font text-2xl md:text-4xl text-gray-800 leading-[1.8] space-y-10 min-h-[500px]">
          {displayedParagraphs.map((text, idx) => (
            <p key={idx} className="relative">
              {text}
              {currentParaIndex === idx && currentCharIndex < fullText[idx].length && (
                <span className="inline-block w-1 h-8 bg-pink-400 animate-pulse ml-1 align-middle"></span>
              )}
            </p>
          ))}
        </div>
        
        <div className={`mt-20 text-right transition-opacity duration-1000 ${currentParaIndex >= fullText.length ? 'opacity-100' : 'opacity-0'}`}>
          <p className="vibes-font text-5xl md:text-6xl text-pink-700 mb-2">With infinite love & admiration,</p>
          <p className="dancing-font text-2xl text-gray-400 tracking-[0.3em] uppercase">— Forever your admirer ✨</p>
        </div>

        {/* Floating elements attached to the note */}
        <div className="absolute -top-8 -right-8 text-6xl transform rotate-12 animate-bounce-slow">🌸</div>
        <div className="absolute -bottom-8 -left-8 text-6xl transform -rotate-12 animate-float-gentle">🦋</div>
        <div className="absolute top-1/4 -right-12 text-4xl animate-pulse text-pink-300">✨</div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(15deg); }
        }
        @keyframes float-gentle {
          0%, 100% { transform: translate(0, 0) rotate(-12deg); }
          50% { transform: translate(10px, -15px) rotate(-8deg); }
        }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
        .animate-float-gentle { animation: float-gentle 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};
