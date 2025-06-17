import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { DatabaseInsight } from './useInsights';

function isValidVoteType(value: string): value is 'up' | 'down' {
  return value === 'up' || value === 'down';
}

export const useInsightsFetch = (topicId: number) => {
  const [insights, setInsights] = useState<DatabaseInsight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from('insights')
      .select(`
        *,
        scholar:scholar_id (id, name, title, institution, avatar_url),
        insight_sources (
          id,
          insight_id,
          source_id,
          created_at,
          source: sources (
            id,
            title,
            authors,
            publication,
            year,
            url,
            doi
          )
        ), 
        votes:votes!votes_insight_id_fkey (
          user_id,
          vote_type
        )
      `)
      .eq('topic_id', topicId);

    if (error) {
      setError('Error loading insights: ' + error.message);
      setLoading(false);
      return;
    }

    const mappedInsights = (data || []).map((insight): DatabaseInsight => {
      const votes = insight.votes || [];

      const upvotes = votes.filter(v => v.vote_type === 'up').length;
      const downvotes = votes.filter(v => v.vote_type === 'down').length;
      const userVote = votes.find(v => v.user_id === user?.id);

      const validPositions = ['support', 'neutral', 'against'] as const;
      type Position = typeof validPositions[number];

      const safePosition: Position = validPositions.includes(insight.position as Position)
        ? (insight.position as Position)
        : 'neutral';

      return {
        id: insight.id,
        content: insight.content,
        position: safePosition,
        confidence: insight.confidence,
        created_at: insight.created_at,
        updated_at: insight.updated_at,
        scholar: insight.scholar,
        upvotes,
        downvotes,
        currentUserVote: isValidVoteType(userVote?.vote_type) ? userVote.vote_type : undefined,
        sources: insight.insight_sources.map(insightSource => insightSource.source),
        verification_status: insight.verification_status,
      };
    });

    setInsights(mappedInsights);
    setLoading(false);
  };

  // ✅ useEffect correctly placed here
  useEffect(() => {
    if (topicId) {
      fetchInsights();
    }
  }, [topicId]);

  return {
    insights,
    setInsights,
    loading,
    error,
    fetchInsights,
  };
};
