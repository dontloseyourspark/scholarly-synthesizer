
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TopicContentSectionProps {
  title: string;
  subtitle: string;
  description: string;
}

const TopicContentSection = ({ title, subtitle, description }: TopicContentSectionProps) => {
  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-serif font-bold text-center mb-8">{title}</h2>
      <Card>
        <CardHeader>
          <CardTitle>{subtitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {description}
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default TopicContentSection;
