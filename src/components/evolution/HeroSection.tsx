
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, BookOpen } from 'lucide-react';
import { Topic } from '@/components/TopicCard';
import ConsensusIndicator from '@/components/ConsensusIndicator';
import { Button } from '@/components/ui/button';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { evolutionPublications } from '@/data/evolutionData';

interface HeroSectionProps {
  topic: Topic;
}

const HeroSection = ({ topic }: HeroSectionProps) => {
  return (
    <section className="bg-scholarly-blue py-16 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            {topic.title}
          </h1>
          
          <p className="text-xl text-white/90 mb-8">
            The scientific consensus on human evolution from earlier hominid ancestors
          </p>
          
          <div className="bg-white rounded-lg p-6 mb-8">
            <ConsensusIndicator 
              level={topic.consensusLevel} 
              percentage={topic.consensusPercentage} 
              sampleSize={topic.sourcesCount}
              className="mb-4"
            />
            
            <p className="text-gray-600">
              {topic.consensusPercentage}% of scientists agree on the fundamental principles of human evolution. 
              This consensus is based on extensive fossil records, genetic evidence, and comparative anatomy.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button className="bg-white text-scholarly-blue hover:bg-scholarly-lightGray">
              <ChevronDown className="mr-2 h-4 w-4" />
              Explore Evidence
            </Button>

            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Peer-Reviewed Sources
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Key Publications</h4>
                  {evolutionPublications.slice(0, 3).map((pub, index) => (
                    <div key={index} className="text-sm">
                      <a 
                        href={pub.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-scholarly-blue hover:underline font-medium"
                      >
                        {pub.title}
                      </a>
                      <p className="text-muted-foreground text-xs">{pub.authors}, {pub.year}</p>
                    </div>
                  ))}
                  <Link 
                    to={`/topics/${topic.slug}/publications`}
                    className="text-scholarly-blue hover:underline text-sm flex items-center pt-2"
                  >
                    View all {topic.sourcesCount} sources
                  </Link>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
