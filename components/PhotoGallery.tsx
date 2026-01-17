
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
      caption: 'A radiant soul that brightens the universe.'
    },
    { 
      id: 'p2', 
      src: 'https://res.cloudinary.com/dodhvvewu/image/upload/v1768641288/937bc556-1391-467a-b3de-99fa599003fd_esoera.jpg', 
      rotation: 'rotate-1',
      caption: 'Grace personified in every gentle movement.'
    },
    { 
      id: 'p3', 
      src: 'https://res.cloudinary.com/dodhvvewu/image/upload/v1768641283/c4a74d20-b2ff-4a0b-af53-31f82b1347ed_ammjls.jpg', 
      rotation: '-rotate-1',
      caption: 'Beauty that makes time stand perfectly still.'
    },
    { 
      id: 'p4', 
      src: 'https://res.cloudinary.com/dodhvvewu/image/upload/v1768641274/c14c0530-ab91-446f-8367-a68be65f8462_lyvxyv.jpg', 
      rotation: 'rotate-2',
      caption: 'A smile that echoes the joy of a thousand suns.'
    },
    { 
      id: 'p5', 
      src: 'https://res.cloudinary.com/dodhvvewu/image/upload/v1768641279/fa6c2af3-bf07-4216-8bab-6f5917b03e9c_sgsied.jpg', 
      rotation: '-rotate-3',
      caption: 'Elegance flowing from a heart of pure gold.'
    },
    { 
      id: 'p6', 
      src: 'https://res.cloudinary.com/dodhvvewu/image/upload/v1768641268/53d8c0e1-4af9-482d-a26b-53e091e108bd_hd7o2i.jpg', 
      rotation: 'rotate-3',
      caption: 'A vision of pure, timeless enchantment.'
    },
    { 
      id: 'p7', 
      src: 'https://res.cloudinary.com/dodhvvewu/image/upload/v1768641264/ab2c1580-e265-4cea-af97-733443e03f9d_fqlhs3.jpg', 
      rotation: '-rotate-1',
      caption: "Magic is real, and it looks just like you."
    },
    { 
      id: 'p8', 
      src: 'https://res.cloudinary.com/dodhvvewu/image/upload/v1768641261/f3d1d5cc-482b-4d65-b415-a8fc2652d916_qi6w7z.jpg', 
      rotation: 'rotate-2',
      caption: 'The absolute masterpiece of the world.'
    }
  ]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    let interval: number;
    if (!isInteracting && scrollContainerRef.current) {
      interval = window.setInterval(() => {
        handleNext();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isInteracting, activeIdx]);

  const handleNext = () => {
    if (!scrollContainerRef.current) return;
    const nextIdx = (activeIdx + 1) % photos.length;
    scrollToIdx(nextIdx);
  };

  const handlePrev = () => {
    if (!scrollContainerRef.current) return;
    const prevIdx = (activeIdx - 1 + photos.length) % photos.length;
    scrollToIdx(prevIdx);
  };

  const scrollToIdx = (idx: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.querySelector('div')?.clientWidth || 350;
    const gap = 48; // md:gap-12 = 48px
    container.scrollTo({
      left: idx * (cardWidth + gap),
      behavior: 'smooth'
    });
    setActiveIdx(idx);
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.querySelector('div')?.clientWidth || 350;
    const gap = 48;
    const idx = Math.round(container.scrollLeft / (cardWidth + gap));
    if (idx !== activeIdx) setActiveIdx(idx);
  };

  return (
    <div className="flex flex-col items-center w-full mt-32 px-4 mb-20 relative">
      <div className="text-center mb-20 animate-fadeIn">
        <h3 className="vibes-font text-7xl md:text-9xl text-pink-200 mb-6 drop-shadow-2xl">Captured Memories</h3>
        <p className="text-pink-300/50 uppercase tracking-[0.5em] text-sm md:text-base font-bold animate-pulse">Every moment with you is a treasure</p>
      </div>
      
      <div 
        className="relative w-full max-w-full py-20 group/gallery"
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
        onTouchStart={() => setIsInteracting(true)}
        onTouchEnd={() => {
          setTimeout(() => setIsInteracting(false), 3000);
        }}
      >
        {/* Navigation Arrows */}
        <button 
          onClick={handlePrev}
          className="absolute left-4 md:left-20 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover/gallery:opacity-100 transition-opacity hover:bg-white/20 active:scale-90 hidden md:block"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-4 md:right-20 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover/gallery:opacity-100 transition-opacity hover:bg-white/20 active:scale-90 hidden md:block"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>

        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-12 px-[10%] md:px-[35%] snap-x snap-mandatory no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing pb-10"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {photos.map((photo, idx) => (
            <div 
              key={photo.id} 
              className="flex-shrink-0 snap-center perspective-1000"
            >
              <div
                className={`group relative bg-[#fdfdfd] p-4 md:p-6 pb-20 md:pb-28 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 hover:rotate-0 hover:z-50 opacity-0 animate-fadeInPhoto ${photo.rotation} w-[280px] md:w-[400px] border border-gray-200/50 transform-gpu active:scale-95`}
                style={{ 
                  animationDelay: `${idx * 0.15}s`,
                  animationFillMode: 'forwards'
                }}
              >
                {/* Photo Image Container */}
                <div className="overflow-hidden aspect-[3/4] bg-gray-50 relative shadow-inner">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Gloss highlight */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-black/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
                
                {/* Polaroid Caption */}
                <div className="absolute bottom-8 left-0 w-full text-center px-6">
                  <span className="dancing-font text-gray-800 text-2xl md:text-4xl block leading-tight drop-shadow-sm select-none">
                    {photo.caption}
                  </span>
                </div>

                {/* Decorative bits */}
                <div className="absolute top-2 right-2 w-8 h-8 opacity-20 pointer-events-none">✨</div>
                
                {/* Authentic Polaroid border texture overlay */}
                <div className="absolute inset-0 border border-black/5 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Progress Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {photos.map((_, i) => (
            <button 
              key={i} 
              onClick={() => scrollToIdx(i)}
              className={`h-2 rounded-full transition-all duration-500 ${i === activeIdx ? 'bg-pink-400 w-10 shadow-[0_0_10px_#f472b6]' : 'bg-pink-400/20 w-2 hover:bg-pink-400/40'}`}
              aria-label={`Go to slide ${i + 1}`}
            ></button>
          ))}
        </div>
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes fadeInPhoto {
          from { opacity: 0; transform: translateY(60px) rotate(10deg) scale(0.9); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0) rotate(var(--tw-rotate)) scale(1); filter: blur(0); }
        }
        .animate-fadeInPhoto { 
          animation: fadeInPhoto 1.5s cubic-bezier(0.22, 1, 0.36, 1); 
        }
      `}</style>
    </div>
  );
};
