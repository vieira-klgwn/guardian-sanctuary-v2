// integrations/supabase/client.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://musqwfamtlcflnfucqwy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11c3F3ZmFtdGxjZmxuZnVjcXd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyODU3MDgsImV4cCI6MjA1Nzg2MTcwOH0.Vx2zAO1Bviv3n428KsiyzqSIqj5UZB1j8WE84vrqOAI";

// Create Supabase client
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Utility function to get the current user session
export const getUserSession = async () => {
  const { data: session, error } = await supabase.auth.getSession();
  if (error) console.error('Error getting session:', error.message);
  return session;
};

// Utility function to get the current user
export const getCurrentUser = async () => {
  const { data: user, error } = await supabase.auth.getUser();
  if (error) console.error('Error getting user:', error.message);
  return user.user;
};