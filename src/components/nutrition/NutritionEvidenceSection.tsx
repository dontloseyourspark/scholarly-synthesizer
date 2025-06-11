
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const NutritionEvidenceSection = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-serif font-bold text-center mb-8">Nutritional Evidence</h2>
      <Card>
        <CardHeader>
          <CardTitle>Key Findings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Evidence-based nutrition recommendations from clinical studies and population research.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default NutritionEvidenceSection;
