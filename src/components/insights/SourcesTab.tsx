
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import SourcesList from './SourcesList';
import { DatabaseInsight } from '@/hooks/useInsights';

type SourcesTabProps = {
  insights: DatabaseInsight[];
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

const SourcesTab: React.FC<SourcesTabProps> = ({ insights, keyPublications }) => {
  // Get unique sources from all insights
  const insightSources = Array.from(
    new Set(insights.flatMap(insight => insight.sources))
  );

  // Use keyPublications if provided, otherwise fall back to insight sources
  const sources = keyPublications && keyPublications.length > 0 
    ? keyPublications.map(pub => ({
        id: parseInt(pub.id),
        title: pub.title,
        authors: pub.authors,
        publication: pub.publication || null,
        year: pub.year,
        url: pub.url,
        doi: pub.doi || null,
      }))
    : insightSources;

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-xl font-medium mb-4">Key Sources on this Topic</h3>
        {sources.length === 0 ? (
          <p className="text-muted-foreground">No sources available for this topic yet.</p>
        ) : (
          <SourcesList sources={sources} variant="detailed" />
        )}
      </CardContent>
    </Card>
  );
};

export default SourcesTab;
