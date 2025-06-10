
import React from 'react';
import { useInsights } from '@/hooks/useInsights';
import DatabaseInsightsSection from './DatabaseInsightsSection';

type DatabaseInsightsContainerProps = {
  topicId: number;
};

const DatabaseInsightsContainer: React.FC<DatabaseInsightsContainerProps> = ({ topicId }) => {
  const { insights, loading, error, handleVote } = useInsights(topicId);

  return (
    <DatabaseInsightsSection 
      insights={insights} 
      loading={loading}
      error={error}
      onVote={handleVote} 
    />
  );
};

export default DatabaseInsightsContainer;
