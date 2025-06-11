
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const QuantumApplicationsSection = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-serif font-bold text-center mb-8">Quantum Applications</h2>
      <Card>
        <CardHeader>
          <CardTitle>Potential Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Quantum computing applications in cryptography, optimization, simulation, and machine learning.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default QuantumApplicationsSection;
