
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import GlobeVisualization from '../components/Globe/GlobeVisualization';
import GuardianDashboard from '../components/Guardian/GuardianDashboard';
import SanctuaryToolkit from '../components/Sanctuary/SanctuaryToolkit';
import { useLocation } from 'react-router-dom';

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
          <div className="px-4 py-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-5xl font-bold gradient-text mb-4">Guardian Sanctuary</h1>
              <h2 className="text-xl md:text-2xl text-guardian-light/90 mb-6">The Pulse of Protection</h2>
              <p className="text-lg text-guardian-light/80 max-w-2xl mx-auto">
                A real-time visualization of global cyber threats, with tools to protect and recover from attacks.
              </p>
            </div>
            <GlobeVisualization className="mb-12" />
            <div className="max-w-4xl mx-auto text-center mb-8">
              <h2 className="text-2xl font-semibold gradient-text mb-4">Join the Guardian Network</h2>
              <p className="text-guardian-light/80 mb-6">
                Become part of a global community working together to protect digital spaces and support those affected by cyber attacks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/join" 
                  className="cyber-button px-6 py-3 inline-block"
                >
                  Become a Guardian
                </Link>
                <Link 
                  to="/guardian" 
                  className="cyber-button px-6 py-3 inline-block"
                >
                  Guardian Dashboard
                </Link>
              </div>
            </div>
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

export default Index;
