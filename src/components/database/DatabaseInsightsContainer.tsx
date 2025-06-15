
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

  const { user, isScholar, userProfile } = useAuth();

  if (loading) {
    return <DatabaseInsightsLoadingState />;
  }

  if (error) {
    return <DatabaseInsightsErrorState error={error} onRetry={() => refetch()} />;
  }

  // Only show add form to verified scholars
  const isVerifiedScholar = user && isScholar && userProfile?.verification_status === 'verified';

  return (
    <div>
      {/* Scholar add-insight form */}
      {isVerifiedScholar && (
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
