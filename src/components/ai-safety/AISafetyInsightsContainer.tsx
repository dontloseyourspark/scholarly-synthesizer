
import React from 'react';
import { getTopicIdFromSlug } from '@/utils/topicMapping';
import DatabaseInsightsContainer from '@/components/database/DatabaseInsightsContainer';

const AISafetyInsightsContainer: React.FC = () => {
  const topicId = getTopicIdFromSlug('artificial-intelligence-safety');
  
  if (!topicId) {
    return (
      <div className="container mx-auto px-4 mt-8">
        <div className="text-center text-red-600">
          Error: Could not find topic ID for AI safety
        </div>
      </div>
    );
  }

  return <DatabaseInsightsContainer topicId={topicId} />;
};

export default AISafetyInsightsContainer;
