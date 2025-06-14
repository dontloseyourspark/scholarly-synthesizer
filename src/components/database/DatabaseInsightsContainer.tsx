
import React from 'react';
import { useInsights } from '@/hooks/useInsights';
import DatabaseInsightsLoadingState from './DatabaseInsightsLoadingState';
import DatabaseInsightsErrorState from './DatabaseInsightsErrorState';
import DatabaseInsightsTabs from './DatabaseInsightsTabs';
import { handleVote } from '@/utils/handleVote';

type DatabaseInsightsContainerProps = {
  topicId: string;
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
    data: insights, 
    isLoading, 
    error, 
    refetch 
  } = useInsights(topicId);

  if (isLoading) {
    return <DatabaseInsightsLoadingState />;
  }

  if (error) {
    return <DatabaseInsightsErrorState onRetry={() => refetch()} />;
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
