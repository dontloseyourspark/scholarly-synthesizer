
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { DatabaseInsight } from './useInsights';

export const useInsightsFetch = (topicId: number) => {
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

  return {
    insights,
    setInsights,
    loading,
    error,
    fetchInsights
  };
};
