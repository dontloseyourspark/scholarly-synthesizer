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

    // Step 1: Fetch public-safe data (no user_id in votes)
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
          vote_type
        )
      `)
      .eq('topic_id', topicId);

    if (error) {
      setError('Error loading insights: ' + error.message);
      setLoading(false);
      return;
    }

    // Step 2: Prepare mapped insights with vote counts only
    const mappedInsights: DatabaseInsight[] = (data || []).map((insight) => {
      const votes = insight.votes || [];
      const upvotes = votes.filter(v => v.vote_type === 'up').length;
      const downvotes = votes.filter(v => v.vote_type === 'down').length;

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
        currentUserVote: undefined, // temporary, filled in below if user is logged in
        sources: insight.insight_sources.map((insightSource: any) => insightSource.source),
        verification_status: insight.verification_status,
      };
    });

    // Step 3: Optionally fetch user votes if user is logged in
    if (user) {
      const { data: userVotes, error: voteError } = await supabase
        .from('votes')
        .select('insight_id, vote_type')
        .eq('user_id', user.id)
        .in('insight_id', mappedInsights.map(insight => insight.id));

      if (!voteError && userVotes) {
        const voteMap = new Map(userVotes.map(v => [v.insight_id, v.vote_type]));

        // Inject user's vote into insights
        mappedInsights.forEach(insight => {
          const vote = voteMap.get(insight.id);
          if (isValidVoteType(vote)) {
            insight.currentUserVote = vote;
          }
        });
      }
    }

    setInsights(mappedInsights);
    setLoading(false);
  };

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
