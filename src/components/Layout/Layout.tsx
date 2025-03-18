
import React from 'react';
import Header from './Header';
import ParticleBackground from '../UI/ParticleBackground';
import Mascot from '../UI/Mascot';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const getMascotMessage = () => {
    switch (location.pathname) {
      case '/':
        return "Welcome to Guardian Sanctuary. This globe shows real-time cyber threats around the world.";
      case '/guardian':
        return "Join our Guardian Network to help protect others and earn Pulse Points.";
      case '/sanctuary':
        return "Need help recovering from a cyber attack? I'm here to guide you through the process.";
      default:
        return "Hello, I'm Sanctra. I'll help you stay protected online.";
    }
  };
  
  return (
    <div className="min-h-screen overflow-x-hidden">
      <ParticleBackground />
      
      <Header />
      
      <main className="pt-16 pb-20">
        {children}
      </main>
      
      <Mascot message={getMascotMessage()} />
    </div>
  );
};

export default Layout;
