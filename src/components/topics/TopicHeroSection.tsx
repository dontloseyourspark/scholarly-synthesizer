
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import ConsensusIndicator from '@/components/ConsensusIndicator';
import { Topic } from '@/components/TopicCard';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { useTopicPublications } from '@/hooks/useTopicPublications';
import { getTopicIdFromSlug } from '@/utils/topicMapping';

interface TopicHeroSectionProps {
  topic: Topic;
  title: string;
  categoryIcon: LucideIcon;
  categoryLabel: string;
  keyPublications: Array<{
    id: string;
    title: string;
    authors: string;
    year: number;
    url: string;
    doi?: string;
    publication?: string;
  }>;
}

const TopicHeroSection = ({ 
  topic, 
  title, 
  categoryIcon: CategoryIcon, 
  categoryLabel, 
  keyPublications 
}: TopicHeroSectionProps) => {
  const databaseTopicId = getTopicIdFromSlug(topic.slug);
  const { totalCount: publicationsCount, loading: pubsLoading } = useTopicPublications(databaseTopicId ?? -1, { page: 1, itemsPerPage: 1 });
  const hasDbId = databaseTopicId !== null;
  const displayedSources = hasDbId ? (pubsLoading ? '...' : (publicationsCount || topic.sourcesCount)) : topic.sourcesCount;
  const linkSourcesCount = hasDbId ? (pubsLoading ? (topic.sourcesCount ?? 0) : (publicationsCount || topic.sourcesCount)) : topic.sourcesCount;

  return (
    <section className="bg-scholarly-blue py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <Link to="/topics" className="text-scholarly-lightGray hover:text-white flex items-center mb-4">
              <CategoryIcon className="mr-2 h-5 w-5" />
              {categoryLabel}
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">{title}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {topic.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-scholarly-blue bg-opacity-20 text-white border-scholarly-lightGray">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="w-full md:w-auto">
            <Card className="bg-white shadow border-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Scientific Consensus</CardTitle>
              </CardHeader>
              <CardContent>
                <ConsensusIndicator 
                  level={topic.consensusLevel} 
                  percentage={topic.consensusPercentage} 
                  sampleSize={topic.sourcesCount}
                  className="mb-4"
                />
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mt-2">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="flex items-center hover:text-scholarly-blue transition-colors cursor-pointer">
                        <BookOpen className="h-4 w-4 mr-2" />
                        <span>{displayedSources} peer-reviewed sources</span>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 p-0 overflow-hidden">
                      <div className="bg-scholarly-blue p-3 text-white">
                        <h4 className="font-medium">Key Publications</h4>
                      </div>
                      <div className="p-4 space-y-3">
                        {keyPublications.length > 0 ? (
                          keyPublications.slice(0, 3).map((publication, index) => (
                            <div key={index} className="text-xs">
                              <a 
                                href={publication.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="font-medium text-scholarly-blue hover:underline"
                              >
                                {publication.title}
                              </a>
                              <p className="text-muted-foreground mt-0.5">
                                {publication.authors}, {publication.year}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No publications available for preview</p>
                        )}
                        <div className="pt-2 text-center">
                          <Link 
                            to={`/topics/${topic.slug}/publications`}
                            className="text-xs text-scholarly-blue hover:underline"
                          >
                            View all {linkSourcesCount} sources
                          </Link>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopicHeroSection;
