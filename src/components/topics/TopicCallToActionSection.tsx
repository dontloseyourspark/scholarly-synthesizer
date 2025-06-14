
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface TopicCallToActionSectionProps {
  topicSlug: string;
  title?: string;
  description?: string;
}

const TopicCallToActionSection = ({ 
  topicSlug, 
  title = "Contribute to the Discussion",
  description = "Help advance our understanding by contributing your expertise and insights."
}: TopicCallToActionSectionProps) => {
  return (
    <section className="container mx-auto px-4 py-10">
      <Card className="bg-scholarly-blue text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-serif">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-scholarly-lightGray">
            {description}
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

export default TopicCallToActionSection;
