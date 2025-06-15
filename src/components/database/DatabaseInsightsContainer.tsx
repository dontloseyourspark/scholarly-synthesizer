import React from 'react';
import { useInsights } from '@/hooks/useInsights';
import DatabaseInsightsLoadingState from './DatabaseInsightsLoadingState';
import DatabaseInsightsErrorState from './DatabaseInsightsErrorState';
import DatabaseInsightsTabs from './DatabaseInsightsTabs';
import AddInsightForm from "../insights/AddInsightForm";
import { useAuth } from '@/contexts/AuthContext';

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

  const { user, isScholar } = useAuth();

  if (loading) {
    return <DatabaseInsightsLoadingState />;
  }

  if (error) {
    return <DatabaseInsightsErrorState error={error} onRetry={() => refetch()} />;
  }

  return (
    <div>
      {/* Scholar add-insight form */}
      {user && isScholar && (
        <AddInsightForm topicId={topicId} onSubmitted={refetch} />
      )}
      <DatabaseInsightsTabs 
        topicId={topicId}
        insights={insights || []} 
        onVote={handleVote} 
        keyPublications={keyPublications}
      />
    </div>
  );
};

export default DatabaseInsightsContainer;
