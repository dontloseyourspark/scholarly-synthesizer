import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { DatabaseInsight } from './useInsights';

export const useInsightVoting = (
  insights: DatabaseInsight[],
  setInsights: React.Dispatch<React.SetStateAction<DatabaseInsight[]>>,
  fetchInsights: () => Promise<void>
) => {
  const { toast } = useToast();

  const queueToast = (title: string, description?: string, variant?: 'default' | 'destructive') => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        toast({
          title,
          description,
          variant,
        });
      }, 100); // short delay for safety
    });
  };

  const handleVote = async (insightId: string, voteType: 'up' | 'down') => {
    try {
      console.log('[VOTE] Attempting:', { insightId, voteType });

      const { data: userData, error: userError } = await supabase.auth.getUser();
      const user = userData?.user;

      if (userError || !user) {
        console.warn('[VOTE] No authenticated user');
        queueToast(
          'Authentication required',
          'Please sign in to vote on insights.',
          'destructive'
        );
        return;
      }

      console.log('[VOTE] User authenticated:', user.id);

      const { data: existingVote, error: voteCheckError } = await supabase
        .from('votes')
        .select('*')
        .eq('insight_id', insightId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (voteCheckError) throw voteCheckError;

      if (existingVote) {
        if (existingVote.vote_type === voteType) {
          console.log('[VOTE] Removing existing vote');
          const { error: deleteError } = await supabase
            .from('votes')
            .delete()
            .eq('id', existingVote.id);
          if (deleteError) throw deleteError;
          queueToast('Vote removed', 'Your vote has been removed.');
        } else {
          console.log(`[VOTE] Changing vote to: ${voteType}`);
          const { error: updateError } = await supabase
            .from('votes')
            .update({ vote_type: voteType })
            .eq('id', existingVote.id);
          if (updateError) throw updateError;
          queueToast(`Changed to ${voteType === 'up' ? 'Upvote' : 'Downvote'}`, 'Your vote has been updated.');
        }
      } else {
        console.log('[VOTE] Creating new vote');
        const { error: insertError } = await supabase.from('votes').insert({
          insight_id: insightId,
          user_id: user.id,
          vote_type: voteType,
        });
        if (insertError) throw insertError;
        queueToast(voteType === 'up' ? 'Upvoted' : 'Downvoted', 'Thanks for your feedback!');
      }

      // Wait a bit before refreshing
      await new Promise((resolve) => setTimeout(resolve, 300));
      console.log('[VOTE] Fetching updated insights...');
      await fetchInsights();

    } catch (err: any) {
      console.error('[VOTE ERROR]', err);
      queueToast('Error voting', err.message || 'Something went wrong.', 'destructive');
    }
  };

  return { handleVote };
};
