
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

      console.log('Existing vote:', existingVote);

      if (existingVote) {
        if (existingVote.vote_type === voteType) {
          // User is clicking the same vote - remove the vote
          console.log('Removing vote');
          const { error: deleteError } = await supabase
            .from('votes')
            .delete()
            .eq('id', existingVote.id);

          if (deleteError) throw deleteError;
          
          toast({
            title: "Vote removed",
            description: "Your vote has been removed.",
          });
        } else {
          // User is changing their vote
          console.log('Changing vote from', existingVote.vote_type, 'to', voteType);
          const { error: updateError } = await supabase
            .from('votes')
            .update({ vote_type: voteType })
            .eq('id', existingVote.id);

          if (updateError) throw updateError;
          
          toast({
            title: `Changed to ${voteType === 'up' ? 'upvote' : 'downvote'}`,
            description: "Your vote has been updated.",
          });
        }
      } else {
        // Create new vote
        console.log('Creating new vote');
        const { error: insertError } = await supabase
          .from('votes')
          .insert({
            insight_id: insightId,
            user_id: user.id,
            vote_type: voteType
          });

        if (insertError) throw insertError;
        
        toast({
          title: `${voteType === 'up' ? 'Upvoted' : 'Downvoted'}`,
          description: "Thank you for your feedback!",
        });
      }

      // Refresh insights to get updated vote counts from database
      console.log('Refreshing insights to get updated counts');
      await fetchInsights(); // fetchInsights handles setInsights!

    } catch (err: any) {
      console.error('Voting error:', err);
      toast({
        title: "Error voting",
        description: err.message || "Failed to process your vote. Please try again.",
        variant: "destructive",
      });
    }
  };

  return { handleVote };
};
