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

      const { data: userData, error: userError } = await supabase.auth.getUser();
      const user = userData?.user;

      if (userError || !user) {
        toast({
          title: 'Authentication required',
          description: 'Please sign in to vote on insights.',
          variant: 'destructive',
        });
        return;
      }

      console.log('User authenticated:', user.id);

      // Check if user has already voted on this insight
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
          // Same vote clicked again — remove the vote
          console.log('Removing vote');
          const { error: deleteError } = await supabase
            .from('votes')
            .delete()
            .eq('id', existingVote.id);

          if (deleteError) throw deleteError;

          toast({
            title: 'Vote removed',
            description: 'Your vote has been removed.',
          });
        } else {
          // Change vote type
          console.log(`Changing vote from ${existingVote.vote_type} to ${voteType}`);
          const { error: updateError } = await supabase
            .from('votes')
            .update({ vote_type: voteType })
            .eq('id', existingVote.id);

          if (updateError) throw updateError;

          toast({
            title: `Changed to ${voteType === 'up' ? 'Upvote' : 'Downvote'}`,
            description: 'Your vote has been updated.',
          });
        }
      } else {
        // No existing vote — insert new
        console.log('Creating new vote');
        const { error: insertError } = await supabase
          .from('votes')
          .insert({
            insight_id: insightId,
            user_id: user.id,
            vote_type: voteType,
          });

        if (insertError) throw insertError;

        toast({
          title: voteType === 'up' ? 'Upvoted' : 'Downvoted',
          description: 'Thank you for your feedback!',
        });
      }

      // Give trigger time to update insights table
      console.log('Waiting briefly to let DB trigger update vote counts');
      await new Promise((resolve) => setTimeout(resolve, 300));

      console.log('Refreshing insights to get updated counts');
      await fetchInsights(); // Will update the UI with latest vote counts

    } catch (err: any) {
      console.error('Voting error:', err);
      toast({
        title: 'Error voting',
        description: err.message || 'Failed to process your vote. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return { handleVote };
};