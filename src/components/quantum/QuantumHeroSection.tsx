
import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import ConsensusIndicator from '@/components/ConsensusIndicator';
import { Topic } from '@/components/TopicCard';

type QuantumHeroSectionProps = {
  topic: Topic;
};

const QuantumHeroSection = ({ topic }: QuantumHeroSectionProps) => {
  return (
    <section className="bg-scholarly-blue py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <Link to="/topics" className="text-scholarly-lightGray hover:text-white flex items-center mb-4">
              <Zap className="mr-2 h-5 w-5" />
              Physics Topics
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">Quantum Computing</h1>
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
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span>{topic.sourcesCount} peer-reviewed sources</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuantumHeroSection;
