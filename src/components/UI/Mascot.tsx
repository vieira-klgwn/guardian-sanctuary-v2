
import React, { useState, useEffect } from 'react';
import { useTypingEffect } from '@/utils/animations';

interface MascotProps {
  message?: string;
  pulseEffect?: boolean;
  className?: string;
}

const Mascot: React.FC<MascotProps> = ({ 
  message = "Hello, I'm Sanctra. I'll help you stay protected online.",
  pulseEffect = true,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(message);
  const { displayedText, isComplete } = useTypingEffect(currentMessage, 40);
  
  useEffect(() => {
    setCurrentMessage(message);
  }, [message]);
  
  return (
    <div className={`fixed bottom-6 right-6 flex items-end gap-3 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}>
      {/* Speech bubble */}
      {isVisible && (
        <div className="relative max-w-xs p-4 rounded-lg bg-guardian-dark border border-guardian-cyan/30 animate-slide-up">
          <div className="text-sm text-guardian-light">
            {displayedText}
            {!isComplete && <span className="animate-pulse">|</span>}
          </div>
          <div className="absolute -bottom-2 right-4 w-0 h-0 border-l-8 border-t-8 border-r-0 border-transparent border-t-guardian-dark"></div>
        </div>
      )}
      
      {/* Mascot */}
      <div 
        className={`relative w-16 h-16 rounded-full overflow-hidden border-2 border-guardian-cyan/50 shadow-lg cursor-pointer ${pulseEffect ? 'animate-pulse-glow' : ''}`}
        onClick={() => setIsVisible(prev => !prev)}
      >
        <img 
          src="/sanctra.svg" 
          alt="Sanctra" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-guardian-cyan/10 to-guardian-purple/10 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Mascot;
