
import React, { useState, useEffect, useRef } from 'react';
import { Fireworks } from './components/Fireworks';
import { Cake } from './components/Cake';
import { StarrySky } from './components/StarrySky';
import { FloatingItems } from './components/FloatingItems';
import { Countdown } from './components/Countdown';
import { Confetti } from './components/Confetti';
import { PhotoGallery } from './components/PhotoGallery';
import { HandwrittenNote } from './components/HandwrittenNote';
import { ComplimentsGrid } from './components/ComplimentsGrid';
import { GiftBox } from './components/GiftBox';
import { Timeline } from './components/Timeline';
import { DeepWishes } from './components/DeepWishes';

const App: React.FC = () => {
  const [phase, setPhase] = useState<'entry' | 'blowing' | 'wish'>('entry');
  const [isMuted, setIsMuted] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startCelebration = () => {
    setPhase('blowing');
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        console.log("Audio play blocked. interaction required.");
      });
      setIsAudioPlaying(true);
      setIsMuted(false);
    }
  };

  const handleCandlesBlown = () => {
    setTimeout(() => {
      setPhase('wish');
    }, 1200);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center text-white bg-[#050510]">
      <StarrySky />
      <Fireworks active={phase !== 'entry'} />
      <FloatingItems count={25} />
      
      <audio 
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
      />

      {isAudioPlaying && (
        <button 
          onClick={toggleMute}
          className="fixed top-6 right-6 z-50 p-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-full border border-white/20 transition-all duration-300 shadow-xl"
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          )}
        </button>
      )}

      {phase === 'entry' && (
        <div className="z-20 text-center animate-fadeIn px-4 flex flex-col items-center w-full max-w-[100vw]">
          <div className="mb-6 text-pink-400 animate-bounce text-2xl md:text-3xl">✨ 💖 ✨</div>
          <h1 className="vibes-font text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] mb-4 animate-grandEntrance leading-tight md:leading-none text-transparent bg-clip-text bg-gradient-to-b from-pink-200 via-rose-400 to-purple-500 drop-shadow-[0_0_20px_rgba(244,114,182,0.3)]">
            A Universe for Sunidhi
          </h1>
          <p className="mb-10 text-rose-200/70 tracking-[0.3em] md:tracking-[0.5em] uppercase text-xs md:text-lg font-bold animate-pulse">Destined for magic</p>
          <Countdown targetDate="2025-03-11" />
          <button 
            onClick={startCelebration}
            className="mt-16 px-10 md:px-16 py-6 md:py-8 bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-[length:200%_auto] animate-gradientMove rounded-full text-xl md:text-3xl font-bold hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_0_70px_rgba(244,63,94,0.5)] border border-pink-400/50 group overflow-hidden relative"
          >
            <span className="relative z-10">Step Into Her Magic ✨</span>
          </button>
        </div>
      )}

      {phase === 'blowing' && (
        <div className="z-20 flex flex-col items-center animate-fadeIn px-6 w-full max-h-full overflow-y-auto py-10">
          <h2 className="dancing-font text-4xl sm:text-6xl md:text-9xl text-pink-200 mb-8 text-center drop-shadow-[0_0_30px_rgba(255,182,193,0.5)]">
            A Wish Just For You...
          </h2>
          <div className="mb-12 max-w-4xl w-full">
            <p className="text-rose-100 text-lg sm:text-2xl md:text-5xl font-light text-center leading-snug italic animate-softPulse break-words">
              "Take a deep breath, Sunidhi. Close your eyes, think of your wildest dream, and let the magic begin."
            </p>
          </div>
          <div className="transform scale-[0.65] sm:scale-75 md:scale-100 transition-transform origin-center">
            <Cake onBlown={handleCandlesBlown} />
          </div>
          <p className="mt-12 text-white/30 text-[10px] md:text-sm animate-pulse italic tracking-widest uppercase font-bold text-center">The Universe is listening. Make it count.</p>
        </div>
      )}

      {phase === 'wish' && (
        <div className="z-20 w-full h-full flex flex-col items-center animate-fadeIn overflow-y-auto px-4 py-24 custom-scrollbar">
          <div className="w-full max-w-6xl flex flex-col items-center">
            <Confetti />
            
            <header className="text-center mb-60 animate-scaleUp">
              <h2 className="vibes-font text-6xl sm:text-8xl md:text-[15rem] text-pink-300 mb-14 drop-shadow-[0_0_60px_rgba(255,182,193,0.5)] animate-shimmer">
                Happy Birthday! 🎉
              </h2>
              <div className="space-y-12 text-2xl sm:text-4xl md:text-6xl text-rose-50/90 font-light max-w-6xl mx-auto leading-tight">
                <p className="animate-typewriter overflow-hidden whitespace-nowrap border-r-4 border-pink-400 mx-auto italic drop-shadow-lg max-w-full">
                  "Sunidhi, your smile lights up every room."
                </p>
                <div className="space-y-8 opacity-0 animate-fadeIn" style={{ animationDelay: '2.5s', animationFillMode: 'forwards' }}>
                   <p className="text-pink-100/80">Today is a grand celebration of the day the world got infinitely brighter.</p>
                   <p className="text-pink-300 font-bold drop-shadow-xl text-3xl sm:text-5xl md:text-7xl">You are a masterpiece of nature.</p>
                </div>
              </div>
            </header>

            <section className="mb-60 w-full flex flex-col items-center"><PhotoGallery /></section>
            <section className="mb-60 w-full flex flex-col items-center"><Timeline /></section>
            <section className="mb-60 w-full flex flex-col items-center"><DeepWishes /></section>
            <section className="mb-60 w-full flex flex-col items-center z-30"><GiftBox /></section>
            <section className="mb-60 w-full flex flex-col items-center"><HandwrittenNote /></section>
            <section className="mb-60 w-full flex flex-col items-center"><ComplimentsGrid /></section>

            <div className="mt-20 pt-40 border-t border-white/10 w-full text-center pb-60 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-60 bg-gradient-to-b from-pink-500 to-transparent"></div>
              <p className="dancing-font text-4xl sm:text-6xl md:text-8xl text-purple-200 mb-16 opacity-0 animate-fadeIn" style={{ animationDelay: '8.5s', animationFillMode: 'forwards' }}>
                Admired by many, loved by all 💫
              </p>
              <div className="opacity-0 animate-fadeIn" style={{ animationDelay: '9.5s', animationFillMode: 'forwards' }}>
                <p className="text-white/40 max-w-4xl mx-auto mb-20 text-lg md:text-2xl font-light leading-relaxed px-4">
                  Thank you for being the wonderful person you are. This digital garden was built specifically to remind you of your worth on your special day. You are a star that needs no sky to shine.
                </p>
                <button 
                  onClick={() => setPhase('blowing')}
                  className="px-12 md:px-20 py-6 md:py-8 bg-gradient-to-r from-pink-600/20 to-purple-600/20 hover:from-pink-600/40 hover:to-purple-600/40 rounded-full text-xl md:text-3xl border border-white/20 transition-all backdrop-blur-md shadow-2xl hover:scale-105 active:scale-95"
                >
                  Relive the Magic 🪄
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleUp { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes grandEntrance {
          0% { opacity: 0; transform: scale(0.8) translateY(50px); filter: blur(20px); letter-spacing: 0.1em; }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); letter-spacing: -0.025em; }
        }
        @keyframes softPulse {
          0%, 100% { transform: scale(1); text-shadow: 0 0 10px rgba(255,255,255,0.2); }
          50% { transform: scale(1.02); text-shadow: 0 0 30px rgba(255,255,255,0.4); }
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes typewriter { from { width: 0; } to { width: 100%; } }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-fadeIn { animation: fadeIn 1.8s ease-out forwards; }
        .animate-scaleUp { animation: scaleUp 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .animate-grandEntrance { animation: grandEntrance 2.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .animate-softPulse { animation: softPulse 4s ease-in-out infinite; }
        .animate-gradientMove { animation: gradientMove 3s ease infinite; }
        .animate-typewriter { animation: typewriter 3s steps(60, end) forwards; }
        .animate-shimmer {
          background: linear-gradient(90deg, #f9a8d4, #f472b6, #e879f9, #f9a8d4);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 5s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
