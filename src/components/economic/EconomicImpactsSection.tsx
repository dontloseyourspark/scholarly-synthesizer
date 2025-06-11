
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EconomicImpactsSection = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-serif font-bold text-center mb-8">Economic Impact Analysis</h2>
      <Card>
        <CardHeader>
          <CardTitle>Key Economic Effects</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Research on labor market effects, fiscal impacts, and economic growth from immigration.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default EconomicImpactsSection;
