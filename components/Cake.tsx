
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
    <div className="relative group flex flex-col items-center select-none w-full">
      {/* Candles Wrapper - Ensure it's centered above the top tier */}
      <div className="flex gap-4 mb-[-12px] z-30 justify-center">
        {candles.map((isOn, i) => (
          <div key={i} className="relative cursor-pointer group/candle" onClick={() => blowCandle(i)}>
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-gray-800"></div>
            <div className="w-3.5 h-16 bg-gradient-to-r from-pink-300 via-pink-400 to-pink-500 rounded-sm shadow-md overflow-hidden relative">
               <div className="absolute top-0 left-0 w-full h-1/4 bg-white/20"></div>
               <div className="absolute inset-0 border-r border-white/10"></div>
            </div>
            {isOn && (
              <div className="absolute top-[-36px] left-1/2 -translate-x-1/2 w-7 h-11 bg-yellow-400 rounded-[50%_50%_50%_50%/70%_70%_30%_30%] animate-flicker shadow-[0_0_25px_#fbbf24,0_0_50px_#f59e0b]">
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3.5 h-6 bg-orange-500 rounded-full blur-[1px]"></div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 h-3.5 bg-white/60 rounded-full"></div>
              </div>
            )}
            {!isOn && (
              <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-2 h-8 bg-gray-200/40 blur-[2px] animate-smoke"></div>
            )}
          </div>
        ))}
      </div>

      {/* Realistic Tiered Cake Structure */}
      <div className="flex flex-col items-center w-full">
        {/* Tier 1 - Top (White Frosting) */}
        <div className="relative z-20 w-64 h-14 bg-white rounded-t-[50%_40px] shadow-sm flex items-center justify-center border-b border-rose-50 overflow-visible">
           <div className="absolute top-4 w-full flex justify-around px-10 opacity-30">
              {[...Array(6)].map((_, i) => <div key={i} className="w-2.5 h-2.5 bg-pink-300 rounded-full"></div>)}
           </div>
           {/* Evenly spaced frosting drips */}
           <div className="absolute -bottom-3 w-full flex justify-between px-1">
              {[...Array(14)].map((_, i) => (
                <div key={i} className={`bg-white rounded-full shadow-md ${i % 4 === 0 ? 'w-3.5 h-11' : i % 4 === 1 ? 'w-3 h-14' : i % 4 === 2 ? 'w-2.5 h-8' : 'w-2 h-12'}`}></div>
              ))}
           </div>
        </div>

        {/* Tier 1 Body */}
        <div className="w-64 h-28 bg-gradient-to-b from-rose-100 via-rose-200 to-rose-300 shadow-xl relative z-10 flex flex-col items-center justify-center -mt-1 border-x border-rose-50">
           <div className="absolute top-0 left-0 w-full h-full opacity-15 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle at 50% 50%, #fff 1.5px, transparent 20%)', backgroundSize: '28px 28px'}}></div>
           <div className="vibes-font text-pink-600/70 text-6xl mt-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]">Sunidhi</div>
        </div>

        {/* Tier 2 - Middle (Wider) */}
        <div className="w-80 h-32 bg-gradient-to-b from-rose-200 via-rose-300 to-rose-400 shadow-2xl relative z-5 -mt-2 rounded-b-2xl border-t-[12px] border-rose-50/40 flex items-center justify-center">
           <div className="absolute inset-0 flex items-center justify-center gap-8">
              <div className="w-6 h-6 bg-pink-400/20 rounded-full animate-pulse shadow-sm"></div>
              <div className="w-6 h-6 bg-blue-300/20 rounded-full animate-pulse delay-75 shadow-sm"></div>
              <div className="w-6 h-6 bg-yellow-300/20 rounded-full animate-pulse delay-150 shadow-sm"></div>
           </div>
           {/* Detailed patterns */}
           <div className="absolute bottom-6 left-0 w-full h-0.5 bg-white/20"></div>
           <div className="absolute bottom-12 left-0 w-full h-0.5 bg-white/10"></div>
        </div>

        {/* Pedestal - High Stability Aesthetic */}
        <div className="flex flex-col items-center -mt-4 relative z-0">
          <div className="w-[30rem] h-14 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.4)] border-b-[10px] border-gray-300 relative">
             <div className="absolute top-1 left-0 w-full h-1.5 bg-white/50 rounded-full"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-1/2 border border-gray-400/10 rounded-full"></div>
          </div>
          <div className="w-48 h-24 bg-gradient-to-b from-gray-200 to-gray-400 rounded-b-[80px] shadow-inner border-t-[6px] border-gray-300 -mt-2"></div>
        </div>
      </div>

      {/* Interaction Buttons */}
      <div className="flex gap-8 mt-20 z-30">
        <button 
          onClick={handleBlowAll}
          className="px-12 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/30 rounded-full transition-all flex items-center gap-4 group shadow-xl hover:scale-110 active:scale-95"
        >
          <span className="text-3xl group-hover:animate-bounce">💨</span>
          <span className="font-bold text-white/90 text-2xl">Blow All</span>
        </button>

        {!isListening ? (
          <button 
            onClick={startListening}
            className="px-12 py-5 bg-pink-500/20 hover:bg-pink-500/40 backdrop-blur-xl border border-pink-400/30 rounded-full transition-all flex items-center gap-4 group shadow-xl hover:scale-110 active:scale-95"
          >
            <span className="text-3xl group-hover:rotate-12 transition-transform">🎤</span>
            <span className="font-bold text-white/90 text-2xl">Use Mic</span>
          </button>
        ) : (
          <div className="px-12 py-5 bg-green-500/30 border border-green-400/40 rounded-full flex items-center gap-4 animate-pulse shadow-xl">
            <div className="flex gap-1.5">
               <span className="w-3 h-3 bg-green-400 rounded-full animate-bounce"></span>
               <span className="w-3 h-3 bg-green-400 rounded-full animate-bounce delay-75"></span>
               <span className="w-3 h-3 bg-green-400 rounded-full animate-bounce delay-150"></span>
            </div>
            <span className="text-2xl font-bold text-green-100">Blowing...</span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes flicker {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.95; filter: blur(0px); }
          50% { transform: translateX(-50%) scale(1.15) translateY(-4px); opacity: 1; filter: blur(1.5px); }
          25%, 75% { transform: translateX(-52%) scale(0.95); }
        }
        @keyframes smoke {
          0% { transform: translateX(-50%) translateY(0) scale(1); opacity: 0.5; filter: blur(2px); }
          100% { transform: translateX(-50%) translateY(-60px) scale(4); opacity: 0; filter: blur(6px); }
        }
        .animate-flicker { animation: flicker 0.12s infinite alternate; }
        .animate-smoke { animation: smoke 2s ease-out forwards; }
      `}</style>
    </div>
  );
};
