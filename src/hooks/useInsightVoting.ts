import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { DatabaseInsight } from './useInsights';

export const useInsightVoting = (
  insights: DatabaseInsight[],
  setInsights: React.Dispatch<React.SetStateAction<DatabaseInsight[]>>,
  refetch: () => void
) => {
  const { user } = useAuth();

  const handleVote = useCallback(
    async (insightId: string, voteType: 'up' | 'down') => {
      if (!user) {
        console.warn('User must be logged in to vote.');
        return;
      }

      const insight = insights.find(i => i.id === insightId);
      if (!insight) return;

      const existingVote = insight.currentUserVote;

      // Remove vote if same as existing (toggle)
      if (existingVote === voteType) {
        //console.log('[VOTE] Removing existing vote');
        await supabase
          .from('votes')
          .delete()
          .eq('insight_id', insightId)
          .eq('user_id', user.id);
      } else {
        if (existingVote) {
          //console.log('[VOTE] Changing vote');
          await supabase
            .from('votes')
            .delete()
            .eq('insight_id', insightId)
            .eq('user_id', user.id);
        }

        //console.log('[VOTE] Creating new vote');
        await supabase.from('votes').insert({
          user_id: user.id,
          insight_id: insightId,
          vote_type: voteType
        });
      }

      //console.log('[VOTE] Refetching updated insights...');
      refetch(); // Re-fetch to update the vote counts and currentUserVote
    },
    [insights, user, refetch]
  );

  return { handleVote };
};
