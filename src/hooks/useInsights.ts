
import { useEffect } from 'react';
import { useInsightsFetch } from './useInsightsFetch';
import { useInsightVoting } from './useInsightVoting';

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
  currentUserVote?: 'up' | 'down' | null; // NEW: track the user's vote (may be null)
};

export const useInsights = (topicId: number) => {
  const {
    insights,
    setInsights,
    loading,
    error,
    fetchInsights
  } = useInsightsFetch(topicId);

  const { handleVote } = useInsightVoting(insights, setInsights, fetchInsights);

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
