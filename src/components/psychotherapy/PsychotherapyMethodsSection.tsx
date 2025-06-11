
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PsychotherapyMethodsSection = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-serif font-bold text-center mb-8">Therapeutic Methods</h2>
      <Card>
        <CardHeader>
          <CardTitle>Evidence-Based Approaches</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Research on different psychotherapy modalities and their effectiveness for various conditions.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default PsychotherapyMethodsSection;
