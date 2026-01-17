
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
  const [heartTrail, setHeartTrail] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() < 0.15) { // Throttle heart creation
        const id = Date.now();
        setHeartTrail(prev => [...prev.slice(-15), { id, x: e.clientX, y: e.clientY }]);
        setTimeout(() => {
          setHeartTrail(prev => prev.filter(h => h.id !== id));
        }, 1000);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center text-white bg-[#050510] selection:bg-pink-500/30">
      <StarrySky />
      <Fireworks active={phase !== 'entry'} />
      <FloatingItems count={25} />
      
      {/* Heart Cursor Trail */}
      {heartTrail.map(h => (
        <div 
          key={h.id} 
          className="fixed pointer-events-none text-pink-400/60 z-[100] text-xl animate-floatOut"
          style={{ left: h.x, top: h.y }}
        >
          💖
        </div>
      ))}
      
      <audio 
        ref={audioRef}
        loop
        src="https://res.cloudinary.com/dodhvvewu/video/upload/v1768644509/happy_birthday_x8wppp.mp3" 
      />

      {isAudioPlaying && (
        <button 
          onClick={toggleMute}
          className="fixed top-6 right-6 z-50 p-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-full border border-white/20 transition-all duration-300 shadow-xl group"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg className="group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
          ) : (
            <svg className="group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          )}
        </button>
      )}

      {phase === 'entry' && (
        <div className="z-20 text-center animate-fadeIn px-4 flex flex-col items-center w-full max-w-[100vw]">
          <div className="mb-8 text-pink-400 animate-bounce text-3xl md:text-4xl">✨ 💖 ✨</div>
          <h1 className="vibes-font text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] mb-6 animate-grandEntrance leading-tight md:leading-none text-transparent bg-clip-text bg-gradient-to-b from-pink-200 via-rose-400 to-purple-500 drop-shadow-[0_0_30px_rgba(244,114,182,0.4)]">
            A Universe for Sunidhi
          </h1>
          <p className="mb-12 text-rose-200/70 tracking-[0.3em] md:tracking-[0.6em] uppercase text-xs md:text-xl font-bold animate-pulse">Destined for breathtaking magic</p>
          <Countdown targetDate="2025-03-11" />
          <button 
            onClick={startCelebration}
            className="mt-20 px-12 md:px-20 py-8 md:py-10 bg-gradient-to-r from-pink-700 via-rose-500 to-purple-600 bg-[length:200%_auto] animate-gradientMove rounded-full text-2xl md:text-4xl font-bold hover:scale-110 active:scale-95 transition-all duration-500 shadow-[0_0_80px_rgba(244,63,94,0.6)] border border-pink-400/50 group overflow-hidden relative"
          >
            <span className="relative z-10 flex items-center gap-4">Step Into Her Magic <span className="animate-pulse">✨</span></span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
        </div>
      )}

      {phase === 'blowing' && (
        <div className="z-20 flex flex-col items-center animate-fadeIn px-6 w-full max-h-full overflow-y-auto py-10 no-scrollbar">
          <h2 className="dancing-font text-5xl sm:text-7xl md:text-9xl text-pink-200 mb-10 text-center drop-shadow-[0_0_40px_rgba(255,182,193,0.6)]">
            A Wish for Sunidhi...
          </h2>
          <div className="mb-14 max-w-5xl w-full">
            <p className="text-rose-100 text-xl sm:text-3xl md:text-6xl font-light text-center leading-relaxed italic animate-softPulse break-words drop-shadow-lg px-4">
              "Take a deep breath, Sunidhi. Close your eyes, reach for your wildest dream, and let the magic ignite."
            </p>
          </div>
          <div className="transform scale-[0.6] sm:scale-75 md:scale-100 lg:scale-110 transition-transform origin-center">
            <Cake onBlown={handleCandlesBlown} />
          </div>
          <p className="mt-16 text-white/40 text-xs md:text-lg animate-pulse italic tracking-[0.3em] uppercase font-bold text-center">The Universe is holding its breath for you.</p>
        </div>
      )}

      {phase === 'wish' && (
        <div className="z-20 w-full h-full flex flex-col items-center animate-fadeIn overflow-y-auto px-4 py-24 custom-scrollbar scroll-smooth">
          <div className="w-full max-w-6xl flex flex-col items-center">
            <Confetti />
            
            <header className="text-center mb-80 animate-scaleUp">
              <h2 className="vibes-font text-7xl sm:text-9xl md:text-[16rem] text-pink-300 mb-16 drop-shadow-[0_0_80px_rgba(255,182,193,0.6)] animate-shimmer leading-none">
                Happy Birthday! 🎉
              </h2>
              <div className="space-y-16 text-2xl sm:text-5xl md:text-7xl text-rose-50/90 font-light max-w-6xl mx-auto leading-tight">
                <p className="animate-typewriter overflow-hidden whitespace-nowrap border-r-4 border-pink-400 mx-auto italic drop-shadow-2xl max-w-full px-4">
                  "Sunidhi, your smile lights up galaxies."
                </p>
                <div className="space-y-12 opacity-0 animate-fadeIn" style={{ animationDelay: '2.8s', animationFillMode: 'forwards' }}>
                   <p className="text-pink-100/90 drop-shadow-lg">Today, the world celebrates the day it became infinitely brighter.</p>
                   <p className="text-pink-400 font-bold drop-shadow-[0_0_30px_#f472b6] text-4xl sm:text-7xl md:text-8xl">You are a masterpiece of the universe.</p>
                </div>
              </div>
            </header>

            <section className="mb-80 w-full"><PhotoGallery /></section>
            <section className="mb-80 w-full"><Timeline /></section>
            <section className="mb-80 w-full"><DeepWishes /></section>
            <section className="mb-80 w-full z-30"><GiftBox /></section>
            <section className="mb-80 w-full"><HandwrittenNote /></section>
            <section className="mb-80 w-full"><ComplimentsGrid /></section>

            <div className="mt-40 pt-60 border-t border-white/10 w-full text-center pb-80 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-80 bg-gradient-to-b from-pink-500 to-transparent"></div>
              <p className="dancing-font text-5xl sm:text-7xl md:text-9xl text-purple-200 mb-20 opacity-0 animate-fadeIn" style={{ animationDelay: '8.5s', animationFillMode: 'forwards' }}>
                Admired by many, loved by all 💫
              </p>
              <div className="opacity-0 animate-fadeIn px-6" style={{ animationDelay: '9.8s', animationFillMode: 'forwards' }}>
                <p className="text-white/50 max-w-5xl mx-auto mb-24 text-xl md:text-3xl font-light leading-relaxed">
                  Thank you for being the extraordinary soul you are. This digital constellation was crafted specifically to mirror your brilliance. Never forget: you are a star that needs no sky to shine.
                </p>
                <button 
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setPhase('blowing');
                  }}
                  className="px-16 md:px-24 py-8 md:py-10 bg-gradient-to-r from-pink-700/30 to-purple-800/30 hover:from-pink-600/50 hover:to-purple-600/50 rounded-full text-2xl md:text-4xl border border-white/20 transition-all backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 group"
                >
                  <span className="group-hover:animate-pulse">Relive the Magic 🪄</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleUp { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes floatOut {
          0% { transform: scale(0.5) translateY(0); opacity: 1; }
          100% { transform: scale(1.5) translateY(-100px); opacity: 0; }
        }
        @keyframes grandEntrance {
          0% { opacity: 0; transform: scale(0.85) translateY(60px); filter: blur(30px); letter-spacing: 0.2em; }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); letter-spacing: -0.025em; }
        }
        @keyframes softPulse {
          0%, 100% { transform: scale(1); text-shadow: 0 0 15px rgba(255,255,255,0.3); }
          50% { transform: scale(1.03); text-shadow: 0 0 40px rgba(255,255,255,0.5); }
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
        .animate-fadeIn { animation: fadeIn 2s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .animate-scaleUp { animation: scaleUp 1.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .animate-grandEntrance { animation: grandEntrance 3s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .animate-softPulse { animation: softPulse 5s ease-in-out infinite; }
        .animate-gradientMove { animation: gradientMove 4s ease infinite; }
        .animate-typewriter { animation: typewriter 3.5s steps(60, end) forwards; }
        .animate-floatOut { animation: floatOut 1s ease-out forwards; }
        .animate-shimmer {
          background: linear-gradient(90deg, #f9a8d4, #f472b6, #e879f9, #f9a8d4);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 6s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: linear-gradient(to bottom, #f472b6, #a855f7); 
          border-radius: 10px;
          border: 2px solid #050510;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default App;
