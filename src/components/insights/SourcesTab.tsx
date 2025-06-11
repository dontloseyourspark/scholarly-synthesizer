
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import SourcesList from './SourcesList';
import { DatabaseInsight } from '@/hooks/useInsights';

type SourcesTabProps = {
  insights: DatabaseInsight[];
};

const SourcesTab: React.FC<SourcesTabProps> = ({ insights }) => {
  // Get unique sources from all insights
  const allSources = Array.from(
    new Set(insights.flatMap(insight => insight.sources))
  );

  return (
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
  );
};

export default SourcesTab;
