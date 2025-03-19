// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase, getUserSession } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GuardianDashboard from "./components/Guardian/GuardianDashboard";
import SanctuaryToolkit from "./components/Sanctuary/SanctuaryToolkit";
import GuardianForm from "./components/Guardian/GuardianForm";
import GlobeVisualization from "./components/Globe/GlobeVisualization";
import Layout from "./components/Layout/Layout";
import Register from "@/components/Auth/Registration";
import Login from "@/components/Auth/Login";
import Profile from "@/components/Profile/Profile";
import Challenge from "@/components/Challenges/Challenge";
import Leaderboard from "@/components/LeaderBoard/LeaderBoard"; // New component
import React from "react";

const queryClient = new QueryClient();

export const UserContext = React.createContext<any>(null);

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
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
    return <div className="text-guardian-light">Loading...</div>;
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
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/global-pulse" element={<GlobeVisualization />} />
                <Route path="/guardian" element={<GuardianDashboard />} />
                <Route path="/sanctuary" element={<SanctuaryToolkit />} />
                <Route path="/join" element={<GuardianForm />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/leaderboard" element={<Leaderboard />} /> {/* New route */}

                {/* Protected Routes */}
                <Route
                  path="/profile"
                  element={user ? <Profile /> : <Navigate to="/login" />}
                />
                <Route
                  path="/challenge"
                  element={user ? <Challenge /> : <Navigate to="/login" />}
                />

                {/* Not Found Route */}
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