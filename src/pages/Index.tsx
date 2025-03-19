// src/pages/Index.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import GlobeVisualization from '../components/Globe/GlobeVisualization';
import GuardianDashboard from '../components/Guardian/GuardianDashboard';
import SanctuaryToolkit from '../components/Sanctuary/SanctuaryToolkit';
import { Button } from "@/components/ui/button";
import { Loader2, Shield, Users, AlertTriangle, Zap, ChevronRight, Lock, Globe, BarChart, Info } from 'lucide-react';

const Index = () => {
  const location = useLocation();
  const path = location.pathname;

  // Guided Tour State
  const [tourActive, setTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [showTourPrompt, setShowTourPrompt] = useState(false);

  useEffect(() => {
    // Show tour prompt every time the homepage loads
    if (path === '/') {
      setTimeout(() => setShowTourPrompt(true), 1000); // Wait 1 second for effect
    }
  }, [path]); // Runs every time the path changes

  const startTour = () => {
    setTourActive(true);
    setShowTourPrompt(false);
    setTourStep(1);
  };

  const nextStep = () => setTourStep((prev) => prev + 1);
  const prevStep = () => setTourStep((prev) => prev - 1);
  const endTour = () => {
    setTourActive(false);
    setTourStep(0);
    setShowTourPrompt(false); // Hide prompt when tour ends
  };

  // Simple English tour steps
  const tourSteps = [
    {
      target: '#header-global-pulse',
      content: 'Click "Global Pulse" to see online dangers around the world.',
    },
    {
      target: '#header-guardian-network',
      content: 'Go to "Guardian Network" to meet other helpers and see group info.',
    },
    {
      target: '#header-sanctuary',
      content: 'Are you hacked and dont know how to recover yourself? Use "Sanctuary" to get tools to stop online attacks.',
    },
    {
      target: '#join-forge-btn',
      content: 'Press "Join the Forge" to become a helper and start.',
    },
    {
      target: '#access-command-btn',
      content: 'Click "Access Command" to log in and check your helper page.',
    },
    {
      target: '#globe-visualization',
      content: 'This globe shows online dangers. Touch it to look closer.',
    },
    {
      target: '#enlist-now-btn',
      content: 'Press "Enlist Now" (Scroll a little bit down) 👇 to join and fight online bad things.',
    },
    {
      target: '#footer-join-network',
      content: 'link at the footer:👇Click "Join the team" to help others.',
    },
    {
      target: '#footer-leaderboard',
      content: 'link at the footer:Click "View Leader board" 👇See who the best helpers are.',
    },
    {
      target: '#footer-challenge',
      content: 'link at the footer👇Click "Start  Challenge" Try a test to practice stopping online dangers.',
    },
  ];

  const renderContent = () => {
    switch (path) {
      case '/guardian':
        return <GuardianDashboard />;
      case '/sanctuary':
        return <SanctuaryToolkit />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-guardian-dark via-gray-900 to-black text-guardian-light overflow-hidden relative">
            {/* Welcome Section */}
            <section className="relative px-6 py-20 text-center border-b border-cyan-400/20">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/metal.png')] opacity-10 animate-subtle-move"></div>
              <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-600 to-silver-300 bg-clip-text text-transparent mb-6 tracking-tight animate-slide-in">
                Guardian Sanctuary
              </h1>
              <h2 className="text-2xl md:text-3xl font-medium text-silver-300/80 mb-8 animate-fade-in-delay">
                Make the Internet Safe
              </h2>
              <p className="text-lg md:text-xl text-silver-300/70 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay-2">
                Help stop online dangers with tools, maps, and a big team of friends.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  id="join-forge-btn"
                  className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-md hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-glow-metal overflow-hidden"
                >
                  <Link to="/join">
                    <span className="relative z-10">Join the Forge</span>
                    <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </Link>
                </Button>
                <Button
                  asChild
                  id="access-command-btn"
                  variant="outline"
                  className="px-8 py-4 text-cyan-400 border-cyan-400/50 rounded-md hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 shadow-md hover:shadow-glow-metal"
                >
                  <Link to="/login">Access Command</Link>
                </Button>
              </div>
            </section>

            {/* Globe Section */}
            <section id="globe-visualization" className="relative py-16 px-6">
              <div className="relative z-10 max-w-6xl mx-auto">
                <GlobeVisualization className="w-full h-[70vh] rounded-xl border border-cyan-400/30 shadow-lg shadow-cyan-400/20 animate-scale-in" />
                <div className="absolute top-6 left-6 bg-guardian-dark/90 p-4 rounded-lg shadow-md flex items-center space-x-3 border border-cyan-400/20 animate-pulse-metal">
                  <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
                  <span className="text-sm font-medium text-silver-300">Live Danger Map</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-guardian-dark/50 to-transparent pointer-events-none"></div>
            </section>

            {/* Numbers Section */}
            <section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Shield className="w-10 h-10 text-cyan-400" />, title: "35 Helpers", desc: "Fighting online bad things" },
                { icon: <Users className="w-10 h-10 text-cyan-400" />, title: "2,000+ Places", desc: "Working together everywhere" },
                { icon: <AlertTriangle className="w-10 h-10 text-cyan-400" />, title: "98% Good Work", desc: "Smart tools find dangers" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="relative bg-guardian-dark/80 p-8 rounded-lg border border-cyan-400/20 shadow-md hover:shadow-glow-metal transition-all duration-500 animate-fade-in-delay"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/metal.png')] opacity-5"></div>
                  <div className="relative z-10">
                    {stat.icon}
                    <h3 className="text-2xl font-semibold text-silver-300 mt-4 mb-2">{stat.title}</h3>
                    <p className="text-silver-300/70 text-sm">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </section>

            {/* Our Goal Section */}
            <section className="py-20 px-6 max-w-4xl mx-auto text-center border-t border-cyan-400/20">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-8 animate-slide-in">
                Our Goal
              </h2>
              <p className="text-lg text-silver-300/80 leading-relaxed animate-fade-in-delay">
                Guardian Sanctuary uses tools and people to keep the internet safe. We give helpers good tools and a strong team to stop online dangers.
              </p>
            </section>

            {/* Main Tools Section */}
            <section className="py-20 px-6 max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent text-center mb-12 animate-slide-in">
                Our Tools
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: <Globe className="w-12 h-12 text-cyan-400" />, title: "Danger Map", desc: "See online dangers on a world map." },
                  { icon: <Lock className="w-12 h-12 text-cyan-400" />, title: "Helper Tools", desc: "Tools to find and stop attacks." },
                  { icon: <BarChart className="w-12 h-12 text-cyan-400" />, title: "Your Score", desc: "See how good you are at helping." },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="group relative bg-guardian-dark/90 p-8 rounded-lg border border-cyan-400/30 hover:border-cyan-400 transition-all duration-300 shadow-lg hover:shadow-glow-metal animate-fade-in-delay"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                    <div className="relative z-10">
                      {feature.icon}
                      <h3 className="text-xl font-semibold text-silver-300 mt-4 mb-2">{feature.title}</h3>
                      <p className="text-silver-300/70 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Join Us Section */}
            <section className="py-20 px-6 text-center bg-gradient-to-b from-guardian-dark/50 to-gray-900 border-t border-cyan-400/20">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-8 animate-slide-in">
                Join Our Team
              </h2>
              <p className="text-lg text-silver-300/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-delay">
                Join us to use cool tools and help keep the internet safe. Start now!
              </p>
              <Button
                asChild
                id="enlist-now-btn"
                className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-md hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-glow-metal overflow-hidden"
              >
                <Link to="/join">
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Enlist Now</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </Link>
              </Button>
            </section>

            {/* Star Helper Section */}
            <section className="py-20 px-6 max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-8 animate-slide-in">
                Star Helper
              </h2>
              <div className="relative bg-guardian-dark/90 p-8 rounded-lg border border-cyan-400/30 shadow-lg hover:shadow-glow-metal transition-all duration-300 animate-fade-in-delay">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/metal.png')] opacity-10"></div>
                <div className="relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full border-2 border-cyan-400/50 shadow-glow-metal flex items-center justify-center">
                      <Zap className="w-8 h-8 text-cyan-400 animate-pulse-metal" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-silver-300 mb-2">Kara Voss</h3>
                  <p className="text-silver-300/70 text-sm mb-4">Super Helper, 250 Points</p>
                  <p className="text-silver-300/80 text-base">
                    Kara stopped a big online attack and made our team stronger.
                  </p>
                </div>
              </div>
            </section>

            {/* Danger Alert */}
            {/* <section className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 border-t border-red-400/30 p-4 flex items-center justify-between animate-slide-up">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-400 animate-pulse" />
                <span className="text-sm font-medium text-silver-300">Warning: Big Online Attack in Area 7</span>
              </div>
              <Button
                variant="outline"
                className="text-cyan-400 border-cyan-400/50 hover:bg-cyan-400/10 rounded-md transition-all duration-300"
              >
                <Link to="/challenge">Fight Now</Link>
              </Button>
            </section> */}

            {/* Tour Start Popup */}
            {showTourPrompt && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                <div className="bg-guardian-dark/90 p-6 rounded-lg border border-cyan-400/30 shadow-lg shadow-cyan-400/20 animate-fade-in">
                  <h3 className="text-xl font-semibold text-silver-300 mb-4">
                    Hello! Welcome to Guardian Sanctuary!
                  </h3>
                  <p className="text-silver-300/80 mb-6">
                    Do you want me to show you how to use this app?
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={startTour}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 rounded-md transition-all duration-300"
                    >
                      Yes, Show Me
                    </Button>
                    <Button
                      onClick={() => setShowTourPrompt(false)}
                      variant="outline"
                      className="text-cyan-400 border-cyan-400/50 hover:bg-cyan-400/10 rounded-md transition-all duration-300"
                    >
                      No, I’m Okay
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Tour Guide */}
            {tourActive && tourStep > 0 && tourStep <= tourSteps.length && (
              <div className="fixed inset-0 z-50">
                <div className="absolute inset-0 bg-black/70" onClick={endTour}></div>
                <div
                  className="absolute bg-guardian-dark/90 p-4 rounded-lg border border-cyan-400/30 shadow-lg shadow-cyan-400/20 text-silver-300 animate-fade-in-tour"
                  style={{
                    top: '20%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: '400px',
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-lg font-semibold">Step {tourStep} of {tourSteps.length}</h3>
                  </div>
                  <p className="text-silver-300/80 mb-4">{tourSteps[tourStep - 1].content}</p>
                  <div className="flex justify-between">
                    <Button
                      onClick={prevStep}
                      disabled={tourStep === 1}
                      variant="outline"
                      className="text-cyan-400 border-cyan-400/50 hover:bg-cyan-400/10 rounded-md transition-all duration-300"
                    >
                      Back
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        onClick={endTour}
                        variant="outline"
                        className="text-silver-300 border-silver-300/50 hover:bg-silver-300/10 rounded-md transition-all duration-300"
                      >
                        Stop Tour
                      </Button>
                      <Button
                        onClick={tourStep === tourSteps.length ? endTour : nextStep}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 rounded-md transition-all duration-300"
                      >
                        {tourStep === tourSteps.length ? 'Done' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </div>
                <div
                  className="absolute bg-transparent border-2 border-cyan-400 rounded-lg animate-pulse-tour"
                  style={{
                    ...(document.querySelector(tourSteps[tourStep - 1].target)?.getBoundingClientRect() || {}),
                    width: document.querySelector(tourSteps[tourStep - 1].target)?.clientWidth,
                    height: document.querySelector(tourSteps[tourStep - 1].target)?.clientHeight,
                    top: document.querySelector(tourSteps[tourStep - 1].target)?.getBoundingClientRect().top,
                    left: document.querySelector(tourSteps[tourStep - 1].target)?.getBoundingClientRect().left,
                    zIndex: 60,
                  }}
                ></div>
              </div>
            )}
          </div>
        );
    }
  };

  return renderContent();
};

// Animation Styles
const styles = `
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInDelay {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes pulseMetal {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.05); opacity: 1; }
  }
  @keyframes subtleMove {
    0% { background-position: 0 0; }
    100% { background-position: 100px 100px; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
  @keyframes fadeInTour {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes pulseTour {
    0%, 100% { border-color: rgba(100, 255, 218, 0.5); }
    50% { border-color: rgba(100, 255, 218, 1); }
  }
  .animate-slide-in { animation: slideIn 0.8s ease-out; }
  .animate-fade-in-delay { animation: fadeInDelay 0.8s ease-out 0.4s forwards; opacity: 0; }
  .animate-fade-in-delay-2 { animation: fadeInDelay 0.8s ease-out 0.6s forwards; opacity: 0; }
  .animate-pulse-metal { animation: pulseMetal 2s infinite ease-in-out; }
  .animate-subtle-move { animation: subtleMove 20s infinite linear; }
  .animate-scale-in { animation: scaleIn 1s ease-out; }
  .animate-slide-up { animation: slideUp 0.5s ease-out forwards; }
  .animate-fade-in-tour { animation: fadeInTour 0.5s ease-out; }
  .animate-pulse-tour { animation: pulseTour 1.5s infinite; }
  .shadow-glow-metal { box-shadow: 0 0 20px rgba(100, 255, 218, 0.4), 0 0 5px rgba(100, 255, 218, 0.2); }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default Index;