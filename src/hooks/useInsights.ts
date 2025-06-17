import { useEffect } from 'react';
import { useInsightsFetch } from './useInsightsFetch';
import { useInsightVoting } from './useInsightVoting';
import { supabase } from '@/integrations/supabase/client';

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
  currentUserVote?: 'up' | 'down' | null;
  verification_status?: string;
};

export const useInsights = (topicId: number) => {
  const {
    insights,
    setInsights,
    loading,
    error,
    fetchInsights
  } = useInsightsFetch();

  const { handleVote } = useInsightVoting(insights, setInsights, () => fetchInsights(topicId));

  const addInsight = async (payload: {
    content: string,
    position: 'support' | 'neutral' | 'against',
    confidence: number,
    scholar_id: string,
    topic_id: number,
  }) => {
    return await supabase.from("insights").insert({
      ...payload,
      verification_status: "pending"
    });
  };

  useEffect(() => {
    if (topicId) fetchInsights(topicId);
  }, [topicId]);

  return {
    insights,
    loading,
    error,
    handleVote,
    refetch: () => fetchInsights(topicId),
    addInsight
  };
};
