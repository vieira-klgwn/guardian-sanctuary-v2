// src/App.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { supabase, getUserSession } from "@/integrations/supabase/client";
import Layout from "./components/Layout/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GuardianDashboard from "./components/Guardian/GuardianDashboard";
import SanctuaryToolkit from "./components/Sanctuary/SanctuaryToolkit";
import GuardianForm from "./components/Guardian/GuardianForm";
import GlobeVisualization from "./components/Globe/GlobeVisualization";
import Register from "@/components/Auth/Registration";
import Login from "@/components/Auth/Login";
import Profile from "@/components/Profile/Profile";
import Challenge from "@/components/Challenges/Challenge";
import Leaderboard from "@/components/LeaderBoard/LeaderBoard";

const queryClient = new QueryClient();

export const UserContext = React.createContext<any>(null);

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getUserSession();
      setUser(session?.session?.user ?? null);
      setLoading(false);
    };
    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-guardian-dark to-gray-900 flex items-center justify-center">
        <div className="text-silver-300 flex items-center space-x-3">
          <div className="w-8 h-8 border-2 border-t-transparent border-cyan-400 rounded-full animate-spin"></div>
          <span>Loading Sanctuary...</span>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <UserContext.Provider value={user}>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/global-pulse" element={<GlobeVisualization />} />
                <Route path="/guardian" element={<GuardianDashboard />} />
                <Route path="/sanctuary" element={<SanctuaryToolkit />} />
                <Route path="/join" element={<GuardianForm />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route
                  path="/profile"
                  element={user ? <Profile /> : <Navigate to="/login" />}
                />
                <Route
                  path="/challenge"
                  element={user ? <Challenge /> : <Navigate to="/login" />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </UserContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;