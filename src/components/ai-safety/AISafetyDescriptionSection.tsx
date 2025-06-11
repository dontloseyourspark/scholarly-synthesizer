
import React from 'react';

type AISafetyDescriptionSectionProps = {
  description: string;
};

const AISafetyDescriptionSection = ({ description }: AISafetyDescriptionSectionProps) => {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-serif font-bold mb-6">Understanding AI Safety</h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          {description}
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          The field of AI safety addresses potential risks from advanced artificial intelligence systems 
          and develops methods to ensure AI systems remain beneficial and aligned with human values as 
          they become more capable.
        </p>
      </div>
    </section>
  );
};

export default AISafetyDescriptionSection;
