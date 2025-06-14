
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  
  // Get unique sources from all insights
  const insightSources = Array.from(
    new Set(insights.flatMap(insight => insight.sources))
  );

  // Use keyPublications if provided, otherwise fall back to insight sources
  const allSources = keyPublications && keyPublications.length > 0 
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

  // Limit to first 3 sources
  const limitedSources = allSources.slice(0, 3);
  const hasMoreSources = allSources.length > 3;

  // Determine the publications page route based on current path
  const getPublicationsRoute = () => {
    const pathSegments = location.pathname.split('/');
    if (pathSegments.length >= 2) {
      const topicSlug = pathSegments[1];
      return `/${topicSlug}/publications`;
    }
    return '/topics/publications';
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium">Key Sources on this Topic</h3>
          {hasMoreSources && (
            <Button variant="outline" asChild>
              <Link to={getPublicationsRoute()}>
                View all ({allSources.length})
              </Link>
            </Button>
          )}
        </div>
        {limitedSources.length === 0 ? (
          <p className="text-muted-foreground">No sources available for this topic yet.</p>
        ) : (
          <SourcesList sources={limitedSources} variant="detailed" />
        )}
      </CardContent>
    </Card>
  );
};

export default SourcesTab;
