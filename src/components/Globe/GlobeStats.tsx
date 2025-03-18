
import React from 'react';
import { Shield } from 'lucide-react';
import { ThreatData, GuardianData } from '@/utils/threatData';

interface GlobeStatsProps {
  threats: ThreatData[];
  guardians: GuardianData[];
}

const GlobeStats: React.FC<GlobeStatsProps> = ({ threats, guardians }) => {
  return (
    <div className="absolute top-4 left-4 p-4 rounded-lg glassmorphism border border-guardian-cyan/20">
      <h3 className="text-sm font-medium text-guardian-light mb-2">Global Threat Stats</h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-threat-ransomware"></div>
          <span>Ransomware: {threats.filter(t => t.type === 'ransomware').length}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-threat-phishing"></div>
          <span>Phishing: {threats.filter(t => t.type === 'phishing').length}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-threat-malware"></div>
          <span>Malware: {threats.filter(t => t.type === 'malware').length}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-threat-ddos"></div>
          <span>DDoS: {threats.filter(t => t.type === 'ddos').length}</span>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-guardian-cyan/10">
        <div className="flex items-center gap-1.5 text-xs">
          <Shield className="w-3 h-3 text-guardian-cyan" />
          <span>Active Guardians: {guardians.length}</span>
        </div>
      </div>
    </div>
  );
};

export default GlobeStats;
