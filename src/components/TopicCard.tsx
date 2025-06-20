
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, Calendar } from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import ConsensusIndicator, { ConsensusLevel } from './ConsensusIndicator';
import { getInsightsForTopic } from '@/data/insightsData';
import { getTopicIdFromSlug } from '@/utils/topicMapping';
import { useTopicStats } from '@/hooks/useTopicStats';

export type Topic = {
  id: string;
  title: string;
  slug: string;
  description: string;
  consensusLevel: ConsensusLevel;
  consensusPercentage: number;
  contributorsCount: number;
  sourcesCount: number;
  updatedAt: string;
  tags: string[];
};

const TopicCard = ({ topic }: { topic: Topic }) => {
  // Get the database topic ID for this topic
  const databaseTopicId = getTopicIdFromSlug(topic.slug);
  
  // Fetch real statistics from database
  const { stats, loading: statsLoading } = useTopicStats(databaseTopicId);
  
  // Use database stats if available, otherwise fall back to topic data
  const contributorsCount = stats?.contributorsCount ?? topic.contributorsCount;
  const sourcesCount = stats?.sourcesCount ?? topic.sourcesCount;
  
  // Get insights for this topic to access sources
  const topicInsights = getInsightsForTopic(topic.id);
  
  // Extract unique sources from all insights
  const sources = Array.from(
    new Set(topicInsights.flatMap(insight => insight.sources))
  ).slice(0, 3); // Limit to 3 sources for preview
  
  // Determine the correct route for this topic
  const getTopicRoute = (slug: string) => {
    switch (slug) {
      case 'climate-change':
        return '/climate-change';
      case 'evolution-of-humans':
        return '/evolution-of-humans';
      case 'vaccine-efficacy':
        return '/vaccine-efficacy';
      case 'artificial-intelligence-safety':
        return '/artificial-intelligence-safety';
      case 'nutrition-science':
        return '/nutrition-science';
      case 'quantum-computing':
        return '/quantum-computing';
      case 'economic-impacts-immigration':
        return '/economic-impacts-immigration';
      case 'effectiveness-psychotherapy':
        return '/effectiveness-psychotherapy';
      default:
        return `/topics/${slug}`;
    }
  };

  const topicRoute = getTopicRoute(topic.slug);
  
  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">
          <Link to={topicRoute} className="hover:text-scholarly-blue transition-colors">
            {topic.title}
          </Link>
        </CardTitle>
        <div className="flex flex-wrap gap-1 mt-1">
          {topic.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {topic.description}
        </p>
        <ConsensusIndicator 
          level={topic.consensusLevel} 
          percentage={topic.consensusPercentage} 
          sampleSize={sourcesCount}
        />
      </CardContent>
      <CardFooter className="pt-2 text-xs text-muted-foreground flex flex-wrap items-center gap-4">
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="flex items-center cursor-pointer hover:text-scholarly-blue transition-colors">
              <Users className="h-3.5 w-3.5 mr-1" />
              <span>
                {statsLoading ? '...' : contributorsCount} contributors
              </span>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 p-0 overflow-hidden">
            <div className="bg-scholarly-blue p-3 text-white">
              <h4 className="font-medium">Join Our Community</h4>
            </div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground mb-3">
                Help build the world's most comprehensive database of scholarly consensus by contributing your research and expertise.
              </p>
              <div className="text-center">
                <Link 
                  to="/contribute" 
                  className="text-xs text-scholarly-blue hover:underline"
                >
                  Contribute your scholarship
                </Link>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="flex items-center cursor-pointer hover:text-scholarly-blue transition-colors">
              <BookOpen className="h-3.5 w-3.5 mr-1" />
              <span>
                {statsLoading ? '...' : sourcesCount} sources
              </span>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 p-0 overflow-hidden">
            <div className="bg-scholarly-blue p-3 text-white">
              <h4 className="font-medium">Key Sources</h4>
            </div>
            <div className="p-4 space-y-3">
              {sources.length > 0 ? (
                sources.map((source, index) => (
                  <div key={index} className="text-xs">
                    <a 
                      href={source.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium text-scholarly-blue hover:underline"
                    >
                      {source.title}
                    </a>
                    <p className="text-muted-foreground mt-0.5">
                      {source.authors}, {source.year}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No sources available for preview</p>
              )}
              {topicInsights.length > 0 && sources.length > 0 && (
                <div className="pt-2 text-center">
                  <Link 
                    to={topicRoute} 
                    className="text-xs text-scholarly-blue hover:underline"
                  >
                    View all {sourcesCount} sources
                  </Link>
                </div>
              )}
            </div>
          </HoverCardContent>
        </HoverCard>
        <div className="flex items-center">
          <Calendar className="h-3.5 w-3.5 mr-1" />
          <span>Updated {new Date(topic.updatedAt).toLocaleDateString()}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TopicCard;
