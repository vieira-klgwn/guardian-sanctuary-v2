// src/utils/animations.ts
import { useEffect, useState } from 'react';

export const useAnimatedMount = (delay: number = 300) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return mounted;
};

export const useTypingEffect = (text: string, speed: number = 50) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, speed, text]);

  // Reset when text changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  return { displayedText, isComplete };
};

export const useParticleEffect = (
  particleCount: number = 50,
  maxSpeed: number = 0.2, // Reduced default maxSpeed from 1 to 0.2 to match ParticleBackground
  fadeSpeed: number = 0.005,
  colors: string[] = ['#64FFDA', '#0EA5E9', '#8B5CF6']
) => {
  interface Particle {
    x: number;
    y: number;
    size: number;
    color: string;
    speedX: number;
    speedY: number;
    opacity: number;
  }

  const [particles, setParticles] = useState<Particle[]>([]);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  // Initialize particles and handle resize
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const initialParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      initialParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * maxSpeed * 0.5, // Reduced initial speed by 50%
        speedY: (Math.random() - 0.5) * maxSpeed * 0.5, // Reduced initial speed by 50%
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    setParticles(initialParticles);

    return () => window.removeEventListener('resize', handleResize);
  }, [particleCount, colors, maxSpeed]);

  // Animation frame to update particles with dampening
  useEffect(() => {
    if (particles.length === 0 || typeof window === 'undefined') return;

    let animationFrameId: number;

    const animate = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => {
          // Update position with dampening
          const dampeningFactor = 0.95; // Slows down movement over time
          let newX = particle.x + particle.speedX * dampeningFactor;
          let newY = particle.y + particle.speedY * dampeningFactor;

          // Bounce off edges
          if (newX < 0 || newX > canvasSize.width) {
            particle.speedX *= -0.8; // Reduced bounce energy
            newX = particle.x;
          }
          if (newY < 0 || newY > canvasSize.height) {
            particle.speedY *= -0.8; // Reduced bounce energy
            newY = particle.y;
          }

          // Randomly change opacity
          let newOpacity = particle.opacity + (Math.random() - 0.5) * fadeSpeed;
          newOpacity = Math.max(0.1, Math.min(0.8, newOpacity));

          return {
            ...particle,
            x: newX,
            y: newY,
            opacity: newOpacity
          };
        })
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [particles, canvasSize, fadeSpeed]);

  return { particles, canvasSize };
};

export const useCountUp = (endValue: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * endValue));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [endValue, duration]);

  return count;
};