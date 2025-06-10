
import React from 'react';
import InsightCard from './InsightCard';
import EmptyState from '../common/EmptyState';
import { DatabaseInsight } from '@/hooks/useInsights';

type InsightsListProps = {
  insights: DatabaseInsight[];
  onVote: (insightId: string, voteType: 'up' | 'down') => void;
};

const InsightsList: React.FC<InsightsListProps> = ({ insights, onVote }) => {
  if (insights.length === 0) {
    return (
      <EmptyState 
        title="No insights have been contributed for this topic yet."
        actionText="Be the first to contribute"
        onAction={() => {}}
      />
    );
  }

  return (
    <div className="space-y-6">
      {insights.map((insight) => (
        <InsightCard 
          key={insight.id} 
          insight={insight} 
          onVote={onVote} 
        />
      ))}
    </div>
  );
};

export default InsightsList;
