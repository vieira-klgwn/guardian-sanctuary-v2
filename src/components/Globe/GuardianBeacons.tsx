
import React from 'react';
import { GuardianData } from '@/utils/threatData';

interface GuardianBeaconsProps {
  guardians: GuardianData[];
}

const GuardianBeacons: React.FC<GuardianBeaconsProps> = ({ guardians }) => {
  return (
    <>
      {guardians.map(guardian => {
        const phi = (90 - guardian.latitude) * (Math.PI / 180);
        const theta = (guardian.longitude + 180) * (Math.PI / 180);
        
        const x = -(Math.sin(phi) * Math.cos(theta)) * 50 + 50;
        const y = (Math.cos(phi)) * 50 + 50;
        
        return (
          <div 
            key={guardian.id}
            className="absolute rounded-full z-20 cursor-pointer"
            style={{ 
              left: `${x}%`, 
              top: `${y}%`, 
              width: '10px', 
              height: '10px',
              background: 'radial-gradient(circle, rgba(100, 255, 218, 0.8) 0%, rgba(100, 255, 218, 0.1) 70%)',
              boxShadow: '0 0 10px #64FFDA'
            }}
          >
            <div className="absolute inset-0 animate-ping rounded-full bg-guardian-cyan/50"></div>
          </div>
        );
      })}
    </>
  );
};

export default GuardianBeacons;
