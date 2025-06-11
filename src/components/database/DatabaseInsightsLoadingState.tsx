
import React from 'react';
import LoadingSpinner from '../common/LoadingSpinner';

const DatabaseInsightsLoadingState: React.FC = () => {
  return (
    <div className="container mx-auto px-4 mt-8">
      <LoadingSpinner message="Loading insights..." />
    </div>
  );
};

export default DatabaseInsightsLoadingState;
