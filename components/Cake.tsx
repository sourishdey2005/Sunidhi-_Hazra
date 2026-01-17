
import React, { useState, useEffect, useRef } from 'react';

interface CakeProps {
  onBlown: () => void;
}

export const Cake: React.FC<CakeProps> = ({ onBlown }) => {
  const [blownCount, setBlownCount] = useState(0);
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const [isListening, setIsListening] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const blowCandle = (index: number) => {
    if (!candles[index]) return;
    setCandles(prev => {
      const next = [...prev];
      next[index] = false;
      return next;
    });
    setBlownCount(prev => prev + 1);
  };

  useEffect(() => {
    if (blownCount === candles.length && blownCount > 0) {
      onBlown();
    }
  }, [blownCount, candles.length, onBlown]);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContextClass();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      setIsListening(true);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        const volume = dataArray.reduce((a, b) => a + b) / bufferLength;

        if (volume > 60) {
          const activeIndices = candles.map((on, i) => on ? i : -1).filter(i => i !== -1);
          if (activeIndices.length > 0) {
            const randomIndex = activeIndices[Math.floor(Math.random() * activeIndices.length)];
            blowCandle(randomIndex);
          }
        }
        animationFrameRef.current = requestAnimationFrame(checkVolume);
      };

      checkVolume();
    } catch (err) {
      console.error("Microphone access denied or error:", err);
    }
  };

  const stopListening = () => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (audioContextRef.current) audioContextRef.current.close();
    setIsListening(false);
  };

  useEffect(() => {
    return () => stopListening();
  }, []);

  const handleBlowAll = () => {
    let delay = 0;
    candles.forEach((isOn, i) => {
      if (isOn) {
        setTimeout(() => blowCandle(i), delay);
        delay += 200;
      }
    });
  };

  return (
    <div className="relative group flex flex-col items-center select-none">
      {/* Candles */}
      <div className="flex gap-4 mb-[-12px] z-30 justify-center">
        {candles.map((isOn, i) => (
          <div key={i} className="relative cursor-pointer group/candle" onClick={() => blowCandle(i)}>
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-gray-800"></div>
            <div className="w-3.5 h-14 bg-gradient-to-r from-pink-300 via-pink-400 to-pink-500 rounded-sm shadow-md overflow-hidden relative">
               <div className="absolute top-0 left-0 w-full h-1/4 bg-white/20"></div>
               <div className="absolute inset-0 border-r border-white/10"></div>
            </div>
            {isOn && (
              <div className="absolute top-[-32px] left-1/2 -translate-x-1/2 w-6 h-9 bg-yellow-400 rounded-[50%_50%_50%_50%/70%_70%_30%_30%] animate-flicker shadow-[0_0_20px_#fbbf24,0_0_40px_#f59e0b]">
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-5 bg-orange-500 rounded-full blur-[1px]"></div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-2.5 bg-white/60 rounded-full"></div>
              </div>
            )}
            {!isOn && (
              <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-2 h-6 bg-gray-200/40 blur-[1px] animate-smoke"></div>
            )}
          </div>
        ))}
      </div>

      {/* Centered Realistic Cake Structure */}
      <div className="flex flex-col items-center">
        {/* Top Frosting Layer (Tier 1) */}
        <div className="relative z-20 w-64 h-12 bg-white rounded-t-[50%_40px] shadow-sm flex items-center justify-center border-b border-rose-100">
           <div className="absolute top-3 w-full flex justify-around px-8 opacity-40">
              {[...Array(6)].map((_, i) => <div key={i} className="w-2 h-2 bg-pink-300 rounded-full"></div>)}
           </div>
           {/* Frosting Drips distributed evenly */}
           <div className="absolute -bottom-2 w-full flex justify-between px-1">
              {[...Array(12)].map((_, i) => (
                <div key={i} className={`bg-white rounded-full shadow-sm ${i % 3 === 0 ? 'w-3 h-8' : i % 3 === 1 ? 'w-2.5 h-10' : 'w-2 h-6'}`}></div>
              ))}
           </div>
        </div>

        {/* Top Tier Body */}
        <div className="w-64 h-24 bg-gradient-to-b from-rose-100 via-rose-200 to-rose-300 shadow-xl relative z-10 flex flex-col items-center justify-center -mt-1">
           <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle at 50% 50%, #fff 1%, transparent 20%)', backgroundSize: '24px 24px'}}></div>
           <div className="vibes-font text-pink-600/60 text-5xl mt-2 drop-shadow-sm">Sunidhi</div>
        </div>

        {/* Second Tier (Wider & Centered) */}
        <div className="w-80 h-28 bg-gradient-to-b from-rose-200 via-rose-300 to-rose-400 shadow-2xl relative z-0 -mt-2 rounded-b-xl border-t-8 border-rose-100/50 flex items-center justify-center">
           <div className="absolute inset-0 flex items-center justify-center gap-6">
              <div className="w-5 h-5 bg-pink-400/30 rounded-full animate-pulse"></div>
              <div className="w-5 h-5 bg-blue-300/30 rounded-full animate-pulse delay-75"></div>
              <div className="w-5 h-5 bg-yellow-300/30 rounded-full animate-pulse delay-150"></div>
           </div>
           {/* Subtle patterns for realism */}
           <div className="absolute bottom-4 left-0 w-full h-px bg-white/20"></div>
           <div className="absolute bottom-8 left-0 w-full h-px bg-white/10"></div>
        </div>

        {/* Pedestal Structure */}
        <div className="flex flex-col items-center -mt-4">
          <div className="w-[26rem] h-12 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.3)] border-b-8 border-gray-300 relative z-[-1]">
             <div className="absolute top-1 left-0 w-full h-1 bg-white/40 rounded-full"></div>
          </div>
          <div className="w-44 h-20 bg-gradient-to-b from-gray-200 to-gray-400 rounded-b-[60px] shadow-inner border-t-4 border-gray-300 -mt-2"></div>
        </div>
      </div>

      <div className="flex gap-6 mt-16 z-30">
        <button 
          onClick={handleBlowAll}
          className="px-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/30 rounded-full transition-all flex items-center gap-3 group shadow-lg hover:scale-105 active:scale-95"
        >
          <span className="text-2xl group-hover:animate-bounce">💨</span>
          <span className="font-bold text-white/90 text-xl">Blow the Candles</span>
        </button>

        {!isListening ? (
          <button 
            onClick={startListening}
            className="px-10 py-4 bg-pink-500/20 hover:bg-pink-500/40 backdrop-blur-xl border border-pink-400/30 rounded-full transition-all flex items-center gap-3 group shadow-lg hover:scale-105 active:scale-95"
          >
            <span className="text-2xl group-hover:rotate-12 transition-transform">🎤</span>
            <span className="font-bold text-white/90 text-xl">Use Voice</span>
          </button>
        ) : (
          <div className="px-10 py-4 bg-green-500/30 border border-green-400/40 rounded-full flex items-center gap-3 animate-pulse shadow-lg">
            <div className="flex gap-1">
               <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-bounce"></span>
               <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-bounce delay-75"></span>
               <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-bounce delay-150"></span>
            </div>
            <span className="text-xl font-bold text-green-100">Blowing...</span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes flicker {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.95; filter: blur(0px); }
          50% { transform: translateX(-50%) scale(1.15) translateY(-3px); opacity: 1; filter: blur(1px); }
          25%, 75% { transform: translateX(-52%) scale(0.9); }
        }
        @keyframes smoke {
          0% { transform: translateX(-50%) translateY(0) scale(1); opacity: 0.4; filter: blur(1px); }
          100% { transform: translateX(-50%) translateY(-40px) scale(3.5); opacity: 0; filter: blur(5px); }
        }
        .animate-flicker { animation: flicker 0.12s infinite alternate; }
        .animate-smoke { animation: smoke 1.8s ease-out forwards; }
      `}</style>
    </div>
  );
};
