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

      // Fetch ONLY "verified" insights for regular users (admins see all in moderation panel)
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
        .eq('verification_status', 'verified')
        .order('created_at', { ascending: false });

      if (insightsError) throw insightsError;

      console.log('[INSIGHTS] Raw from DB:', insightsData);

      // Fetch sources and (if logged in) the current user's vote for each insight
      const insightsWithSources = await Promise.all(
        (insightsData || []).map(async (insight) => {
          // Immediately log vote numbers from the DB
          console.log('[INSIGHT]', insight.id, 'upvotes:', insight.upvotes, 'downvotes:', insight.downvotes);

          // Fetch sources
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

            // Only set if value is "up" or "down"!
            if (voteRow?.vote_type === 'up' || voteRow?.vote_type === 'down') {
              currentUserVote = voteRow.vote_type;
            } else {
              currentUserVote = null;
            }
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

      console.log('[INSIGHTS] To be set in state:', insightsWithSources);

      setInsights(insightsWithSources); // this ensures latest from DB always overrides state
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
