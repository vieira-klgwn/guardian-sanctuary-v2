import React from 'react';
import { useAnimatedMount, useCountUp } from '@/utils/animations';
import { ThreatData } from '@/utils/threatData';
import { AlertTriangle, Shield, Globe, Clock, BarChart, X } from 'lucide-react'; // Added X for close icon

interface ThreatCardProps {
  threat: ThreatData;
  className?: string;
  setSelectedThreat: (threat: ThreatData | null) => void; // Explicitly typed
}

const ThreatCard: React.FC<ThreatCardProps> = ({ threat, className = "", setSelectedThreat }) => {
  const mounted = useAnimatedMount();
  const intensity = useCountUp(threat.intensity);

  const getThreatColor = () => {
    switch (threat.type) {
      case 'ransomware':
        return 'bg-threat-ransomware/10 border-threat-ransomware/30 text-threat-ransomware';
      case 'phishing':
        return 'bg-threat-phishing/10 border-threat-phishing/30 text-threat-phishing';
      case 'malware':
        return 'bg-threat-malware/10 border-threat-malware/30 text-threat-malware';
      case 'ddos':
        return 'bg-threat-ddos/10 border-threat-ddos/30 text-threat-ddos';
      default:
        return 'bg-threat-default/10 border-threat-default/30 text-threat-default';
    }
  };

  const getThreatIcon = () => {
    switch (threat.type) {
      case 'ransomware':
        return <AlertTriangle className="w-5 h-5" />;
      case 'phishing':
        return <AlertTriangle className="w-5 h-5" />;
      case 'malware':
        return <AlertTriangle className="w-5 h-5" />;
      case 'ddos':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  return (
    <div className={`relative group ${mounted ? 'animate-slide-up' : 'opacity-0'} ${className}`}>
      <div className="card-highlight"></div>
      <div className={`relative p-5 rounded-lg border ${getThreatColor()} glassmorphism`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {getThreatIcon()}
            <h3 className="font-medium capitalize">{threat.type}</h3>
          </div>
          <span className="px-2 py-0.5 text-xs rounded-full bg-guardian-dark border border-guardian-cyan/20">
            {new Date(threat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <p className="mb-3 text-sm text-guardian-light opacity-90">{threat.description}</p>

        <div className="grid grid-cols-2 gap-3 text-xs text-guardian-light opacity-80">
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            <span>{threat.country}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{new Date(threat.timestamp).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>{threat.impact}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BarChart className="w-3.5 h-3.5" />
            <span>Intensity: {intensity}/10</span>
          </div>
        </div>

        {/* Enhanced Close Button with Icon */}
        <button
          onClick={() => setSelectedThreat(null)}
          className="cyber-button mt-3 flex items-center justify-center gap-1 px-3 py-1 text-xs"
        >
          <X className="w-3 h-3" /> {/* Close icon */}
          <span>Close</span>
        </button>
      </div>
    </div>
  );
};

export default ThreatCard;