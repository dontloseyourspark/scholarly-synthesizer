
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

      // Check if votes table exists and user has already voted
      const { data: existingVote, error: voteCheckError } = await supabase
        .from('votes')
        .select('*')
        .eq('insight_id', insightId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (voteCheckError) {
        console.error('Error checking existing vote:', voteCheckError);
        // If votes table doesn't exist, let's update the insight directly
        const currentInsight = insights.find(i => i.id === insightId);
        if (!currentInsight) return;

        const updateField = voteType === 'up' ? 'upvotes' : 'downvotes';
        const newValue = voteType === 'up' 
          ? currentInsight.upvotes + 1 
          : currentInsight.downvotes + 1;

        const { error: updateError } = await supabase
          .from('insights')
          .update({ [updateField]: newValue })
          .eq('id', insightId);

        if (updateError) {
          console.error('Error updating insight votes:', updateError);
          throw updateError;
        }

        // Update local state
        setInsights(prev => prev.map(insight => 
          insight.id === insightId 
            ? { 
                ...insight, 
                [updateField]: newValue
              }
            : insight
        ));

        toast({
          title: `Voted ${voteType}`,
          description: "Thank you for your feedback!",
        });
        return;
      }

      if (existingVote) {
        // Update existing vote
        const { error } = await supabase
          .from('votes')
          .update({ vote_type: voteType })
          .eq('id', existingVote.id);

        if (error) throw error;
      } else {
        // Create new vote
        const { error } = await supabase
          .from('votes')
          .insert({
            insight_id: insightId,
            user_id: user.id,
            vote_type: voteType
          });

        if (error) throw error;
      }

      // Refresh insights to get updated vote counts
      await fetchInsights();

      toast({
        title: `Voted ${voteType}`,
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
