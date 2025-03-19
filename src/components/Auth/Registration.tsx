// src/components/Auth/Register.tsx
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import { Button } from '../ui/button';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });

      if (authError) throw authError;

      const user = data.user;
      if (user) {
        const { error: insertError } = await supabase.from('guardians').insert({
          email,
          name,
          user_id: user.id,
          score: 0,
          threats_stopped: 0,
        });

        if (insertError) throw insertError;
      }

      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-guardian-dark to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-guardian-dark/80 rounded-xl shadow-lg p-8 border border-guardian-cyan/20 glassmorphism animate-fade-in">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent text-center">
          Register as a Guardian
        </h2>
        {success && (
          <p className="text-green-400 text-sm mb-4 text-center animate-pulse">
            Registration successful! Check your email to verify. Redirecting...
          </p>
        )}
        {error && (
          <p className="text-red-400 text-sm mb-4 text-center animate-pulse">
            {error}
          </p>
        )}
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="relative">
            <label htmlFor="name" className="block text-sm font-medium text-guardian-light/70 mb-2">
              Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-guardian-dark/50 border border-guardian-cyan/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 placeholder-guardian-light/50"
                placeholder="Enter your name"
                required
              />
            </div>
          </div>
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-guardian-light/70 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-guardian-dark/50 border border-guardian-cyan/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 placeholder-guardian-light/50"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-guardian-light/70 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-guardian-dark/50 border border-guardian-cyan/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 placeholder-guardian-light/50"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full py-3 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Register
          </Button>
          <p className="text-center text-sm text-guardian-light/70">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

// Animation keyframes
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
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default Register;