
import React from 'react';
import { useAnimatedMount, useCountUp } from '@/utils/animations';
import { Shield, Award, Bell, TrendingUp, UserPlus } from 'lucide-react';

const GuardianDashboard: React.FC = () => {
  const mounted = useAnimatedMount();
  const guardianCount = useCountUp(12578);
  const threatsNeutralized = useCountUp(87425);
  
  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-3">Guardian Network</h1>
        <p className="text-lg text-guardian-light/80 max-w-2xl mx-auto">
          Join a global community of cybersecurity guardians working together to protect the digital world.
        </p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glassmorphism border border-guardian-cyan/20 rounded-lg p-6 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-guardian-dark border border-guardian-cyan/30">
            <Shield className="w-7 h-7 text-guardian-cyan" />
          </div>
          <h3 className="text-2xl font-semibold text-guardian-light mb-1">{guardianCount.toLocaleString()}</h3>
          <p className="text-guardian-light/70">Active Guardians</p>
        </div>
        
        <div className="glassmorphism border border-guardian-cyan/20 rounded-lg p-6 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-guardian-dark border border-guardian-cyan/30">
            <Award className="w-7 h-7 text-guardian-cyan" />
          </div>
          <h3 className="text-2xl font-semibold text-guardian-light mb-1">{threatsNeutralized.toLocaleString()}</h3>
          <p className="text-guardian-light/70">Threats Neutralized</p>
        </div>
        
        <div className="glassmorphism border border-guardian-cyan/20 rounded-lg p-6 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-guardian-dark border border-guardian-cyan/30">
            <Bell className="w-7 h-7 text-guardian-cyan" />
          </div>
          <h3 className="text-2xl font-semibold text-guardian-light mb-1">92%</h3>
          <p className="text-guardian-light/70">Alert Accuracy</p>
        </div>
      </div>
      
      {/* Guardian features */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold gradient-text mb-6 text-center">How Guardians Help</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glassmorphism border border-guardian-cyan/20 rounded-lg p-6 group">
            <div className="mb-4 w-12 h-12 rounded-lg flex items-center justify-center bg-guardian-dark border border-guardian-cyan/30 group-hover:scale-110 transition-transform">
              <Bell className="w-6 h-6 text-guardian-cyan" />
            </div>
            <h3 className="text-xl font-medium text-guardian-light mb-2">Report Threats</h3>
            <p className="text-guardian-light/70">Submit suspicious emails, websites, and activities to help protect the community. Your reports are analyzed and added to our threat database.</p>
          </div>
          
          <div className="glassmorphism border border-guardian-cyan/20 rounded-lg p-6 group">
            <div className="mb-4 w-12 h-12 rounded-lg flex items-center justify-center bg-guardian-dark border border-guardian-cyan/30 group-hover:scale-110 transition-transform">
              <UserPlus className="w-6 h-6 text-guardian-cyan" />
            </div>
            <h3 className="text-xl font-medium text-guardian-light mb-2">Support Recovery</h3>
            <p className="text-guardian-light/70">Help victims recover from cyberattacks with guidance and resources. Experienced guardians can volunteer for peer support in recovery rooms.</p>
          </div>
          
          <div className="glassmorphism border border-guardian-cyan/20 rounded-lg p-6 group">
            <div className="mb-4 w-12 h-12 rounded-lg flex items-center justify-center bg-guardian-dark border border-guardian-cyan/30 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-guardian-cyan" />
            </div>
            <h3 className="text-xl font-medium text-guardian-light mb-2">Validate Predictions</h3>
            <p className="text-guardian-light/70">Review and validate AI threat predictions based on your expertise or observations. Help improve the accuracy of our forecast system.</p>
          </div>
          
          <div className="glassmorphism border border-guardian-cyan/20 rounded-lg p-6 group">
            <div className="mb-4 w-12 h-12 rounded-lg flex items-center justify-center bg-guardian-dark border border-guardian-cyan/30 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-guardian-cyan" />
            </div>
            <h3 className="text-xl font-medium text-guardian-light mb-2">Share Defenses</h3>
            <p className="text-guardian-light/70">Contribute defensive tactics, scripts, or configurations that can help others protect themselves from emerging threats.</p>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="text-center">
        <button className="cyber-button px-8 py-3 text-lg">
          Become a Guardian
        </button>
        <p className="mt-3 text-sm text-guardian-light/60">
          Join a global movement of cybersecurity defenders
        </p>
      </div>
    </div>
  );
};

export default GuardianDashboard;
