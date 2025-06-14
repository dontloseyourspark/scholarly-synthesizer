
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type TopicStats = {
  topicId: number;
  contributorsCount: number;
  sourcesCount: number;
};

export const useTopicStats = (topicId: number | null) => {
  const [stats, setStats] = useState<TopicStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchStats = async () => {
    if (!topicId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Get contributors count from insights table
      const { data: contributorsData, error: contributorsError } = await supabase
        .from('insights')
        .select('scholar_id')
        .eq('topic_id', topicId);

      if (contributorsError) throw contributorsError;

      // Count unique contributors
      const uniqueContributors = new Set(
        contributorsData
          ?.map(insight => insight.scholar_id)
          .filter(id => id !== null)
      ).size;

      // Get sources count from topic_publications table
      const { data: sourcesData, error: sourcesError } = await supabase
        .from('topic_publications')
        .select('id')
        .eq('topic_id', topicId);

      if (sourcesError) throw sourcesError;

      setStats({
        topicId,
        contributorsCount: uniqueContributors,
        sourcesCount: sourcesData?.length || 0
      });
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error fetching topic statistics",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [topicId]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
};
