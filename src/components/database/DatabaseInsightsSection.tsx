
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorCard from '../common/ErrorCard';
import InsightsList from '../insights/InsightsList';
import SourcesList from '../insights/SourcesList';
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

  // Get unique sources from all insights
  const allSources = Array.from(
    new Set(insights.flatMap(insight => insight.sources))
  );

  return (
    <div className="container mx-auto px-4 mt-8">
      <Tabs defaultValue="insights" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="insights">Scholar Insights</TabsTrigger>
          <TabsTrigger value="sources">Key Sources</TabsTrigger>
          <TabsTrigger value="discussion">Discussion</TabsTrigger>
        </TabsList>
        
        <TabsContent value="insights">
          <InsightsList insights={insights} onVote={onVote} />
        </TabsContent>
        
        <TabsContent value="sources">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-medium mb-4">Key Sources on this Topic</h3>
              {allSources.length === 0 ? (
                <p className="text-muted-foreground">No sources available for this topic yet.</p>
              ) : (
                <SourcesList sources={allSources} variant="detailed" />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="discussion">
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <h3 className="text-xl font-medium mb-4">Discussion</h3>
              <p className="text-muted-foreground mb-6">Join the conversation about this topic.</p>
              <Button className="bg-scholarly-blue hover:bg-scholarly-accent">
                Sign In to Participate
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatabaseInsightsSection;
