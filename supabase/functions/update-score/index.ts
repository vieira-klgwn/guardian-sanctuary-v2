// supabase/functions/update-score/index.ts
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: any, res: any) {
  const supabase = createClient(
    "https://musqwfamtlcflnfucqwy.sASE_URL",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11c3F3ZmFtdGxjZmxuZnVjcXd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyODU3MDgsImV4cCI6MjA1Nzg2MTcwOH0.Vx2zAO1Bviv3n428KsiyzqSIqj5UZB1j8WE84vrqOAI"
  );

  const { userId, points } = req.body;

  const { data, error } = await supabase
    .from('guardians')
    .select('score')
    .eq('user_id', userId)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const newScore = (data.score || 0) + points;

  const { error: updateError } = await supabase
    .from('guardians')
    .update({ score: newScore })
    .eq('user_id', userId);

  if (updateError) {
    return res.status(500).json({ error: updateError.message });
  }

  return res.status(200).json({ newScore });
}