
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { DatabaseInsight } from './useInsights';

export const useInsightVoting = (
  insights: DatabaseInsight[],
  setInsights: React.Dispatch<React.SetStateAction<DatabaseInsight[]>>,
  fetchInsights: () => Promise<void>
) => {
  const { toast } = useToast();

  const handleVote = async (insightId: string, voteType: 'up' | 'down') => {
    try {
      console.log('Attempting to vote:', { insightId, voteType });
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to vote on insights.",
          variant: "destructive",
        });
        return;
      }

      console.log('User authenticated:', user.id);

      // Check if user has already voted
      const { data: existingVote, error: voteCheckError } = await supabase
        .from('votes')
        .select('*')
        .eq('insight_id', insightId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (voteCheckError) {
        console.error('Error checking existing vote:', voteCheckError);
        throw voteCheckError;
      }

      if (existingVote) {
        if (existingVote.vote_type === voteType) {
          // User is clicking the same vote - remove the vote
          const { error: deleteError } = await supabase
            .from('votes')
            .delete()
            .eq('id', existingVote.id);

          if (deleteError) throw deleteError;
        } else {
          // User is changing their vote
          const { error: updateError } = await supabase
            .from('votes')
            .update({ vote_type: voteType })
            .eq('id', existingVote.id);

          if (updateError) throw updateError;
        }
      } else {
        // Create new vote
        const { error: insertError } = await supabase
          .from('votes')
          .insert({
            insight_id: insightId,
            user_id: user.id,
            vote_type: voteType
          });

        if (insertError) throw insertError;
      }

      // Refresh insights to get updated vote counts from database
      await fetchInsights();

      toast({
        title: existingVote?.vote_type === voteType ? "Vote removed" : `Voted ${voteType}`,
        description: "Thank you for your feedback!",
      });
    } catch (err: any) {
      console.error('Voting error:', err);
      toast({
        title: "Error voting",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  return { handleVote };
};
