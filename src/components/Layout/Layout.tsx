// src/components/Layout/Layout.tsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { UserContext } from '../../App';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, Shield, Globe, Zap, ChevronRight, Mail, Code, Lock } from 'lucide-react';
import Header from './Header';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error logging out:', error.message);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-guardian-dark via-gray-900 to-black text-guardian-light flex flex-col">
      <Header user={user} handleLogout={handleLogout} navigate={navigate} />
      <main className="flex-1 pt-24 p-6">{children}</main>
      <footer className="relative bg-guardian-dark/90 border-t border-cyan-400/30 p-8 text-center shadow-[0_-10px_30px_rgba(100,255,218,0.2)]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/metal.png')] opacity-10 animate-subtle-move"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Command Links
              </h3>
              <div className="flex flex-col gap-3">
                <Button
                  asChild
                  id="footer-join-network"
                  variant="outline"
                  className="group w-full py-3 text-cyan-400 border-cyan-400/50 rounded-md hover:bg-cyan-400/20 hover:border-cyan-400 transition-all duration-300 shadow-md hover:shadow-glow-metal"
                >
                  <Link to="/join" className="flex items-center justify-between">
                    <span>Join the Network</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
                <Button
                  asChild
                  id="footer-leaderboard"
                  variant="outline"
                  className="group w-full py-3 text-cyan-400 border-cyan-400/50 rounded-md hover:bg-cyan-400/20 hover:border-cyan-400 transition-all duration-300 shadow-md hover:shadow-glow-metal"
                >
                  <Link to="/leaderboard" className="flex items-center justify-between">
                    <span>View Leaderboard</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
                <Button
                  asChild
                  id="footer-challenge"
                  variant="outline"
                  className="group w-full py-3 text-cyan-400 border-cyan-400/50 rounded-md hover:bg-cyan-400/20 hover:border-cyan-400 transition-all duration-300 shadow-md hover:shadow-glow-metal"
                >
                  <Link to="/challenge" className="flex items-center justify-between">
                    <span>Start Challenge</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Network Pulse
              </h3>
              <div className="space-y-4 text-silver-300/80">
                <div className="flex items-center justify-center gap-3">
                  <Shield className="w-6 h-6 text-cyan-400 animate-pulse-metal" />
                  <span>Active Guardians: 35</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Globe className="w-6 h-6 text-cyan-400 animate-pulse-metal" />
                  <span>Sectors Secured: 2,000+</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Zap className="w-6 h-6 text-cyan-400 animate-pulse-metal" />
                  <span>Threats Neutralized: 1,200</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Sanctuary Hub
              </h3>
              <div className="flex flex-col gap-3 text-silver-300/80">
                <a
                  href="mailto:support@guardiansanctuary.net"
                  className="flex items-center justify-center gap-2 hover:text-cyan-400 transition-colors duration-300"
                >
                  <Mail className="w-5 h-5" />
                  <span>Contact Support</span>
                </a>
                <a
                  href="https://github.com/vieira-klgwn/guardians"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 hover:text-cyan-400 transition-colors duration-300"
                >
                  <Code className="w-5 h-5" />
                  <span>Open Source</span>
                </a>
                <Link
                  to="/terms"
                  className="flex items-center justify-center gap-2 hover:text-cyan-400 transition-colors duration-300"
                >
                  <Lock className="w-5 h-5" />
                  <span>Terms & Security</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-cyan-400/20 pt-6">
            <p className="text-sm text-silver-300/70 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              © 2025 Guardian Sanctuary | Forged for the Future
            </p>
            <p className="text-xs text-silver-300/50 mt-2">
              Made by Vieira Ntwali Isimbi | All rights reserved
            </p>
          </div>
        </div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
      </footer>
    </div>
  );
};

const styles = `
  @keyframes subtleMove {
    0% { background-position: 0 0; }
    100% { background-position: 100px 100px; }
  }
  @keyframes pulseMetal {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.05); opacity: 1; }
  }
  .animate-subtle-move { animation: subtleMove 20s infinite linear; }
  .animate-pulse-metal { animation: pulseMetal 2s infinite ease-in-out; }
  .shadow-glow-metal { box-shadow: 0 0 20px rgba(100, 255, 218, 0.4), 0 0 5px rgba(100, 255, 218, 0.2); }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default Layout;