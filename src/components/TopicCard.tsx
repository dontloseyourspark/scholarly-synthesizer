
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, Calendar } from 'lucide-react';
import ConsensusIndicator, { ConsensusLevel } from './ConsensusIndicator';

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
  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">
          <Link to={`/topics/${topic.slug}`} className="hover:text-scholarly-blue transition-colors">
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
          sampleSize={topic.contributorsCount}
        />
      </CardContent>
      <CardFooter className="pt-2 text-xs text-muted-foreground flex flex-wrap items-center gap-4">
        <div className="flex items-center">
          <Users className="h-3.5 w-3.5 mr-1" />
          <span>{topic.contributorsCount} contributors</span>
        </div>
        <div className="flex items-center">
          <BookOpen className="h-3.5 w-3.5 mr-1" />
          <span>{topic.sourcesCount} sources</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-3.5 w-3.5 mr-1" />
          <span>Updated {new Date(topic.updatedAt).toLocaleDateString()}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TopicCard;
