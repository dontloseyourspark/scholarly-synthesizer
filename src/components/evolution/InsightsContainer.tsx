
import React from 'react';
import { getTopicIdFromSlug } from '@/utils/topicMapping';
import DatabaseInsightsContainer from '@/components/database/DatabaseInsightsContainer';

const InsightsContainer: React.FC = () => {
  const topicId = getTopicIdFromSlug('evolution-of-humans');
  
  if (!topicId) {
    return (
      <div className="container mx-auto px-4 mt-8">
        <div className="text-center text-red-600">
          Error: Could not find topic ID for evolution of humans
        </div>
      </div>
    );
  }

  return <DatabaseInsightsContainer topicId={topicId} />;
};

export default InsightsContainer;
