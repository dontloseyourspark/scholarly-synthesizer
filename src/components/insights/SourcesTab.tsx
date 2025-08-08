import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import SourcesList from './SourcesList';
import { DatabaseInsight } from '@/hooks/useInsights';

type Source = {
  id: number;
  title: string;
  authors: string;
  publication: string | null;
  year: number;
  url: string;
  doi: string | null;
};

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
  totalCount: number; // <-- Added totalCount prop here
};

const SourcesTab: React.FC<SourcesTabProps> = ({ insights, keyPublications, totalCount }) => {
  const location = useLocation();

  const rawInsightSources = insights
    .flatMap(insight => insight.sources)
    .filter((source): source is NonNullable<typeof source> => source !== null && source !== undefined);

  const insightSources: Source[] = rawInsightSources.map((source, index) => ({
    id: source.id ?? index,
    title: source.title ?? 'Untitled',
    authors: source.authors ?? 'Unknown',
    publication: source.publication ?? null,
    year: source.year ?? 0,
    url: source.url ?? '',
    doi: source.doi ?? null,
  }));

  // Removed: using totalCount prop for accurate count

  const allSources: Source[] = keyPublications && keyPublications.length > 0
    ? keyPublications.map(pub => ({
        id: parseInt(pub.id, 10),
        title: pub.title,
        authors: pub.authors,
        publication: pub.publication || null,
        year: pub.year,
        url: pub.url,
        doi: pub.doi || null,
      }))
    : insightSources;

  const limitedSources = allSources.slice(0, 3);
  const hasMoreSources = totalCount > 3;

  const getPublicationsRoute = () => {
    const pathSegments = location.pathname.split('/');
    if (pathSegments.length >= 2) {
      const topicSlug = pathSegments[1];
      return `/topics/${topicSlug}/publications`;
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
                View all ({totalCount})
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
