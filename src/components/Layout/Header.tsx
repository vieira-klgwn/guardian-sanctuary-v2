// src/components/Header.tsx
import React, { useState } from 'react';
import { useAnimatedMount } from '@/utils/animations';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Globe, User, HeartPulse, Menu, X, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  user?: any;
  handleLogout: () => void;
  navigate: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ user, handleLogout, navigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mounted = useAnimatedMount();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      } glassmorphism shadow-sm`}
      style={{
        backdropFilter: 'blur(15px)',
        backgroundColor: 'rgba(10, 25, 47, 0.6)',
        borderBottom: '1px solid rgba(100, 255, 218, 0.1)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-600/30 rounded-full animate-pulse-glow transition-all duration-300 group-hover:scale-110"></div>
                <Shield className="w-6 h-6 text-cyan-400 relative z-10" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                  Guardian Sanctuary
                </h1>
                <p className="text-xs text-silver-300">The Pulse of Protection</p>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-4">
              <NavLink id="header-global-pulse" to="/global-pulse" icon={<Globe className="w-5 h-5" />} label="Global Pulse" />
              <NavLink id="header-guardian-network" to="/guardian" icon={<User className="w-5 h-5" />} label="Guardian Network" />
              <NavLink id="header-sanctuary" to="/sanctuary" icon={<HeartPulse className="w-5 h-5" />} label="Sanctuary" />
            </nav>
            <div className="flex items-center space-x-3">
              {!user ? (
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full px-4 py-2 text-cyan-400 border-cyan-400/50 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 shadow-sm hover:shadow-glow"
                  >
                    <Link to="/register">Sign Up</Link>
                  </Button>
                  <Button
                    asChild
                    className="rounded-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-sm hover:shadow-glow"
                  >
                    <Link to="/login">Login</Link>
                  </Button>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <Avatar
                    onClick={() => navigate('/profile')}
                    className="cursor-pointer hover:opacity-90 transition-all duration-300 rounded-full border-2 border-cyan-400/50"
                  >
                    <AvatarImage
                      src={user.user_metadata?.avatar_url || `https://api.dicebear.com/6.x/initials/svg?seed=${user.user_metadata?.name || user.email}`}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-gray-800 to-gray-900 text-cyan-400">
                      {user.user_metadata?.name?.charAt(0) || user.email.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="rounded-full px-3 py-1.5 text-silver-300 border-silver-300/50 hover:bg-silver-300/10 hover:border-silver-300 transition-all duration-300 shadow-sm hover:shadow-glow"
                  >
                    <LogOut className="w-4 h-4 mr-1" /> Logout
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="rounded-full px-3 py-1.5 text-cyan-400 border-cyan-400/50 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 shadow-sm hover:shadow-glow"
                  >
                    <Link to="/challenge">Challenge</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <Button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-silver-300 hover:bg-cyan-400/10 transition-all duration-300 shadow-sm hover:shadow-glow"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden glassmorphism border-t border-cyan-400/20">
            <div className="flex flex-col px-4 py-4 space-y-2">
              <MobileNavLink id="header-global-pulse-mobile" to="/global-pulse" icon={<Globe className="w-5 h-5" />} label="Global Pulse" onClick={() => setMobileMenuOpen(false)} />
              <MobileNavLink id="header-guardian-network-mobile" to="/guardian" icon={<User className="w-5 h-5" />} label="Guardian Network" onClick={() => setMobileMenuOpen(false)} />
              <MobileNavLink id="header-sanctuary-mobile" to="/sanctuary" icon={<HeartPulse className="w-5 h-5" />} label="Sanctuary" onClick={() => setMobileMenuOpen(false)} />
              {!user ? (
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full mt-2 rounded-full px-4 py-2 text-cyan-400 border-cyan-400/50 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 shadow-sm hover:shadow-glow"
                  >
                    <Link to="/register" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full mt-2 rounded-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-sm hover:shadow-glow"
                  >
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 mt-2">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-full px-4 py-2 text-cyan-400 border-cyan-400/50 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 shadow-sm hover:shadow-glow"
                  >
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="w-full rounded-full px-3 py-1.5 text-silver-300 border-silver-300/50 hover:bg-silver-300/10 hover:border-silver-300 transition-all duration-300 shadow-sm hover:shadow-glow"
                  >
                    <LogOut className="w-4 h-4 mr-1" /> Logout
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full rounded-full px-3 py-1.5 text-cyan-400 border-cyan-400/50 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 shadow-sm hover:shadow-glow"
                  >
                    <Link to="/challenge" onClick={() => setMobileMenuOpen(false)}>Challenge</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

interface NavLinkProps {
  id?: string;
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ id, to, icon, label }) => {
  return (
    <Link
      id={id}
      to={to}
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-silver-300 hover:bg-cyan-400/10 hover:text-cyan-400 transition-all duration-300 shadow-sm hover:shadow-glow"
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ id, to, icon, label, onClick }) => {
  return (
    <Link
      id={id}
      to={to}
      className="flex items-center gap-2 p-2 rounded-lg text-silver-300 hover:bg-cyan-400/10 hover:text-cyan-400 transition-all duration-300 shadow-sm hover:shadow-glow"
      onClick={onClick}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const styles = `
  @keyframes pulseGlow {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-pulse-glow { animation: pulseGlow 2s infinite ease-in-out; }
  .shadow-glow { box-shadow: 0 0 15px rgba(100, 255, 218, 0.3); }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default Header;