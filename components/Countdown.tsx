
import React, { useState, useEffect } from 'react';

export const Countdown: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    const calculate = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((diff % (1000 * 60)) / 1000)
      });
    };

    const timer = setInterval(calculate, 1000);
    calculate();
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold bg-white/20 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md animate-pulse">
          Today is the Day! 🎉
        </span>
      </div>
    );
  }

  return (
    <div className="flex gap-4 md:gap-8 justify-center">
      {[
        { label: 'Days', val: timeLeft.d },
        { label: 'Hours', val: timeLeft.h },
        { label: 'Mins', val: timeLeft.m },
        { label: 'Secs', val: timeLeft.s }
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <div className="text-4xl md:text-6xl font-bold tracking-tighter text-white drop-shadow-md">
            {String(item.val).padStart(2, '0')}
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-white/50 font-bold mt-1">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};
