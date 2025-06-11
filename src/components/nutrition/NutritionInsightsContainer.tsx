
import React from 'react';
import { getTopicIdFromSlug } from '@/utils/topicMapping';
import DatabaseInsightsContainer from '@/components/database/DatabaseInsightsContainer';

const NutritionInsightsContainer: React.FC = () => {
  const topicId = getTopicIdFromSlug('nutrition-science');
  
  if (!topicId) {
    return (
      <div className="container mx-auto px-4 mt-8">
        <div className="text-center text-red-600">
          Error: Could not find topic ID for nutrition science
        </div>
      </div>
    );
  }

  return <DatabaseInsightsContainer topicId={topicId} />;
};

export default NutritionInsightsContainer;
