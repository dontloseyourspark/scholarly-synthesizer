
import React from 'react';

type QuantumDescriptionSectionProps = {
  description: string;
};

const QuantumDescriptionSection = ({ description }: QuantumDescriptionSectionProps) => {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-serif font-bold mb-6">Understanding Quantum Computing</h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          {description}
        </p>
      </div>
    </section>
  );
};

export default QuantumDescriptionSection;
