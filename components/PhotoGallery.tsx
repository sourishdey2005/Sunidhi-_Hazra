
import React, { useState, useEffect, useRef } from 'react';

interface PhotoItem {
  id: string | number;
  src: string;
  rotation: string;
  caption: string;
}

export const PhotoGallery: React.FC = () => {
  const [photos] = useState<PhotoItem[]>([
    { 
      id: 'p1', 
      src: 'https://res.cloudinary.com/dodhvvewu/image/upload/v1768641298/c130d650-29bc-42ab-b881-9482f2232073_bryfuv.jpg', 
      rotation: '-rotate-2',
      caption: 'A radiant soul that brightens every corner of existence'
    },
    { 
      id: 'p2', 
      src: 'https://res.cloudinary.com/dodhvvewu/image/upload/v1768641288/937bc556-1391-467a-b3de-99fa599003fd_esoera.jpg', 
      rotation: 'rotate-1',
      caption: 'Grace personified in every gentle movement'
    },
    { 
      id: 'p3', 
      src: 'https://res.cloudinary.com/dodhvvewu/image/upload/v1768641283/c4a74d20-b2ff-4a0b-af53-31f82b1347ed_ammjls.jpg', 
      rotation: '-rotate-1',
      caption: 'The kind of beauty that makes time stand perfectly still'
    },
    { 
      id: 'p4', 
      src: 'https://res.cloudinary.com/dodhvvewu/image/upload/v1768641274/c14c0530-ab91-446f-8367-a68be65f8462_lyvxyv.jpg', 
      rotation: 'rotate-2',
      caption: 'A smile that echoes the joy of a thousand summer suns'
    },
    { 
      id: 'p5', 
      src: 'https://res.cloudinary.com/dodhvvewu/image/upload/v1768641279/fa6c2af3-bf07-4216-8bab-6f5917b03e9c_sgsied.jpg', 
      rotation: '-rotate-3',
      caption: 'Elegance that flows naturally from a heart of gold'
    },
    { 
      id: 'p6', 
      src: 'https://res.cloudinary.com/dodhvvewu/image/upload/v1768641268/53d8c0e1-4af9-482d-a26b-53e091e108bd_hd7o2i.jpg', 
      rotation: 'rotate-3',
      caption: 'A vision of wonder, capturing the magic of the moment'
    },
    { 
      id: 'p7', 
      src: 'https://res.cloudinary.com/dodhvvewu/image/upload/v1768641264/ab2c1580-e265-4cea-af97-733443e03f9d_fqlhs3.jpg', 
      rotation: '-rotate-1',
      caption: "Where kindness meets brilliance, you'll find Sunidhi"
    },
    { 
      id: 'p8', 
      src: 'https://res.cloudinary.com/dodhvvewu/image/upload/v1768641261/f3d1d5cc-482b-4d65-b415-a8fc2652d916_qi6w7z.jpg', 
      rotation: 'rotate-2',
      caption: 'An absolute masterpiece of grace and light'
    }
  ]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const touchStartX = useRef(0);
  const touchScrollLeft = useRef(0);

  useEffect(() => {
    let interval: number;
    if (!isInteracting && scrollContainerRef.current) {
      interval = window.setInterval(() => {
        const container = scrollContainerRef.current;
        if (container) {
          const cardWidth = 350; // Approximated card width + gap
          const maxScrollLeft = container.scrollWidth - container.clientWidth;
          
          if (container.scrollLeft >= maxScrollLeft - 10) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            container.scrollBy({ left: cardWidth, behavior: 'smooth' });
          }
        }
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isInteracting]);

  // Touch handlers for better swipe experience and to pause auto-swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsInteracting(true);
    touchStartX.current = e.touches[0].clientX;
    touchScrollLeft.current = scrollContainerRef.current?.scrollLeft || 0;
  };

  const handleTouchEnd = () => {
    // Wait a bit before resuming auto-swipe
    setTimeout(() => setIsInteracting(false), 2000);
  };

  return (
    <div className="flex flex-col items-center w-full mt-32 px-4 mb-20">
      <div className="text-center mb-20 animate-fadeIn">
        <h3 className="vibes-font text-7xl md:text-9xl text-pink-200 mb-6 drop-shadow-2xl">Captured Memories</h3>
        <p className="text-pink-300/50 uppercase tracking-[0.5em] text-sm md:text-base font-bold animate-pulse">Every moment with you is a treasure</p>
      </div>
      
      <div 
        className="relative w-full max-w-full overflow-hidden py-20"
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Horizontal Slider Wrapper */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-12 px-[10%] snap-x snap-mandatory no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing pb-10"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {photos.map((photo, idx) => (
            <div 
              key={photo.id} 
              className="flex-shrink-0 snap-center"
            >
              <div
                className={`group relative bg-white p-5 pb-20 shadow-[0_40px_80px_rgba(0,0,0,0.6)] transition-all duration-700 hover:scale-125 hover:rotate-0 hover:z-50 opacity-0 animate-fadeInPhoto ${photo.rotation} w-[280px] md:w-[350px]`}
                style={{ 
                  animationDelay: `${idx * 0.15}s`,
                  animationFillMode: 'forwards'
                }}
              >
                {/* Photo Image Container */}
                <div className="overflow-hidden aspect-[3/4] bg-gray-100 relative shadow-inner">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-110"
                    loading="lazy"
                  />
                  {/* Glass highlight effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-black/10 pointer-events-none"></div>
                </div>
                
                {/* Polaroid Style Caption - Poetic and beautiful */}
                <div className="absolute bottom-6 left-0 w-full text-center px-8">
                  <span className="dancing-font text-gray-800 text-2xl md:text-3xl block leading-tight drop-shadow-sm">
                    {photo.caption}
                  </span>
                </div>

                {/* Decorative sparkles that appear on hover */}
                <div className="absolute -top-4 -right-4 text-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75 group-hover:-translate-y-2 group-hover:translate-x-2">✨</div>
                <div className="absolute -bottom-4 -left-4 text-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150 group-hover:translate-y-2 group-hover:-translate-x-2">💖</div>
                
                {/* Authentic Polaroid border texture */}
                <div className="absolute inset-0 border border-black/5 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Progress/Indicator line */}
        <div className="flex justify-center gap-4 mt-16">
          {photos.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-700 ${isInteracting ? 'bg-pink-500/40 w-6' : 'bg-pink-400/20 w-3'}`}
            ></div>
          ))}
        </div>
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @keyframes fadeInPhoto {
          from { opacity: 0; transform: translateY(60px) rotate(10deg) scale(0.8); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0) rotate(var(--tw-rotate)) scale(1); filter: blur(0); }
        }
        .animate-fadeInPhoto { 
          animation: fadeInPhoto 1.5s cubic-bezier(0.22, 1, 0.36, 1); 
        }
      `}</style>
    </div>
  );
};
