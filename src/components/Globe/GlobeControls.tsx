
import React from 'react';
import { Info } from 'lucide-react';

const GlobeControls: React.FC = () => {
  return (
    <div className="absolute bottom-4 right-4 flex gap-2">
      <button className="p-2 rounded-full glassmorphism border border-guardian-cyan/20">
        <Info className="w-4 h-4 text-guardian-light" />
      </button>
    </div>
  );
};

export default GlobeControls;
