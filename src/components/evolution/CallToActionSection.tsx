
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CallToActionSectionProps {
  topicSlug: string;
}

const CallToActionSection = ({ topicSlug }: CallToActionSectionProps) => {
  return (
    <section className="py-16 px-4 bg-scholarly-blue">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-serif font-bold text-white mb-4">
          Explore the Scientific Consensus
        </h2>
        
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Dive deeper into the evidence for human evolution with peer-reviewed research and expert insights.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="bg-white text-scholarly-blue hover:bg-scholarly-lightGray">
            <Link to={`/topics/${topicSlug}/publications`}>
              <BookOpen className="mr-2 h-4 w-4" />
              Browse Scientific Publications
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
            <Link to="/contribute">
              <ChevronRight className="mr-2 h-4 w-4" />
              Contribute to the Consensus
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
