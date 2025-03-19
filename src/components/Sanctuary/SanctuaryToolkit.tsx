import React, { useState } from 'react';
import { useAnimatedMount } from '@/utils/animations';
import { 
  Lock, Shield, Smartphone, CreditCard, 
  Mail, LifeBuoy, MessageSquare, Clock, CheckCircle, Search
} from 'lucide-react';

const incidentTypes = [
  { id: 'check-vulnerability', name: 'Check Vulnerability of Your System', icon: <Search className="w-5 h-5" /> },
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
  const [targetUrl, setTargetUrl] = useState('');
  const [scanResults, setScanResults] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const getRecoverySteps = () => {
    switch (selectedIncident) {
      case 'check-vulnerability':
        if (recoveryStep === 0) {
          return [{
            title: 'Enter your app URL',
            description: 'Type the web address of your app to check for problems.',
            action: 'Start Scan',
            customAction: () => scanVulnerabilities(),
          }];
        } else if (recoveryStep === 1) {
          return [{
            title: 'See scan results',
            description: 'Look at the problems found in your app.',
            action: 'Next',
            customAction: () => setRecoveryStep(2),
          }];
        } else if (recoveryStep === 2 && scanResults.length > 0) {
          const steps = [];
          scanResults.forEach(vuln => {
            if (vuln.includes('XSS')) {
              steps.push({
                title: 'Fix XSS problem',
                description: 'Clean your app code to stop bad scripts from running.',
                action: 'Learn How',
                actionLink: 'https://owasp.org/www-community/attacks/xss/',
              });
            } else if (vuln.includes('SQL Injection')) {
              steps.push({
                title: 'Fix SQL Injection problem',
                description: 'Use safe code to stop bad database attacks.',
                action: 'Learn How',
                actionLink: 'https://owasp.org/www-community/attacks/SQL_Injection',
              });
            } else if (vuln.includes('Directory Traversal')) {
              steps.push({
                title: 'Fix Directory Traversal problem',
                description: 'Block access to secret files in your app.',
                action: 'Learn How',
                actionLink: 'https://owasp.org/www-community/attacks/Path_Traversal',
              });
            } else if (vuln.includes('Command Injection')) {
              steps.push({
                title: 'Fix Command Injection problem',
                description: 'Stop bad commands from running on your server.',
                action: 'Learn How',
                actionLink: 'https://owasp.org/www-community/attacks/Command_Injection',
              });
            } else if (vuln.includes('Server Misconfiguration')) {
              steps.push({
                title: 'Fix Server Misconfiguration problem',
                description: 'Hide private pages and fix server settings.',
                action: 'Learn How',
                actionLink: 'https://owasp.org/www-project-secure-headers/',
              });
            }
          });
          return steps.length > 0 ? steps : [{
            title: 'No problems found',
            description: 'Your app looks safe! Keep it updated.',
            action: 'Finish',
            customAction: () => setSelectedIncident(null),
          }];
        }
        return [];
      case 'account-hack':
        return [
          { title: 'Change your password', description: 'Make a new strong password with letters, numbers, and symbols on another device.', action: 'Change Password', actionLink: '#' },
          { title: 'Turn on two-step check', description: 'Add extra safety with two-step login if you can.', action: 'Turn On Two-Step', actionLink: '#' },
          { title: 'Look for bad activity', description: 'Check your account for strange things and report them.', action: 'Check Activity', actionLink: '#' },
          { title: 'Change secret questions', description: 'Update your security questions to stop others from getting in.', action: 'Update Questions', actionLink: '#' },
          { title: 'Fix other accounts', description: 'Change passwords on other accounts if you used the same one.', action: 'Check Passwords', actionLink: '#' },
        ];
      case 'ransomware':
        return [
          { title: 'Cut off the device', description: 'Turn off internet on the device to stop the attack from spreading.', action: 'Cut Off Guide', actionLink: '#' },
          { title: 'Tell the police', description: 'Report the attack to police and online safety groups.', action: 'Report Attack', actionLink: '#' },
          { title: 'Check locked files', description: 'Find out which files are locked and see if you have copies saved.', action: 'Backup Guide', actionLink: '#' },
          { title: 'Look for unlock tools', description: 'Don’t pay money. Look for free unlock tools from safe websites.', action: 'Unlock Tools', actionLink: '#' },
          { title: 'Clean and fix', description: 'Remove the attack and use your saved copies to fix things.', action: 'Fix Guide', actionLink: '#' },
        ];
      case 'device-hack':
        return [
          { title: 'Turn off internet', description: 'Disconnect your device from the internet right away.', action: 'Disconnect Guide', actionLink: '#' },
          { title: 'Run a virus check', description: 'Use antivirus software to find and remove bad things.', action: 'Download Antivirus', actionLink: '#' },
          { title: 'Change passwords', description: 'Make new passwords for all accounts on the device.', action: 'Change Passwords', actionLink: '#' },
          { title: 'Update your device', description: 'Install the latest updates to fix weak spots.', action: 'Update Guide', actionLink: '#' },
          { title: 'Check for damage', description: 'Look at your files and accounts for anything strange.', action: 'Check Damage', actionLink: '#' },
        ];
      case 'financial':
        return [
          { title: 'Call your bank', description: 'Tell your bank or card company about the problem fast.', action: 'Contact Bank', actionLink: '#' },
          { title: 'Freeze your cards', description: 'Stop your cards so no one can use them.', action: 'Freeze Cards', actionLink: '#' },
          { title: 'Check your money', description: 'Look at your bank account for bad payments.', action: 'Check Account', actionLink: '#' },
          { title: 'Report to police', description: 'Tell the police about the money theft.', action: 'Report Fraud', actionLink: '#' },
          { title: 'Watch your credit', description: 'Check your credit report for strange things.', action: 'Credit Guide', actionLink: '#' },
        ];
      case 'phishing':
        return [
          { title: 'Don’t click links', description: 'Avoid clicking anything in the bad email or message.', action: 'Learn More', actionLink: '#' },
          { title: 'Change passwords', description: 'Make new passwords if you gave info by mistake.', action: 'Change Passwords', actionLink: '#' },
          { title: 'Tell the company', description: 'Report the fake message to the real company.', action: 'Report Phishing', actionLink: '#' },
          { title: 'Check your accounts', description: 'Look at your accounts for anything wrong.', action: 'Check Accounts', actionLink: '#' },
          { title: 'Learn to spot fakes', description: 'Find out how to see fake messages next time.', action: 'Phishing Guide', actionLink: '#' },
        ];
      default:
        return [];
    }
  };

  const scanVulnerabilities = async () => {
    if (!targetUrl) {
      setScanResults(['Please enter a URL first!']);
      return;
    }

    setIsScanning(true);
    try {
      const response = await fetch('http://localhost:5000/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl }),
      });
      const data = await response.json();
      if (data.error) {
        setScanResults([data.error]);
      } else {
        setScanResults(data.vulnerabilities.length > 0 ? data.vulnerabilities : ['No problems found!']);
      }
      setRecoveryStep(1); // Move to results step
    } catch (error) {
      setScanResults(['Scan failed. Check if the server is running.']);
    }
    setIsScanning(false);
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-3">Sanctuary Toolkit</h1>
        <p className="text-lg text-guardian-light/80 max-w-2xl mx-auto">
          Your safe place to fix online problems. Get help to recover and stay safe.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <div className="glassmorphism border border-guardian-cyan/20 rounded-lg p-6">
            <h2 className="text-xl font-medium text-guardian-light mb-4">What happened?</h2>
            <p className="text-sm text-guardian-light/70 mb-6">
              Pick the problem you have to get help steps.
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
                    setScanResults([]);
                    setTargetUrl('');
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
                <span className="text-sm">Need help now?</span>
              </div>
              <button className="cyber-button">
                Talk to an Expert
              </button>
            </div>
          </div>

          <div className="mt-6 glassmorphism border border-guardian-cyan/20 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <LifeBuoy className="w-5 h-5 text-guardian-cyan" />
              <h3 className="text-lg font-medium">Guardian Help</h3>
            </div>
            <p className="text-sm text-guardian-light/70 mb-4">
              Talk to helpers who can show you how to fix things.
            </p>
            <button className="w-full cyber-button">
              Join Help Room
            </button>
          </div>
        </div>

        <div className="lg:col-span-8">
          {selectedIncident ? (
            <div className="glassmorphism border border-guardian-cyan/20 rounded-lg p-6">
              <div className="mb-6">
                <h2 className="text-xl font-medium text-guardian-light mb-2">
                  {incidentTypes.find(i => i.id === selectedIncident)?.name} Help
                </h2>
                <p className="text-sm text-guardian-light/70">
                  Follow these steps to fix your problem and stay safe.
                </p>
              </div>

              {selectedIncident === 'check-vulnerability' && (
                <div className="mb-8">
                  <div className="flex justify-between text-xs text-guardian-light/50 mb-2">
                    <span>Progress</span>
                    <span>{recoveryStep + 1} of {scanResults.length > 0 && recoveryStep === 2 ? scanResults.length + 2 : 3}</span>
                  </div>
                  <div className="h-1.5 w-full bg-guardian-dark rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-guardian-cyan transition-all duration-300"
                      style={{ width: `${((recoveryStep + 1) / (scanResults.length > 0 && recoveryStep === 2 ? scanResults.length + 2 : 3)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {getRecoverySteps().length > 0 && (
                <div className="animate-fade-in">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-guardian-cyan/20 text-guardian-cyan border border-guardian-cyan/30">
                      {recoveryStep + 1}
                    </div>
                    <h3 className="text-lg font-medium">{getRecoverySteps()[0].title}</h3>
                  </div>

                  <p className="text-guardian-light/80 mb-6 pl-14">
                    {getRecoverySteps()[0].description}
                  </p>

                  {selectedIncident === 'check-vulnerability' && recoveryStep === 0 && (
                    <input
                      type="text"
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                      placeholder="Enter your app URL (e.g., http://example.com)"
                      className="w-full mb-4 p-2 bg-guardian-dark border border-guardian-cyan/20 rounded-md text-guardian-light"
                    />
                  )}

                  {selectedIncident === 'check-vulnerability' && recoveryStep === 1 && (
                    <div className="pl-14 mb-6">
                      {scanResults.length > 0 ? (
                        <ul className="list-disc text-guardian-light/80">
                          {scanResults.map((result, index) => (
                            <li key={index}>{result}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-guardian-light/70">Scanning... Please wait.</p>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 justify-between pl-14">
                    <button 
                      className={`cyber-button ${isScanning ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={getRecoverySteps()[0].customAction || (() => window.open(getRecoverySteps()[0].actionLink, '_blank'))}
                      disabled={isScanning}
                    >
                      {isScanning ? 'Scanning...' : getRecoverySteps()[0].action}
                    </button>

                    <div className="flex gap-3">
                      <button 
                        className="px-4 py-2 border border-guardian-cyan/20 rounded-md hover:bg-guardian-dark transition-colors"
                        onClick={() => setRecoveryStep(Math.max(0, recoveryStep - 1))}
                        disabled={recoveryStep === 0 || isScanning}
                      >
                        Previous
                      </button>
                      <button 
                        className="px-4 py-2 bg-guardian-dark border border-guardian-cyan/20 rounded-md hover:bg-guardian-cyan/20 transition-colors"
                        onClick={() => setRecoveryStep(Math.min((scanResults.length > 0 && recoveryStep === 2 ? scanResults.length + 1 : 2), recoveryStep + 1))}
                        disabled={(recoveryStep === 2 && scanResults.length === 0) || isScanning}
                      >
                        Next
                      </button>
                    </div>
                  </div>

                  {selectedIncident === 'check-vulnerability' && (
                    <div className="mt-10 pt-6 border-t border-guardian-cyan/10">
                      <h4 className="text-sm font-medium mb-4">Help Steps</h4>
                      <div className="space-y-2">
                        {[
                          'Enter your app URL',
                          'See scan results',
                          ...(scanResults.length > 0 ? scanResults.map((_, i) => `Fix problem ${i + 1}`) : ['No problems found']),
                        ].map((title, index) => (
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
                            <span className="text-sm">{title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="glassmorphism border border-guardian-cyan/20 rounded-lg p-12 flex flex-col items-center justify-center h-full">
              <Shield className="w-16 h-16 text-guardian-cyan/50 mb-4" />
              <h3 className="text-xl font-medium text-guardian-light mb-2">Help Guide</h3>
              <p className="text-center text-guardian-light/70 mb-6 max-w-md">
                Pick a problem on the left to get steps and help from experts.
              </p>
              <p className="text-sm text-guardian-light/50">
                We update our help with the latest danger info.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SanctuaryToolkit;