
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EconomicVisualizationsSection = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Economic Data Visualizations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Charts and graphs showing economic impacts of immigration across different metrics.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default EconomicVisualizationsSection;
