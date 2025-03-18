
import React, { useState } from 'react';
import { useAnimatedMount } from '@/utils/animations';
import { Link } from 'react-router-dom';
import { Shield, Globe, User, HeartPulse, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mounted = useAnimatedMount();
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-guardian-cyan/20 rounded-lg animate-pulse-glow"></div>
                <Shield className="w-6 h-6 text-guardian-cyan relative z-10" />
              </div>
              <div>
                <h1 className="text-lg font-semibold gradient-text">Guardian Sanctuary</h1>
                <p className="text-xs text-guardian-light/70">The Pulse of Protection</p>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" icon={<Globe className="w-4 h-4" />} label="Global Pulse" />
            <NavLink to="/guardian" icon={<User className="w-4 h-4" />} label="Guardian Network" />
            <NavLink to="/sanctuary" icon={<HeartPulse className="w-4 h-4" />} label="Sanctuary" />
            <button className="cyber-button">
            <NavLink to="/join" icon={<HeartPulse className="w-1 h-1" />} label="Join The Network" />
            </button>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-guardian-light hover:bg-guardian-dark transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden glassmorphism border-t border-guardian-dark">
          <div className="flex flex-col px-4 py-3 space-y-3">
            <MobileNavLink to="/" icon={<Globe className="w-4 h-4" />} label="Global Pulse" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink to="/guardian" icon={<User className="w-4 h-4" />} label="Guardian Network" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink to="/sanctuary" icon={<HeartPulse className="w-4 h-4" />} label="Sanctuary" onClick={() => setMobileMenuOpen(false)} />
            <button className="w-full cyber-button mt-2">
              Join the Network
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label }) => {
  return (
    <Link 
      to={to} 
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-guardian-light transition-colors hover:bg-guardian-dark hover:text-guardian-cyan"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, icon, label, onClick }) => {
  return (
    <Link 
      to={to} 
      className="flex items-center gap-2 p-2 rounded-md text-guardian-light transition-colors hover:bg-guardian-dark hover:text-guardian-cyan"
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default Header;
