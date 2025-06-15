
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { DatabaseInsight } from './useInsights';
import { useAuth } from '@/contexts/AuthContext';

export const useInsightsFetch = (topicId: number) => {
  const [insights, setInsights] = useState<DatabaseInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Import the user so we can fetch user's vote
  let userId: string | null = null;
  try {
    // Will be null for non-auth users
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user } = useAuth();
    userId = user?.id ?? null;
  } catch {
    // useAuth must be used inside a React component; we'll check below
  }

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

      // Fetch sources and (if logged in) the current user's vote for each insight
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

          // If logged in, fetch the current user's vote for this insight
          let currentUserVote: 'up' | 'down' | null = null;
          if (userId) {
            const { data: voteRow } = await supabase
              .from('votes')
              .select('vote_type')
              .eq('insight_id', insight.id)
              .eq('user_id', userId)
              .maybeSingle();

            currentUserVote = voteRow?.vote_type ?? null;
          }

          return {
            ...insight,
            scholar: insight.scholars,
            sources: sourcesData?.map(item => item.sources).filter(Boolean) || [],
            upvotes: insight.upvotes || 0,
            downvotes: insight.downvotes || 0,
            position: insight.position as 'support' | 'neutral' | 'against',
            currentUserVote, // our new field
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

  return {
    insights,
    setInsights,
    loading,
    error,
    fetchInsights
  };
};
