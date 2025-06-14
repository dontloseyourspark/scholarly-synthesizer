
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TopicCard {
  title: string;
  icon: React.ReactNode;
  description: string;
}

interface TopicContentSectionProps {
  title: string;
  subtitle: string;
  description: string;
  cards?: TopicCard[];
}

const TopicContentSection = ({ title, subtitle, description, cards }: TopicContentSectionProps) => {
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
      
      {cards && cards.length > 0 && (
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => (
              <Card key={index} className="border-none shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{card.title}</h3>
                  <p className="text-muted-foreground">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default TopicContentSection;
