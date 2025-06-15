
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InsightsModerationPanel from './InsightsModerationPanel';
import DiscussionsModerationPanel from './DiscussionsModerationPanel';

const ModerationTabs: React.FC = () => {
  return (
    <Tabs defaultValue="insights" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="insights">Insights Moderation</TabsTrigger>
        <TabsTrigger value="discussions">Comments Moderation</TabsTrigger>
      </TabsList>
      
      <TabsContent value="insights">
        <InsightsModerationPanel />
      </TabsContent>
      
      <TabsContent value="discussions">
        <DiscussionsModerationPanel />
      </TabsContent>
    </Tabs>
  );
};

export default ModerationTabs;
