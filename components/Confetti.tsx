
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  rot: number;
  rotVel: number;
  opacity: number;
  type: 'burst' | 'gentle';
  shape: 'square' | 'circle' | 'line';
}

export const Confetti: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    const colors = [
      '#f43f5e', // rose
      '#ec4899', // pink
      '#d946ef', // fuchsia
      '#a855f7', // purple
      '#8b5cf6', // violet
      '#6366f1', // indigo
      '#ffffff', // white
      '#fbbf24', // amber
      '#38bdf8'  // sky
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const createBurst = () => {
      const count = 180;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 12 + 5;
        particles.push({
          x: canvas.width / 2,
          y: canvas.height / 2,
          size: Math.random() * 10 + 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity - 2,
          rot: Math.random() * 360,
          rotVel: Math.random() * 20 - 10,
          opacity: 1,
          type: 'burst',
          shape: Math.random() > 0.5 ? 'square' : (Math.random() > 0.5 ? 'circle' : 'line')
        });
      }
    };

    const createGentleParticle = (y: number = -20): Particle => ({
      x: Math.random() * canvas.width,
      y: y,
      size: Math.random() * 6 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 1.5,
      vy: Math.random() * 1.5 + 0.8,
      rot: Math.random() * 360,
      rotVel: Math.random() * 4 - 2,
      opacity: Math.random() * 0.6 + 0.2,
      type: 'gentle',
      shape: Math.random() > 0.5 ? 'square' : (Math.random() > 0.5 ? 'circle' : 'line')
    });

    for (let i = 0; i < 100; i++) {
      particles.push(createGentleParticle(Math.random() * canvas.height));
    }

    createBurst();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rotVel;

        if (p.type === 'burst') {
          p.vy += 0.2;
          p.vx *= 0.97;
          p.opacity -= 0.006;
          if (p.opacity <= 0) return false;
        } else {
          p.x += Math.sin(p.y / 60 + p.rot / 100) * 0.4;
          if (p.y > canvas.height) {
            p.y = -20;
            p.x = Math.random() * canvas.width;
          }
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot * Math.PI / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        
        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'line') {
          ctx.fillRect(-p.size / 2, 0, p.size, 2);
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }
        
        ctx.restore();
        return true;
      });

      const gentleCount = particles.filter(p => p.type === 'gentle').length;
      if (gentleCount < 100) {
        particles.push(createGentleParticle());
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />;
};
