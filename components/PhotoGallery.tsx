
import React, { useState, useEffect, useRef } from 'react';

interface PhotoItem {
  id: string | number;
  src: string;
  rotation: string;
  caption: string;
}

export const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>([
    { 
      id: 'p1', 
      src: 'https://res.cloudinary.com/dodhvvewu/image/upload/v1768641298/c130d650-29bc-42ab-b881-9482f2232073_bryfuv.jpg', 
      rotation: '-rotate-2',
      caption: 'Sun-kissed perfection ☀️'
    },
    { 
      id: 'p2', 
      src: 'https://res.cloudinary.com/dodhvvewu/image/upload/v1768641288/937bc556-1391-467a-b3de-99fa599003fd_esoera.jpg', 
      rotation: 'rotate-1',
      caption: 'Elegance in every frame ✨'
    },
    { 
      id: 'p3', 
      src: 'https://res.cloudinary.com/dodhvvewu/image/upload/v1768641283/c4a74d20-b2ff-4a0b-af53-31f82b1347ed_ammjls.jpg', 
      rotation: '-rotate-1',
      caption: 'A smile that lights up worlds 💖'
    },
    { 
      id: 'p4', 
      src: 'https://res.cloudinary.com/dodhvvewu/image/upload/v1768641274/c14c0530-ab91-446f-8367-a68be65f8462_lyvxyv.jpg', 
      rotation: 'rotate-2',
      caption: 'Pure grace and magic 🌸'
    },
    { 
      id: 'p5', 
      src: 'https://res.cloudinary.com/dodhvvewu/image/upload/v1768641279/fa6c2af3-bf07-4216-8bab-6f5917b03e9c_sgsied.jpg', 
      rotation: '-rotate-3',
      caption: 'Capturing your radiant soul 🌟'
    },
    { 
      id: 'p6', 
      src: 'https://res.cloudinary.com/dodhvvewu/image/upload/v1768641268/53d8c0e1-4af9-482d-a26b-53e091e108bd_hd7o2i.jpg', 
      rotation: 'rotate-3',
      caption: 'Unfiltered beauty, infinite charm 💫'
    },
    { 
      id: 'p7', 
      src: 'https://res.cloudinary.com/dodhvvewu/image/upload/v1768641264/ab2c1580-e265-4cea-af97-733443e03f9d_fqlhs3.jpg', 
      rotation: '-rotate-1',
      caption: "The universe's favorite masterpiece 🎨"
    },
    { 
      id: 'p8', 
      src: 'https://res.cloudinary.com/dodhvvewu/image/upload/v1768641261/f3d1d5cc-482b-4d65-b415-a8fc2652d916_qi6w7z.jpg', 
      rotation: 'rotate-2',
      caption: 'Simply breathtaking, Sunidhi 🦋'
    }
  ]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  useEffect(() => {
    let interval: number;
    if (isAutoScrolling && scrollContainerRef.current) {
      interval = window.setInterval(() => {
        const container = scrollContainerRef.current;
        if (container) {
          const maxScrollLeft = container.scrollWidth - container.clientWidth;
          if (container.scrollLeft >= maxScrollLeft - 10) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            container.scrollBy({ left: 300, behavior: 'smooth' });
          }
        }
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  const handleManualScroll = () => {
    setIsAutoScrolling(false);
    // Resume auto-scroll after 10 seconds of inactivity
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  return (
    <div className="flex flex-col items-center w-full mt-10 px-4">
      <div className="text-center mb-12">
        <h3 className="vibes-font text-6xl text-pink-200 mb-2 opacity-0 animate-fadeIn" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>Captured Memories</h3>
        <p className="text-pink-300/40 uppercase tracking-[0.3em] text-xs font-bold">Every moment with you is a treasure</p>
      </div>
      
      <div className="relative w-full max-w-6xl group/gallery">
        {/* Swipe Instructions for Mobile */}
        <div className="md:hidden flex justify-center mb-4 gap-2 text-pink-300/30 text-xs animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          <span>Swipe to explore</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </div>

        {/* Horizontal Slider */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleManualScroll}
          className="flex overflow-x-auto gap-8 py-12 px-8 snap-x snap-mandatory scrollbar-hide no-scrollbar scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {photos.map((photo, idx) => (
            <div 
              key={photo.id} 
              className="flex-shrink-0 snap-center first:ml-[10%] last:mr-[10%]"
            >
              <div
                className={`relative bg-white p-4 pb-14 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 hover:scale-105 hover:rotate-0 hover:z-30 opacity-0 animate-fadeInPhoto ${photo.rotation} w-[280px] md:w-[320px]`}
                style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
              >
                {/* Photo Frame */}
                <div className="overflow-hidden aspect-[3/4] bg-gray-100 relative group/photo">
                  <img
                    src={photo.src}
                    alt={`Memory ${idx + 1}`}
                    className="w-full h-full object-cover grayscale-[15%] group-hover/photo:grayscale-0 transition-all duration-1000 group-hover/photo:scale-110"
                    loading="lazy"
                  />
                  {/* Subtle Light Effect on Image */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
                </div>
                
                {/* Polaroid Caption */}
                <div className="absolute bottom-4 left-0 w-full text-center px-4">
                  <span className="dancing-font text-gray-800 text-xl md:text-2xl block truncate drop-shadow-sm">
                    {photo.caption}
                  </span>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 text-white/40 group-hover:text-pink-400/50 transition-colors pointer-events-none">✨</div>
                
                {/* Shadow underneath */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-black/20 blur-xl rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Nav Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {photos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsAutoScrolling(false);
                scrollContainerRef.current?.scrollTo({ 
                  left: idx * 300, // Approximate width
                  behavior: 'smooth' 
                });
              }}
              className="w-2 h-2 rounded-full bg-pink-500/20 hover:bg-pink-500/60 transition-all duration-300"
              aria-label={`Go to photo ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @keyframes fadeInPhoto {
          from { opacity: 0; transform: scale(0.9) rotate(5deg) translateY(20px); }
          to { opacity: 1; transform: scale(1) rotate(var(--tw-rotate)) translateY(0); }
        }
        .animate-fadeInPhoto { animation: fadeInPhoto 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};
