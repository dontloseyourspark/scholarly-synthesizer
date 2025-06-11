
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorCard from '../common/ErrorCard';
import InsightsTab from '../insights/InsightsTab';
import SourcesTab from '../insights/SourcesTab';
import DiscussionTab from '../insights/DiscussionTab';
import { DatabaseInsight } from '@/hooks/useInsights';

type DatabaseInsightsSectionProps = {
  insights: DatabaseInsight[];
  loading: boolean;
  error: string | null;
  onVote: (insightId: string, voteType: 'up' | 'down') => void;
}; 

const DatabaseInsightsSection: React.FC<DatabaseInsightsSectionProps> = ({ 
  insights, 
  loading, 
  error, 
  onVote 
}) => {
  if (loading) {
    return (
      <div className="container mx-auto px-4 mt-8">
        <LoadingSpinner message="Loading insights..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 mt-8">
        <ErrorCard 
          error={`Error loading insights: ${error}`}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-8">
      <Tabs defaultValue="insights" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="insights">Scholar Insights</TabsTrigger>
          <TabsTrigger value="sources">Key Sources</TabsTrigger>
          <TabsTrigger value="discussion">Discussion</TabsTrigger>
        </TabsList>
        
        <TabsContent value="insights">
          <InsightsTab insights={insights} onVote={onVote} />
        </TabsContent>
        
        <TabsContent value="sources">
          <SourcesTab insights={insights} />
        </TabsContent>
        
        <TabsContent value="discussion">
          <DiscussionTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatabaseInsightsSection;
