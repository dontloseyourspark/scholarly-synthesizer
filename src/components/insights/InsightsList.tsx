import React from 'react';
import InsightCard from '@/components/insights/InsightCard';
import EmptyState from '../common/EmptyState';
import { DatabaseInsight } from '@/hooks/useInsights';

type InsightsListProps = {
  insights: DatabaseInsight[];
  onVote: (insightId: string, voteType: 'up' | 'down') => void;
};



const InsightsList: React.FC<InsightsListProps> = ({ insights, onVote }) => {
  const approvedInsights = insights.filter(insight => insight.verification_status === 'verified');
  if (insights.length === 0) {
    return (
      <EmptyState 
        title="No insights have been contributed for this topic yet."
        actionText="Be the first to contribute"
        actionLink="/contribute"
      />
    );
  }

  return (
    <div className="space-y-6">
      
      {approvedInsights.map((insight) => (
        <InsightCard 
          key={insight.id} 
          insight={insight} 
          onVote={onVote} // ✅ This is the correct prop usage
        />
      ))}
    </div>
  );
};

export default InsightsList;
