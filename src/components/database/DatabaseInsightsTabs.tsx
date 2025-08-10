
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import InsightsTab from '../insights/InsightsTab';
import SourcesTab from '../insights/SourcesTab';
import DiscussionTab from '../insights/DiscussionTab';
import { DatabaseInsight } from '@/hooks/useInsights';
import { useTopicPublications } from '@/hooks/useTopicPublications';

type DatabaseInsightsTabsProps = {
  topicId: number;
  insights: DatabaseInsight[];
  onVote: (insightId: string, voteType: 'up' | 'down') => void;
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

const DatabaseInsightsTabs: React.FC<DatabaseInsightsTabsProps> = ({ 
  topicId, 
  insights, 
  onVote, 
  keyPublications 
}) => {
  const { totalCount: publicationsCount } = useTopicPublications(topicId, { page: 1, itemsPerPage: 1 });
  return (
    <div className="container mx-auto px-4 mt-8">
      <Tabs defaultValue="insights" className="w-full">
        <TabsList className="mb-8">
 

          <TabsTrigger value="sources">Key Sources</TabsTrigger>
          <TabsTrigger value="discussion">Discussion</TabsTrigger>
        </TabsList>
        
        <TabsContent value="insights">
          <InsightsTab insights={insights} onVote={onVote} />
        </TabsContent>
        
        <TabsContent value="sources">
        <SourcesTab
          insights={insights}
          keyPublications={keyPublications}
          totalCount={publicationsCount}
        />
        </TabsContent>
        
        <TabsContent value="discussion">
          <DiscussionTab topicId={topicId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatabaseInsightsTabs;
