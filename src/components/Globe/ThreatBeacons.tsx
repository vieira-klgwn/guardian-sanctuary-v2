
import React from 'react';
import { ThreatData } from '@/utils/threatData';

interface ThreatBeaconsProps {
  threats: ThreatData[];
  onThreatSelect: (threat: ThreatData) => void;
}

const ThreatBeacons: React.FC<ThreatBeaconsProps> = ({ threats, onThreatSelect }) => {
  return (
    <>
      {threats.map(threat => {
        const phi = (90 - threat.latitude) * (Math.PI / 180);
        const theta = (threat.longitude + 180) * (Math.PI / 180);
        
        const x = -(Math.sin(phi) * Math.cos(theta)) * 50 + 50;
        const y = (Math.cos(phi)) * 50 + 50;
        
        let color;
        switch(threat.type) {
          case 'ransomware': color = 'var(--beacon-color, #EF4444)'; break;
          case 'phishing': color = 'var(--beacon-color, #3B82F6)'; break;
          case 'malware': color = 'var(--beacon-color, #F59E0B)'; break;
          case 'ddos': color = 'var(--beacon-color, #EC4899)'; break;
          default: color = 'var(--beacon-color, #6366F1)';
        }
        
        return (
          <div 
            key={threat.id}
            className="threat-beacon cursor-pointer"
            style={{ 
              left: `${x}%`, 
              top: `${y}%`, 
              width: `${threat.intensity * 1.5 + 5}px`, 
              height: `${threat.intensity * 1.5 + 5}px`, 
              '--beacon-color': color
            } as React.CSSProperties}
            onClick={() => onThreatSelect(threat)}
          />
        );
      })}
    </>
  );
};

export default ThreatBeacons;
