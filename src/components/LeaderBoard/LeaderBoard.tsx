// src/components/Leaderboard/Leaderboard.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, Shield, Zap, Search, Clock, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Leaderboard: React.FC = () => {
  const [guardians, setGuardians] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchGuardians = async () => {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('guardians')
        .select('*')
        .order('score', { ascending: false }); // Sort by score descending
      if (fetchError) setError(fetchError.message);
      else setGuardians(data || []);
      setLoading(false);
    };
    fetchGuardians();
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank <= 3) return <Award className="w-6 h-6 text-yellow-400" />;
    if (rank <= 10) return <Award className="w-6 h-6 text-silver-300" />;
    return <Shield className="w-6 h-6 text-cyan-400" />;
  };

  const getRankLabel = (rank: number) => {
    if (rank === 1) return 'Champion Guardian';
    if (rank <= 3) return 'Elite Guardian';
    if (rank <= 10) return 'Veteran Guardian';
    return 'Guardian';
  };

  const filteredGuardians = guardians.filter((guardian) =>
    guardian.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-guardian-dark to-gray-900 p-6 flex flex-col items-center justify-start">
      <div className="max-w-4xl w-full bg-guardian-dark/80 rounded-xl shadow-lg p-8 border border-cyan-400/20 glassmorphism animate-fade-in">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Guardian Leaderboard
            </h2>
            <p className="text-silver-300 text-sm mt-1">
              Top defenders of the digital realm—ranked by valor and skill.
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name..."
              className="w-full pl-10 pr-3 py-2 bg-guardian-dark/50 border border-cyan-400/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 text-silver-300 placeholder-silver-300/50"
            />
          </div>
        </div>

        {/* Global Threat Status */}
        <div className="mb-8 p-4 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-lg border border-cyan-400/20">
          <h3 className="text-lg font-semibold text-silver-300 mb-2">Global Threat Overview</h3>
          <div className="flex justify-between text-sm text-silver-300/80">
            <span>Active Threats: 12</span>
            <span>Guardians Online: 320</span>
            <span>Threats Neutralized Today: 45</span>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-cyan-400/20">
                <th className="p-3 text-silver-300 font-semibold">Rank</th>
                <th className="p-3 text-silver-300 font-semibold">Guardian</th>
                <th className="p-3 text-silver-300 font-semibold">Score</th>
                <th className="p-3 text-silver-300 font-semibold">Threats Stopped</th>
                <th className="p-3 text-silver-300 font-semibold">Joined</th>
                <th className="p-3 text-silver-300 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredGuardians.length > 0 ? (
                filteredGuardians.map((guardian, index) => (
                  <tr key={guardian.id} className="border-b border-cyan-400/10 hover:bg-guardian-dark/50 transition-all duration-300">
                    <td className="p-3 text-cyan-400 font-medium">{index + 1}</td>
                    <td className="p-3 flex items-center space-x-3">
                      <Avatar className="w-8 h-8 border border-cyan-400/50">
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${guardian.name}`} />
                        <AvatarFallback className="bg-gray-800 text-cyan-400">
                          {guardian.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-silver-300">{guardian.name}</span>
                    </td>
                    <td className="p-3 text-cyan-400 font-medium">{guardian.score || 0}</td>
                    <td className="p-3 text-cyan-400 font-medium">{guardian.threats_stopped || 0}</td>
                    <td className="p-3 text-silver-300/70">
                      {new Date(guardian.created_at || Date.now()).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full px-3 py-1 text-cyan-400 border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300 shadow-sm hover:shadow-glow"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-silver-300/70">
                    No guardians found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 p-4 bg-guardian-dark/50 rounded-lg border border-cyan-400/20">
          <h3 className="text-lg font-semibold text-silver-300 mb-3">Recent Guardian Activity</h3>
          <ul className="space-y-2 text-sm text-silver-300/80">
            <li><Clock className="w-4 h-4 text-cyan-400 inline mr-2" /> Guardian "Alex" neutralized a phishing threat 5 mins ago.</li>
            <li><Zap className="w-4 h-4 text-cyan-400 inline mr-2" /> Guardian "Sara" earned 50 points on a challenge 12 mins ago.</li>
            <li><Shield className="w-4 h-4 text-cyan-400 inline mr-2" /> Guardian "Mike" joined the network 1 hour ago.</li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => window.location.href = '/challenge'}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-glow"
          >
            <span>Join the Fight</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
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
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .animate-fade-in { animation: fadeIn 0.5s ease-out; }
  .animate-pulse { animation: pulse 1.5s infinite; }
  .animate-spin { animation: spin 1s linear infinite; }
  .shadow-glow { box-shadow: 0 0 15px rgba(100, 255, 218, 0.3); }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default Leaderboard;