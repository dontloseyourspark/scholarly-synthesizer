
import React from 'react';

interface LegalSectionProps {
  title: string;
  children: React.ReactNode;
}

const LegalSection = ({ title, children }: LegalSectionProps) => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      {children}
    </section>
  );
};

export default LegalSection;
