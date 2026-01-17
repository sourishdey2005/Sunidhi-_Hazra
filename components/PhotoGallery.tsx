
import React, { useState, useRef } from 'react';

interface PhotoItem {
  id: string | number;
  src: string;
  rotation: string;
}

export const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>([
    { id: 'p1', src: 'https://picsum.photos/id/103/300/400', rotation: '-rotate-3' },
    { id: 'p2', src: 'https://picsum.photos/id/106/300/400', rotation: 'rotate-2' },
    { id: 'p3', src: 'https://picsum.photos/id/129/300/400', rotation: '-rotate-1' },
  ]);

  const [captions, setCaptions] = useState<string[]>([
    'Gorgeous 💖',
    'Beautiful ✨',
    'Ma Shallah 🌸'
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-3', '-rotate-3'];

  const handleCaptionChange = (index: number, value: string) => {
    const newCaptions = [...captions];
    newCaptions[index] = value;
    setCaptions(newCaptions);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && photos.length < 6) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newSrc = e.target?.result as string;
        const randomRotation = rotations[Math.floor(Math.random() * rotations.length)];
        
        setPhotos(prev => [...prev, { 
          id: `custom-${Date.now()}`, 
          src: newSrc, 
          rotation: randomRotation 
        }]);
        setCaptions(prev => [...prev, 'Stunning ✨']);
      };
      reader.readAsDataURL(file);
    }
  };

  const deletePhoto = (id: string | number) => {
    const idx = photos.findIndex(p => p.id === id);
    if (idx > -1) {
      const newPhotos = [...photos];
      const newCaptions = [...captions];
      newPhotos.splice(idx, 1);
      newCaptions.splice(idx, 1);
      setPhotos(newPhotos);
      setCaptions(newCaptions);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center w-full mt-10">
      <h3 className="vibes-font text-5xl text-pink-200 mb-8 opacity-0 animate-fadeIn" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>Captured Memories</h3>
      
      <div className="flex flex-wrap justify-center gap-8 md:gap-12 px-4 max-w-6xl">
        {photos.map((photo, idx) => (
          <div key={photo.id} className="flex flex-col items-center group">
            <div
              className={`relative bg-white p-3 pb-12 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:z-30 group-hover:rotate-0 opacity-0 animate-fadeInPhoto ${photo.rotation}`}
              style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
            >
              <div className="overflow-hidden w-40 h-52 bg-gray-100">
                <img
                  src={photo.src}
                  alt="Memory"
                  className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              
              <div className="absolute bottom-2 left-0 w-full text-center px-2">
                <span className="dancing-font text-pink-600 text-lg block truncate">
                  {captions[idx]}
                </span>
              </div>

              {/* Action Buttons (Only for non-default or visible on hover) */}
              <button 
                onClick={() => deletePhoto(photo.id)}
                className="absolute -top-2 -right-2 bg-rose-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-40 hover:scale-110"
              >
                ✕
              </button>

              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute -top-2 -right-2 text-yellow-400 animate-pulse text-xl">✨</div>
                <div className="absolute -bottom-2 -left-2 text-pink-400 animate-pulse delay-150 text-xl">💖</div>
              </div>
            </div>

            <div 
              className="mt-4 opacity-0 animate-fadeInPhoto" 
              style={{ animationDelay: `${0.5 + idx * 0.1}s` }}
            >
              <input
                type="text"
                value={captions[idx]}
                onChange={(e) => handleCaptionChange(idx, e.target.value)}
                className="bg-white/5 border-b border-pink-400/20 text-pink-100 text-sm text-center py-1 px-2 focus:outline-none focus:border-pink-400 focus:bg-white/10 rounded-t-sm transition-all w-32"
              />
            </div>
          </div>
        ))}

        {photos.length < 6 && (
          <div className="flex flex-col items-center opacity-0 animate-fadeIn" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
            <button 
              onClick={triggerUpload}
              className="w-46 h-64 bg-white/5 border-2 border-dashed border-pink-400/20 rounded-xl flex flex-col items-center justify-center gap-4 hover:bg-pink-500/10 hover:border-pink-400/50 transition-all group p-4"
            >
              <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-300 group-hover:bg-pink-500/30 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </div>
              <span className="text-xs uppercase tracking-widest text-pink-300/60 font-bold text-center">Add Moment</span>
              <p className="text-[10px] text-white/30">{6 - photos.length} slots left</p>
            </button>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes fadeInPhoto {
          from { opacity: 0; transform: scale(0.9) rotate(5deg); }
          to { opacity: 1; transform: scale(1) rotate(var(--tw-rotate)); }
        }
        .animate-fadeInPhoto { animation: fadeInPhoto 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
};
