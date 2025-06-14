
import React from 'react';

interface TopicDescriptionSectionProps {
  title: string;
  description: string;
  additionalContent?: React.ReactNode;
}

const TopicDescriptionSection = ({ title, description, additionalContent }: TopicDescriptionSectionProps) => {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-serif font-bold mb-6">{title}</h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          {description}
        </p>
        {additionalContent}
      </div>
    </section>
  );
};

export default TopicDescriptionSection;
