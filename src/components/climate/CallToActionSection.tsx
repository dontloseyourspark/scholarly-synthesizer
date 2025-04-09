
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CallToActionSection = ({ topicSlug }: { topicSlug: string }) => {
  return (
    <section className="container mx-auto px-4 py-10">
      <Card className="bg-scholarly-blue text-white border-none">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Join the Climate Conversation</h2>
          <p className="mb-6 text-scholarly-lightGray max-w-3xl mx-auto">
            Contribute to the scholarly discussion on climate change. Add insights, evaluate evidence, 
            and help build a comprehensive resource for understanding this global challenge.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-scholarly-blue" asChild>
              <Link to={`/topics/${topicSlug}`}>View Full Topic Details</Link>
            </Button>
            <Button variant="default" className="bg-white text-scholarly-blue hover:bg-scholarly-lightGray" asChild>
              <Link to="/contribute">Contribute an Insight</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default CallToActionSection;
