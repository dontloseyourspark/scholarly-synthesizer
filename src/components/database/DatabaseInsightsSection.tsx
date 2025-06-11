
import React from 'react';
import DatabaseInsightsLoadingState from './DatabaseInsightsLoadingState';
import DatabaseInsightsErrorState from './DatabaseInsightsErrorState';
import DatabaseInsightsTabs from './DatabaseInsightsTabs';
import { DatabaseInsight } from '@/hooks/useInsights';

type DatabaseInsightsSectionProps = {
  insights: DatabaseInsight[];
  loading: boolean;
  error: string | null;
  onVote: (insightId: string, voteType: 'up' | 'down') => void;
}; 

const DatabaseInsightsSection: React.FC<DatabaseInsightsSectionProps> = ({ 
  insights, 
  loading, 
  error, 
  onVote 
}) => {
  if (loading) {
    return <DatabaseInsightsLoadingState />;
  }

  if (error) {
    return (
      <DatabaseInsightsErrorState 
        error={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return <DatabaseInsightsTabs insights={insights} onVote={onVote} />;
};

export default DatabaseInsightsSection;
