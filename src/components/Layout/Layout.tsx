// src/components/Layout/Layout.tsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { UserContext } from '../../App';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';
import Header from './Header'; // Import the Header component

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error logging out:', error.message);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-guardian-dark to-gray-900 text-guardian-light">
      {/* Header */}
      <Header user={user} handleLogout={handleLogout} navigate={navigate} />

      {/* Main Content */}
      <main className="pt-20 p-6">{children}</main> {/* Increased pt-20 to account for header height */}

      {/* Footer */}
      <footer className="bg-guardian-dark/80 border-t border-guardian-cyan/20 p-6 text-center text-sm shadow-inner rounded-t-lg">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
          <Button asChild variant="outline" className="rounded-full px-4 py-2 text-cyan-400 border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300">
            <Link to="/join">Join the Network</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full px-4 py-2 text-cyan-400 border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300">
            <Link to="/leaderboard">View Leaderboard</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full px-4 py-2 text-cyan-400 border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300">
            <Link to="/challenge">Start Challenge</Link>
          </Button>
        </div>
        <p className="text-guardian-light/70">© 2025 Guardian Sanctuary | All rights reserved</p>
      </footer>
    </div>
  );
};

export default Layout;