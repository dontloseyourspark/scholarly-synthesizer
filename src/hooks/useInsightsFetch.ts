import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { DatabaseInsight } from './useInsights';
import { useAuth } from '@/contexts/AuthContext';

export const useInsightsFetch = () => {
  const [insights, setInsights] = useState<DatabaseInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth(); // ✅ Move hook call here — outside any function body

  const fetchInsights = async (topicId: number) => {
    try {
      setLoading(true);
      setError(null);

      const userId = user?.id ?? null;

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

      const insightsWithDetails = await Promise.all(
        (insightsData || []).map(async (insight) => {
          const { data: sourcesData } = await supabase
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

          let currentUserVote: 'up' | 'down' | null = null;
          if (userId) {
            const { data: voteRow } = await supabase
              .from('votes')
              .select('vote_type')
              .eq('insight_id', insight.id)
              .eq('user_id', userId)
              .maybeSingle();

            if (voteRow?.vote_type === 'up' || voteRow?.vote_type === 'down') {
              currentUserVote = voteRow.vote_type;
            }
          }

          return {
            ...insight,
            scholar: insight.scholars,
            sources: sourcesData?.map(item => item.sources).filter(Boolean) || [],
            upvotes: insight.upvotes || 0,
            downvotes: insight.downvotes || 0,
            position: insight.position as 'support' | 'neutral' | 'against',
            currentUserVote,
          };
        })
      );

      setInsights(insightsWithDetails);
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
    fetchInsights,
  };
};
