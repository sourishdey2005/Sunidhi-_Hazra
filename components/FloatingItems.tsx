
import React, { useMemo } from 'react';

export const FloatingItems: React.FC<{ count: number }> = ({ count }) => {
  const items = useMemo(() => {
    const types = ['🎈', '💖', '✨', '🌸', '💫'];
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      char: types[Math.floor(Math.random() * types.length)],
      left: `${Math.random() * 90}%`,
      duration: `${Math.random() * 10 + 10}s`,
      delay: `${Math.random() * 5}s`,
      size: `${Math.random() * 20 + 20}px`
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute bottom-[-10%] animate-floatUp opacity-70"
          style={{
            left: item.left,
            animationDuration: item.duration,
            animationDelay: item.delay,
            fontSize: item.size
          }}
        >
          {item.char}
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
        }
        .animate-floatUp { animation: floatUp linear infinite; }
      `}</style>
    </div>
  );
};
