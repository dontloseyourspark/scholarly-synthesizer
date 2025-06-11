
import React from 'react';

type VaccineDescriptionSectionProps = {
  description: string;
};

const VaccineDescriptionSection = ({ description }: VaccineDescriptionSectionProps) => {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-serif font-bold mb-6">Understanding Vaccine Efficacy</h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          {description}
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          The scientific consensus on vaccine efficacy is built on decades of rigorous clinical trials, 
          real-world effectiveness studies, and comprehensive safety monitoring systems. Modern vaccines 
          undergo extensive testing phases before approval and continue to be monitored throughout their use.
        </p>
      </div>
    </section>
  );
};

export default VaccineDescriptionSection;
