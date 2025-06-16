import { supabase } from '@/integrations/supabase/client';

export const voteOnInsight = async (insightId: string, voteType: 'up' | 'down') => {
  const res = await fetch(`/api/insights/${insightId}/vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ voteType }),
  });

  if (!res.ok) {
    throw new Error('Failed to vote on insight');
  }

  return res.json();
};



export const updateInsightVotes = async (insightId: string) => {
  const { data: votes, error } = await supabase
    .from('votes')
    .select('vote_type')
    .eq('insight_id', insightId);

  if (error) throw new Error('Failed to fetch votes');

  const upvotes = votes.filter(v => v.vote_type === 'up').length;
  const downvotes = votes.filter(v => v.vote_type === 'down').length;

  const { error: updateError } = await supabase
    .from('insights')
    .update({ upvotes, downvotes })
    .eq('id', insightId);

  if (updateError) throw new Error('Failed to update insight votes');
};
