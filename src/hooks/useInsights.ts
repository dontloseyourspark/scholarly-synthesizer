
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type DatabaseInsight = {
  id: string;
  content: string;
  position: 'support' | 'neutral' | 'against';
  confidence: number | null;
  upvotes: number;
  downvotes: number;
  created_at: string;
  updated_at: string;
  scholar: {
    id: string;
    name: string;
    title: string | null;
    institution: string | null;
    avatar_url: string | null;
  };
  sources: Array<{
    id: number;
    title: string | null;
    authors: string | null;
    publication: string | null;
    year: number | null;
    url: string | null;
    doi: string | null;
  }>;
};

export const useInsights = (topicId: number) => {
  const [insights, setInsights] = useState<DatabaseInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchInsights = async () => {
    try {
      setLoading(true);
      
      // Fetch insights with scholars
      const { data: insightsData, error: insightsError } = await supabase
        .from('insights')
        .select(`
          *,
          scholars (
            id,
            name,
            title,
            institution,
            avatar_url
          )
        `)
        .eq('topic_id', topicId)
        .order('created_at', { ascending: false });

      if (insightsError) throw insightsError;

      // Fetch sources for each insight
      const insightsWithSources = await Promise.all(
        (insightsData || []).map(async (insight) => {
          const { data: sourcesData, error: sourcesError } = await supabase
            .from('insight_sources')
            .select(`
              sources (
                id,
                title,
                authors,
                publication,
                year,
                url,
                doi
              )
            `)
            .eq('insight_id', insight.id);

          if (sourcesError) {
            console.error('Error fetching sources:', sourcesError);
            return {
              ...insight,
              scholar: insight.scholars,
              sources: [],
              upvotes: insight.upvotes || 0,
              downvotes: insight.downvotes || 0,
              position: insight.position as 'support' | 'neutral' | 'against'
            };
          }

          return {
            ...insight,
            scholar: insight.scholars,
            sources: sourcesData?.map(item => item.sources).filter(Boolean) || [],
            upvotes: insight.upvotes || 0,
            downvotes: insight.downvotes || 0,
            position: insight.position as 'support' | 'neutral' | 'against'
          };
        })
      );

      setInsights(insightsWithSources);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error fetching insights",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchInsights();
  }, [topicId]);

  return {
    insights,
    loading,
    error,
    handleVote,
    refetch: fetchInsights
  };
};
