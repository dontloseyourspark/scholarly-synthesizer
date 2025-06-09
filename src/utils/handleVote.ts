// handleVote.ts
import { Insight } from '@/data/insightsData';

/**
 * Returns a new array of insights with the vote updated.
 */
export function handleVote(
  insightId: string,
  voteType: 'up' | 'down',
  insights: Insight[]
): Insight[] {
  return insights.map((insight) =>
    insight.id === insightId
      ? {
          ...insight,
          votes:
            voteType === 'up'
              ? insight.votes + 1
              : insight.votes > 0
              ? insight.votes - 1
              : 0,
        }
      : insight
  );
}
