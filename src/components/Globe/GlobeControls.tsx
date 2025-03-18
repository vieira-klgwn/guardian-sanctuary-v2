import React, { useState } from 'react';
import { Info } from 'lucide-react';
import Mascot from '../UI/Mascot';

const GlobeControls: React.FC = () => {
  const [showMascot, setShowMascot] = useState(false);

  return (
    <div className="absolute bottom-4 right-4 flex gap-2">
      <button
        className="p-2 rounded-full glassmorphism border border-guardian-cyan/20"
        onClick={() => setShowMascot(true)}
      >
        <Info className="w-4 h-4 text-guardian-light" />
      </button>
      {showMascot && <Mascot message="Red dots are threats! Click me to hide." />}
    </div>
  );
};

export default GlobeControls;