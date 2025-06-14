
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import ConsensusIndicator from '@/components/ConsensusIndicator';
import { Topic } from '@/components/TopicCard';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { vaccinePublications } from '@/data/vaccineData';

type VaccineHeroSectionProps = {
  topic: Topic;
};

const VaccineHeroSection = ({ topic }: VaccineHeroSectionProps) => {
  return (
    <section className="bg-scholarly-blue py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <Link to="/topics" className="text-scholarly-lightGray hover:text-white flex items-center mb-4">
              <Shield className="mr-2 h-5 w-5" />
              Medical Topics
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">Vaccine Efficacy</h1>
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
                  sampleSize={topic.contributorsCount}
                  className="mb-4"
                />
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mt-2">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="flex items-center hover:text-scholarly-blue transition-colors cursor-pointer">
                        <BookOpen className="h-4 w-4 mr-2" />
                        <span>{topic.sourcesCount} peer-reviewed sources</span>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 p-0 overflow-hidden">
                      <div className="bg-scholarly-blue p-3 text-white">
                        <h4 className="font-medium">Key Publications</h4>
                      </div>
                      <div className="p-4 space-y-3">
                        {vaccinePublications.length > 0 ? (
                          vaccinePublications.slice(0, 3).map((publication, index) => (
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
                            View all {topic.sourcesCount} sources
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

export default VaccineHeroSection;
