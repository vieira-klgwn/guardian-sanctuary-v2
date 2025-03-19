// src/components/Profile/Profile.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Shield, Star, Zap, Award, ChevronRight } from 'lucide-react';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        setError(userError.message);
        setLoading(false);
        return;
      }

      if (userData.user) {
        const { data, error: fetchError } = await supabase
          .from('guardians')
          .select('*')
          .eq('user_id', userData.user.id)
          .single();
        if (fetchError) setError(fetchError.message);
        else setProfile(data);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const getRank = (score: number) => {
    if (score >= 200) return { rank: 'Gold Guardian', nextThreshold: 500, icon: <Award className="w-6 h-6 text-yellow-400" /> };
    if (score >= 100) return { rank: 'Silver Guardian', nextThreshold: 200, icon: <Award className="w-6 h-6 text-silver-300" /> };
    if (score >= 50) return { rank: 'Bronze Guardian', nextThreshold: 100, icon: <Award className="w-6 h-6 text-orange-400" /> };
    return { rank: 'Novice Guardian', nextThreshold: 50, icon: <Award className="w-6 h-6 text-gray-500" /> };
  };

  const getProgress = (score: number, nextThreshold: number) => {
    return Math.min((score / nextThreshold) * 100, 100);
  };

  const getMotivationalQuote = () => {
    const quotes = [
      "Protect the digital frontier—your vigilance saves lives.",
      "Every threat stopped is a victory for humanity.",
      "Guardians like you are the shield of the future.",
      "Stay sharp, stay strong—the network depends on you.",
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-guardian-dark to-gray-900 flex items-center justify-center">
        <div className="flex items-center space-x-3 text-silver-300">
          <div className="w-8 h-8 border-2 border-t-transparent border-cyan-400 rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-guardian-dark to-gray-900 flex items-center justify-center">
        <div className="text-red-400 text-center animate-pulse">{error}</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-guardian-dark to-gray-900 flex items-center justify-center">
        <div className="text-silver-300 text-center">No profile found.</div>
      </div>
    );
  }

  const { rank, nextThreshold, icon: rankIcon } = getRank(profile.score || 0);
  const progress = getProgress(profile.score || 0, nextThreshold);

  return (
    <div className="min-h-screen bg-gradient-to-br from-guardian-dark to-gray-900 p-6 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full bg-guardian-dark/80 rounded-xl shadow-lg p-8 border border-cyan-400/20 glassmorphism animate-fade-in">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16 border-2 border-cyan-400/50 shadow-glow">
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${profile.name || profile.email}`}
              />
              <AvatarFallback className="bg-gradient-to-br from-gray-800 to-gray-900 text-cyan-400">
                {profile.name?.charAt(0) || profile.email?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                {profile.name}
              </h2>
              <p className="text-silver-300 text-sm">{profile.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {rankIcon}
            <span className="text-silver-300 text-sm font-medium">{rank}</span>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="p-4 bg-guardian-dark/50 rounded-lg border border-cyan-400/20 shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-silver-300">Score</h3>
            </div>
            <p className="text-2xl font-bold text-cyan-400">{profile.score || 0} points</p>
          </div>
          <div className="p-4 bg-guardian-dark/50 rounded-lg border border-cyan-400/20 shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-silver-300">Threats Stopped</h3>
            </div>
            <p className="text-2xl font-bold text-cyan-400">{profile.threats_stopped || 0}</p>
          </div>
        </div>

        {/* Progress to Next Rank */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-silver-300 mb-3">Progress to Next Rank</h3>
          <div className="relative w-full h-3 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-blue-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-silver-300 mt-2">
            {profile.score || 0} / {nextThreshold} points to reach {rank === 'Gold Guardian' ? 'Platinum Guardian' : rank === 'Silver Guardian' ? 'Gold Guardian' : 'Silver Guardian'}
          </p>
        </div>

        {/* Achievements Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-silver-300 mb-4">Achievements</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.score >= 50 && (
              <div className="flex items-center space-x-3 p-3 bg-guardian-dark/50 rounded-lg border border-orange-400/20">
                <Award className="w-6 h-6 text-orange-400" />
                <span className="text-sm text-silver-300">Bronze Guardian</span>
              </div>
            )}
            {profile.score >= 100 && (
              <div className="flex items-center space-x-3 p-3 bg-guardian-dark/50 rounded-lg border border-silver-300/20">
                <Award className="w-6 h-6 text-silver-300" />
                <span className="text-sm text-silver-300">Silver Guardian</span>
              </div>
            )}
            {profile.score >= 200 && (
              <div className="flex items-center space-x-3 p-3 bg-guardian-dark/50 rounded-lg border border-yellow-400/20">
                <Award className="w-6 h-6 text-yellow-400" />
                <span className="text-sm text-silver-300">Gold Guardian</span>
              </div>
            )}
            {profile.threats_stopped >= 10 && (
              <div className="flex items-center space-x-3 p-3 bg-guardian-dark/50 rounded-lg border border-cyan-400/20">
                <Zap className="w-6 h-6 text-cyan-400" />
                <span className="text-sm text-silver-300">Threat Slayer</span>
              </div>
            )}
            {(!profile.score || profile.score < 50) && !profile.threats_stopped && (
              <p className="text-sm text-silver-300/70 col-span-2">No achievements yet. Complete challenges to earn badges!</p>
            )}
          </div>
        </div>

        {/* Motivation Section */}
        <div className="mb-8 p-4 bg-guardian-dark/50 rounded-lg border border-cyan-400/20">
          <h3 className="text-lg font-semibold text-silver-300 mb-3">Your Motivation</h3>
          <p className="text-sm text-silver-300/80 italic">
            {profile.motivation || 'Not set. Share your drive to protect the digital world!'}
          </p>
        </div>

        {/* Motivational Quote Section */}
        <div className="p-4 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-lg border border-cyan-400/20">
          <h3 className="text-lg font-semibold text-silver-300 mb-3">Guardian’s Inspiration</h3>
          <p className="text-sm text-silver-300/80 italic">{getMotivationalQuote()}</p>
        </div>

        {/* Call to Action */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => window.location.href = '/challenge'}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-glow"
          >
            <span>Take on a Challenge</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Animation and glow keyframes
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }
  .animate-fade-in { animation: fadeIn 0.5s ease-out; }
  .animate-pulse { animation: pulse 1.5s infinite; }
  .shadow-glow { box-shadow: 0 0 15px rgba(100, 255, 218, 0.3); }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default Profile;