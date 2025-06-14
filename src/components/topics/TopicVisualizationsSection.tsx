
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TopicVisualizationsSectionProps {
  children: React.ReactNode;
}

const TopicVisualizationsSection = ({ children }: TopicVisualizationsSectionProps) => {
  return (
    <section className="container mx-auto px-4 py-10">
      {children}
    </section>
  );
};

export default TopicVisualizationsSection;
