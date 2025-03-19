import React, { useRef, useEffect } from 'react';
import { useParticleEffect } from '@/utils/animations';
import { debounce } from 'lodash';

interface ParticleBackgroundProps {
  className?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { particles, canvasSize } = useParticleEffect(
    70, // particle count
    0.2, // Reduced max speed (was 0.5)
    0.005, // fade speed
    ['#64FFDA20', '#0EA5E920', '#8B5CF620', '#D946EF20'] // colors with transparency
  );

  // Handle canvas resize with debouncing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Debounced resize handler
    const handleResize = debounce(() => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      console.log('Canvas resized:', { width: canvas.width, height: canvas.height });
    }, 100);

    handleResize(); // Initial resize
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel();
    };
  }, []);

  // Draw particles and connections
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvasSize) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and redraw
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    console.log('Drawing particles:', particles.length);

    // Draw particles
    particles.forEach(particle => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color.replace(/20$/, Math.floor(particle.opacity * 100).toString(16).padStart(2, '0'));
      ctx.fill();
    });

    // Draw connections
    ctx.strokeStyle = 'rgba(100, 255, 218, 0.05)';
    ctx.lineWidth = 0.5;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }, [particles, canvasSize]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full -z-10 ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default ParticleBackground;