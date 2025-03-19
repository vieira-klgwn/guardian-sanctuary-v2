// src/pages/Index.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import GlobeVisualization from '../components/Globe/GlobeVisualization';
import GuardianDashboard from '../components/Guardian/GuardianDashboard';
import SanctuaryToolkit from '../components/Sanctuary/SanctuaryToolkit';
import { useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui is used
import { Loader2, Shield, Users, AlertTriangle } from 'lucide-react'; // Futuristic icons

const Index = () => {
  const location = useLocation();
  const path = location.pathname;

  const renderContent = () => {
    switch (path) {
      case '/guardian':
        return <GuardianDashboard />;
      case '/sanctuary':
        return <SanctuaryToolkit />;
      default:
        return (
          <div className="px-6 py-12 min-h-screen bg-gradient-to-br from-guardian-dark to-gray-900 text-guardian-light">
            {/* Hero Section */}
            <section className="text-center mb-16 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-6">
                Guardian Sanctuary
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-guardian-light/80 mb-8">
                The Pulse of Protection
              </h2>
              <p className="text-lg md:text-xl text-guardian-light/70 max-w-3xl mx-auto leading-relaxed">
                A real-time visualization of global cyber threats, empowering you with tools to protect and recover from attacks.
              </p>
            </section>

            {/* Globe Visualization */}
            <section className="relative mb-16">
              <GlobeVisualization className="w-full h-[60vh] rounded-xl shadow-lg" />
              <div className="absolute top-4 left-4 bg-guardian-dark/90 p-3 rounded-lg shadow-md flex items-center space-x-2 animate-pulse-slow">
                <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                <span className="text-sm text-guardian-light/80">Live Threat Monitoring</span>
              </div>
            </section>

            {/* Stats Section */}
            <section className="mt-40 mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="bg-guardian-dark/80 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <Shield className="w-8 h-8 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold text-guardian-light mb-2">20 Active Guardians</h3>
                <p className="text-guardian-light/70 text-sm">Protecting the digital frontier</p>
              </div>
              <div className="bg-guardian-dark/80 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <Users className="w-8 h-8 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold text-guardian-light mb-2">1,500+ Communities</h3>
                <p className="text-guardian-light/70 text-sm">United against cyber threats</p>
              </div>
              <div className="bg-guardian-dark/80 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <AlertTriangle className="w-8 h-8 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold text-guardian-light mb-2">95% Threat Detection</h3>
                <p className="text-guardian-light/70 text-sm">Powered by AI and guardians</p>
              </div>
            </section>

            {/* Mission Statement */}
            <section className="mt-40 mb-16 max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text mb-6">
                Our Mission
              </h2>
              <p className="text-guardian-light/70 text-base md:text-lg leading-relaxed">
                At Guardian Sanctuary, we strive to create a safer digital world by uniting global communities, leveraging cutting-edge technology, and empowering individuals to combat cyber threats. Together, we protect, educate, and recover.
              </p>
            </section>

            {/* Join Section */}
            <section className=" mt-40 mb-16 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text mb-6">
                Join the Guardian Network
              </h2>
              <p className="text-guardian-light/70 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                Become part of a global community working together to protect digital spaces and support those affected by cyber attacks. Your skills can make a difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="rounded-full px-6 py-3 bg-cyan-500 text-white hover:bg-cyan-600 transition-all duration-300">
                  <Link to="/register">Sign Up</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-6 py-3 text-cyan-400 border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="rounded-full px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300">
                  <Link to="/join">Become a Guardian</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-6 py-3 text-blue-400 border-blue-400 hover:bg-blue-400/10 transition-all duration-300">
                  <Link to="/guardian">Guardian Dashboard</Link>
                </Button>
              </div>
            </section>

            {/* Featured Guardian Spotlight */}
            <section className=" mt-40 mb-40 max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text mb-6">
                Featured Guardian
              </h2>
              <div className="bg-guardian-dark/80 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-guardian-light mb-2">Alex Chen</h3>
                <p className="text-guardian-light/70 text-sm mb-4">Threat Analyst, 150 Points</p>
                <p className="text-guardian-light/70 text-sm">
                  Alex has neutralized 25 threats and contributed to our AI prediction model, earning the Silver Guardian badge.
                </p>
              </div>
            </section>
          </div>
        );
    }
  };
  
  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
};

// Animation keyframes
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes pulseSlow {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
  .animate-pulse-slow { animation: pulseSlow 2s infinite; }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default Index;