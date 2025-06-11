
import React from 'react';
import ErrorCard from '../common/ErrorCard';

type DatabaseInsightsErrorStateProps = {
  error: string;
  onRetry: () => void;
};

const DatabaseInsightsErrorState: React.FC<DatabaseInsightsErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="container mx-auto px-4 mt-8">
      <ErrorCard 
        error={`Error loading insights: ${error}`}
        onRetry={onRetry}
      />
    </div>
  );
};

export default DatabaseInsightsErrorState;
