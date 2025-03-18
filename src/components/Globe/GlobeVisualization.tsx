
import React, { useEffect, useRef, useState } from 'react';
import { useAnimatedMount } from '@/utils/animations';
import { ThreatData, GuardianData, generateThreats, generateGuardians } from '@/utils/threatData';
import ThreatCard from '../UI/ThreatCard';
import { ArrowUpRight } from 'lucide-react';
import GlobeStats from './GlobeStats';
import GlobeControls from './GlobeControls';
import ThreatBeacons from './ThreatBeacons';
import GuardianBeacons from './GuardianBeacons';

interface GlobeVisualizationProps {
  className?: string;
}

const GlobeVisualization: React.FC<GlobeVisualizationProps> = ({ className = "" }) => {
  const globeContainerRef = useRef<HTMLDivElement>(null);
  const [selectedThreat, setSelectedThreat] = useState<ThreatData | null>(null);
  const [threats, setThreats] = useState<ThreatData[]>([]);
  const [guardians, setGuardians] = useState<GuardianData[]>([]);
  const [loading, setLoading] = useState(true);
  const mounted = useAnimatedMount();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const threatData = generateThreats(30);
      const guardianData = generateGuardians(20);
      
      setThreats(threatData);
      setGuardians(guardianData);
      setLoading(false);
      
      const randomIndex = Math.floor(Math.random() * threatData.length);
      setSelectedThreat(threatData[randomIndex]);
    };
    
    fetchData();
  }, []);

  return (
    <div className={`relative w-full max-w-6xl mx-auto ${className}`}>
      <div className={`transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div 
          ref={globeContainerRef}
          className="relative h-[70vh] overflow-hidden rounded-xl glassmorphism border border-guardian-cyan/20"
        >
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-guardian-cyan/20 border-t-guardian-cyan animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vh] h-[40vh] rounded-full border border-guardian-cyan/40 bg-guardian-blue/10 backdrop-blur-sm animate-rotate-slow">
                <div className="absolute inset-0 rounded-full border border-guardian-cyan/10"></div>
                <div className="absolute inset-0 rounded-full border border-guardian-cyan/5" style={{ transform: 'rotate(20deg)' }}></div>
                <div className="absolute inset-0 rounded-full border border-guardian-cyan/5" style={{ transform: 'rotate(40deg)' }}></div>
                <div className="absolute inset-0 rounded-full border border-guardian-cyan/5" style={{ transform: 'rotate(60deg)' }}></div>
                <div className="absolute inset-0 rounded-full border border-guardian-cyan/5" style={{ transform: 'rotate(80deg)' }}></div>
                <div className="absolute top-1/2 left-0 right-0 h-px bg-guardian-cyan/30"></div>

                <ThreatBeacons threats={threats} onThreatSelect={setSelectedThreat} />
                <GuardianBeacons guardians={guardians} />
              </div>
              
              <GlobeStats threats={threats} guardians={guardians} />
              <GlobeControls />
              
              {selectedThreat && (
                <div className="absolute right-4 bottom-12 max-w-sm w-full">
                  <ThreatCard threat={selectedThreat} />
                  <button 
                    className="mt-2 w-full text-xs flex items-center justify-center gap-1 p-2 rounded-md bg-guardian-cyan/10 text-guardian-cyan hover:bg-guardian-cyan/20 transition-colors"
                  >
                    <span>View All Threats</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobeVisualization;
