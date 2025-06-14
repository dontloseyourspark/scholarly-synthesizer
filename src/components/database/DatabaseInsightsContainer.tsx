
import React from 'react';
import { useInsights } from '@/hooks/useInsights';
import DatabaseInsightsLoadingState from './DatabaseInsightsLoadingState';
import DatabaseInsightsErrorState from './DatabaseInsightsErrorState';
import DatabaseInsightsTabs from './DatabaseInsightsTabs';

type DatabaseInsightsContainerProps = {
  topicId: number;
  keyPublications?: Array<{
    id: string;
    title: string;
    authors: string;
    year: number;
    url: string;
    doi?: string;
    publication?: string;
  }>;
};

const DatabaseInsightsContainer: React.FC<DatabaseInsightsContainerProps> = ({ 
  topicId, 
  keyPublications 
}) => {
  const { 
    insights, 
    loading, 
    error, 
    handleVote,
    refetch 
  } = useInsights(topicId);

  if (loading) {
    return <DatabaseInsightsLoadingState />;
  }

  if (error) {
    return <DatabaseInsightsErrorState error={error} onRetry={() => refetch()} />;
  }

  return (
    <DatabaseInsightsTabs 
      insights={insights || []} 
      onVote={handleVote} 
      keyPublications={keyPublications}
    />
  );
};

export default DatabaseInsightsContainer;
