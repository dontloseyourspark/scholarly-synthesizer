
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PsychotherapyVisualizationsSection = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Treatment Effectiveness Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Visualizations of psychotherapy effectiveness across different conditions and populations.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default PsychotherapyVisualizationsSection;
