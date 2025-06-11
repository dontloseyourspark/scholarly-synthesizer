
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AISafetyCallToActionSection = ({ topicSlug }: { topicSlug: string }) => {
  return (
    <section className="container mx-auto px-4 py-10">
      <Card className="bg-scholarly-blue text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-serif">Join the AI Safety Discussion</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-scholarly-lightGray">
            Contribute to the critical conversation about ensuring AI systems remain safe and beneficial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-scholarly-blue" asChild>
              <Link to="/contribute">Contribute Research</Link>
            </Button>
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-scholarly-blue" asChild>
              <Link to={`/topics/${topicSlug}/publications`}>View Publications</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default AISafetyCallToActionSection;
