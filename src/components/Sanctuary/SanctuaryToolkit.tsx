
import React, { useState } from 'react';
import { useAnimatedMount } from '@/utils/animations';
import { 
  Lock, Shield, Smartphone, CreditCard, 
  Mail, LifeBuoy, MessageSquare, Clock, CheckCircle
} from 'lucide-react';

const incidentTypes = [
  { id: 'account-hack', name: 'Account Compromise', icon: <Lock className="w-5 h-5" /> },
  { id: 'ransomware', name: 'Ransomware', icon: <Shield className="w-5 h-5" /> },
  { id: 'device-hack', name: 'Device Compromise', icon: <Smartphone className="w-5 h-5" /> },
  { id: 'financial', name: 'Financial Fraud', icon: <CreditCard className="w-5 h-5" /> },
  { id: 'phishing', name: 'Phishing Attack', icon: <Mail className="w-5 h-5" /> },
];

const SanctuaryToolkit: React.FC = () => {
  const mounted = useAnimatedMount();
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const [recoveryStep, setRecoveryStep] = useState(0);
  
  const getRecoverySteps = () => {
    switch (selectedIncident) {
      case 'account-hack':
        return [
          { 
            title: 'Secure your account', 
            description: 'Change your password immediately on a different device. Use a strong password with a mix of letters, numbers, and symbols.',
            action: 'Change Password',
            actionLink: '#'
          },
          { 
            title: 'Enable two-factor authentication', 
            description: 'Add an extra layer of security by enabling two-factor authentication (2FA) where available.',
            action: 'Enable 2FA',
            actionLink: '#'
          },
          { 
            title: 'Check for unauthorized activity', 
            description: 'Review recent account activity for suspicious actions and report any unauthorized transactions.',
            action: 'Review Activity',
            actionLink: '#'
          },
          { 
            title: 'Update security questions', 
            description: 'Change your security questions and answers to prevent future unauthorized access.',
            action: 'Update Questions',
            actionLink: '#'
          },
          { 
            title: 'Secure other accounts', 
            description: 'If you used the same password elsewhere, change those immediately to prevent further breaches.',
            action: 'View Password Manager',
            actionLink: '#'
          },
        ];
      case 'ransomware':
        return [
          { 
            title: 'Isolate affected devices', 
            description: 'Disconnect the affected device from the internet and other networks to prevent the ransomware from spreading.',
            action: 'Isolation Guide',
            actionLink: '#'
          },
          { 
            title: 'Report the attack', 
            description: 'Report the ransomware attack to local law enforcement and national cybersecurity agencies.',
            action: 'Report Attack',
            actionLink: '#'
          },
          { 
            title: 'Assess encrypted files', 
            description: 'Determine which files have been encrypted and check if you have backups available.',
            action: 'Backup Guide',
            actionLink: '#'
          },
          { 
            title: 'Consider recovery options', 
            description: 'Do not pay the ransom if possible. Check for available decryptors from trusted security organizations.',
            action: 'Decryptor Tools',
            actionLink: '#'
          },
          { 
            title: 'Clean and restore', 
            description: 'After removing the ransomware, restore from backups or use recovery tools if available.',
            action: 'Restoration Guide',
            actionLink: '#'
          },
        ];
      // Add other incident types here
      default:
        return [];
    }
  };
  
  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-3">Sanctuary Toolkit</h1>
        <p className="text-lg text-guardian-light/80 max-w-2xl mx-auto">
          Your safe haven for cyber recovery. Get personalized guidance to recover from cyber attacks and protect your digital life.
        </p>
      </div>
      
      {/* Main toolkit section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Incident selection */}
        <div className="lg:col-span-4">
          <div className="glassmorphism border border-guardian-cyan/20 rounded-lg p-6">
            <h2 className="text-xl font-medium text-guardian-light mb-4">What happened?</h2>
            <p className="text-sm text-guardian-light/70 mb-6">
              Select the type of cyber incident you're experiencing to receive tailored recovery steps.
            </p>
            
            <div className="space-y-3">
              {incidentTypes.map(incident => (
                <button
                  key={incident.id}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    selectedIncident === incident.id 
                      ? 'bg-guardian-cyan/20 border border-guardian-cyan/40' 
                      : 'border border-guardian-cyan/10 hover:bg-guardian-dark'
                  }`}
                  onClick={() => {
                    setSelectedIncident(incident.id);
                    setRecoveryStep(0);
                  }}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    selectedIncident === incident.id 
                      ? 'bg-guardian-cyan/20' 
                      : 'bg-guardian-dark'
                  }`}>
                    {incident.icon}
                  </div>
                  <span>{incident.name}</span>
                </button>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-guardian-cyan/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-guardian-cyan" />
                <span className="text-sm">Need immediate help?</span>
              </div>
              <button className="cyber-button">
                Chat with an Expert
              </button>
            </div>
          </div>
          
          <div className="mt-6 glassmorphism border border-guardian-cyan/20 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <LifeBuoy className="w-5 h-5 text-guardian-cyan" />
              <h3 className="text-lg font-medium">Guardian Support</h3>
            </div>
            <p className="text-sm text-guardian-light/70 mb-4">
              Connect with experienced Guardians who can guide you through your recovery process.
            </p>
            <button className="w-full cyber-button">
              Join Support Room
            </button>
          </div>
        </div>
        
        {/* Recovery steps */}
        <div className="lg:col-span-8">
          {selectedIncident ? (
            <div className="glassmorphism border border-guardian-cyan/20 rounded-lg p-6">
              <div className="mb-6">
                <h2 className="text-xl font-medium text-guardian-light mb-2">
                  {incidentTypes.find(i => i.id === selectedIncident)?.name} Recovery
                </h2>
                <p className="text-sm text-guardian-light/70">
                  Follow these steps to recover and secure your digital assets.
                </p>
              </div>
              
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between text-xs text-guardian-light/50 mb-2">
                  <span>Progress</span>
                  <span>{recoveryStep + 1} of {getRecoverySteps().length}</span>
                </div>
                <div className="h-1.5 w-full bg-guardian-dark rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-guardian-cyan transition-all duration-300"
                    style={{ width: `${((recoveryStep + 1) / getRecoverySteps().length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Current step */}
              {getRecoverySteps().length > 0 && (
                <div className="animate-fade-in">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-guardian-cyan/20 text-guardian-cyan border border-guardian-cyan/30">
                      {recoveryStep + 1}
                    </div>
                    <h3 className="text-lg font-medium">{getRecoverySteps()[recoveryStep].title}</h3>
                  </div>
                  
                  <p className="text-guardian-light/80 mb-6 pl-14">
                    {getRecoverySteps()[recoveryStep].description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-between pl-14">
                    <button className="cyber-button">
                      {getRecoverySteps()[recoveryStep].action}
                    </button>
                    
                    <div className="flex gap-3">
                      <button 
                        className="px-4 py-2 border border-guardian-cyan/20 rounded-md hover:bg-guardian-dark transition-colors"
                        onClick={() => setRecoveryStep(Math.max(0, recoveryStep - 1))}
                        disabled={recoveryStep === 0}
                      >
                        Previous
                      </button>
                      <button 
                        className="px-4 py-2 bg-guardian-dark border border-guardian-cyan/20 rounded-md hover:bg-guardian-cyan/20 transition-colors"
                        onClick={() => setRecoveryStep(Math.min(getRecoverySteps().length - 1, recoveryStep + 1))}
                        disabled={recoveryStep === getRecoverySteps().length - 1}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  
                  {/* Timeline */}
                  <div className="mt-10 pt-6 border-t border-guardian-cyan/10">
                    <h4 className="text-sm font-medium mb-4">Recovery Timeline</h4>
                    <div className="space-y-2">
                      {getRecoverySteps().map((step, index) => (
                        <div 
                          key={index}
                          className={`flex items-center gap-3 p-2 rounded-md transition-colors ${
                            index === recoveryStep 
                              ? 'bg-guardian-cyan/10' 
                              : index < recoveryStep 
                                ? 'text-guardian-light/50' 
                                : 'text-guardian-light/30'
                          }`}
                          onClick={() => setRecoveryStep(index)}
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            index < recoveryStep 
                              ? 'bg-guardian-cyan/20' 
                              : 'bg-guardian-dark'
                          }`}>
                            {index < recoveryStep ? (
                              <CheckCircle className="w-4 h-4 text-guardian-cyan" />
                            ) : (
                              <Clock className="w-3 h-3" />
                            )}
                          </div>
                          <span className="text-sm">{step.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="glassmorphism border border-guardian-cyan/20 rounded-lg p-12 flex flex-col items-center justify-center h-full">
              <Shield className="w-16 h-16 text-guardian-cyan/50 mb-4" />
              <h3 className="text-xl font-medium text-guardian-light mb-2">Recovery Guidance</h3>
              <p className="text-center text-guardian-light/70 mb-6 max-w-md">
                Select an incident type from the left panel to receive personalized recovery steps and expert guidance.
              </p>
              <p className="text-sm text-guardian-light/50">
                All guidance is updated regularly based on the latest threat intelligence.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SanctuaryToolkit;
