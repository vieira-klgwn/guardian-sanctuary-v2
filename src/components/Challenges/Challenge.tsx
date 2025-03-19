// src/components/Challenges/Challenge.tsx
import React, { useState, useEffect, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserContext } from '../../App';
import { AlertTriangle, Shield, Clock, MapPin, CheckCircle, XCircle } from 'lucide-react';

interface ChallengeAnswer {
  id: number;
  text: string;
  isCorrect: boolean;
}

const Challenge: React.FC = () => {
  const user = useContext(UserContext);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [challengeData, setChallengeData] = useState({
    title: "Operation Cyber Shield: Phishing Attack in Israel",
    description: "A sophisticated phishing campaign has targeted Israeli government officials, aiming to steal sensitive credentials. Intelligence reports indicate that attackers are using emails disguised as official communications. Your task is to identify the phishing email by analyzing the clues provided below.",
    clues: [
      "The email claims to be from the Ministry of Defense but uses a suspicious domain: 'mod-gov.israel-security.org'.",
      "The email contains urgent language, pressuring the recipient to click a link to 'verify their account' within 24 hours.",
      "The email signature includes a typo: 'Minstry of Defence' instead of 'Ministry of Defense'.",
      "The email was sent at 3:00 AM local time, which is unusual for official communications.",
    ],
    answers: [
      { id: 1, text: "An email from 'mod-gov.israel-security.org' with a typo in the signature.", isCorrect: true },
      { id: 2, text: "An email from 'defense.gov.il' with a professional signature.", isCorrect: false },
      { id: 3, text: "An email from 'support@mod.gov.il' sent during business hours.", isCorrect: false },
      { id: 4, text: "An email from 'admin@israel.gov' with a secure link.", isCorrect: false },
    ],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAnswer === null) {
      setResult('Please select an answer to proceed.');
      return;
    }

    setIsSubmitting(true);
    setResult(null);

    const chosenAnswer = challengeData.answers.find((answer) => answer.id === selectedAnswer);
    if (!chosenAnswer) return;

    if (chosenAnswer.isCorrect) {
      setResult('Threat Identified! +50 points earned for neutralizing the phishing attack.');
      if (user) {
        const { data: currentData, error: fetchError } = await supabase
          .from('guardians')
          .select('score')
          .eq('user_id', user.id)
          .single();

        if (fetchError) {
          console.error('Error fetching score:', fetchError.message);
          setResult('Correct, but failed to update score. Try again later.');
        } else {
          const currentScore = currentData.score || 0;
          const { error: updateError } = await supabase
            .from('guardians')
            .update({ score: currentScore + 50 })
            .eq('user_id', user.id);

          if (updateError) {
            console.error('Error updating score:', updateError.message);
            setResult('Correct, but failed to update score. Try again later.');
          }
        }
      }
    } else {
      setResult('Incorrect. This email is not the phishing attempt. Review the clues and try again.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-guardian-dark to-gray-900 p-6 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full bg-guardian-dark/80 rounded-xl shadow-lg p-8 border border-guardian-cyan/20 glassmorphism animate-fade-in">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8 text-orange-500" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              {challengeData.title}
            </h2>
          </div>
          <div className="flex items-center space-x-2 text-guardian-light/70">
            <Clock className="w-5 h-5 text-cyan-400" />
            <span className="text-sm">Time-Sensitive</span>
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-6">
          <p className="text-guardian-light/80 text-base leading-relaxed">
            {challengeData.description}
          </p>
          <div className="flex items-center space-x-2 mt-4 text-guardian-light/70">
            <MapPin className="w-5 h-5 text-cyan-400" />
            <span className="text-sm">Location: Israel</span>
            <Shield className="w-5 h-5 text-cyan-400 ml-4" />
            <span className="text-sm">Threat Level: Critical</span>
          </div>
        </div>

        {/* Clues Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-guardian-light mb-4">Intelligence Clues</h3>
          <ul className="space-y-3">
            {challengeData.clues.map((clue, index) => (
              <li key={index} className="flex items-start space-x-2 text-guardian-light/70">
                <span className="text-cyan-400">•</span>
                <span className="text-sm">{clue}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Challenge Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-guardian-light mb-4">Identify the Phishing Email</h3>
            <div className="grid gap-3">
              {challengeData.answers.map((answer) => (
                <button
                  key={answer.id}
                  type="button"
                  onClick={() => setSelectedAnswer(answer.id)}
                  className={`w-full p-4 rounded-lg border text-left transition-all duration-300 ${
                    selectedAnswer === answer.id
                      ? 'border-cyan-400 bg-cyan-400/10'
                      : 'border-guardian-cyan/20 hover:bg-guardian-dark/50 hover:border-cyan-400'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                >
                  <span className="text-guardian-light/80">{answer.text}</span>
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting || selectedAnswer === null}
            className={`w-full py-3 rounded-full text-white transition-all duration-300 shadow-md hover:shadow-lg ${
              isSubmitting || selectedAnswer === null
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-cyan-500 hover:bg-cyan-600'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-t-transparent border-cyan-400 rounded-full animate-spin"></div>
                <span>Analyzing...</span>
              </span>
            ) : (
              'Submit Analysis'
            )}
          </button>
        </form>

        {/* Result Section */}
        {result && (
          <div className="mt-6 p-4 rounded-lg border flex items-center space-x-3 animate-pulse">
            {result.includes('Correct') ? (
              <CheckCircle className="w-6 h-6 text-green-400" />
            ) : (
              <XCircle className="w-6 h-6 text-red-400" />
            )}
            <p className={result.includes('Correct') ? 'text-green-400' : 'text-red-400'}>
              {result}
            </p>
          </div>
        )}

        {/* Additional Information Section */}
        <div className="mt-8 p-4 bg-guardian-dark/50 rounded-lg border border-guardian-cyan/20">
          <h3 className="text-lg font-semibold text-guardian-light mb-3">Guardian Briefing</h3>
          <p className="text-guardian-light/70 text-sm leading-relaxed">
            Phishing attacks like this are often the first step in a larger cyber espionage campaign. By identifying the malicious email, you’ve helped prevent unauthorized access to sensitive government systems. Stay vigilant—new threats emerge daily, and the Guardian Network relies on your expertise to protect global digital spaces.
          </p>
        </div>

        {/* Stats Section */}
        <div className="mt-6 flex justify-between items-center text-guardian-light/70">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="text-sm">Guardians Engaged: 342</span>
          </div>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <span className="text-sm">Threats Neutralized: 87</span>
          </div>
        </div>
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

export default Challenge;