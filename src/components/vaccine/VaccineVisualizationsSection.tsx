
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const VaccineVisualizationsSection = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <Tabs defaultValue="efficacy" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="efficacy">Vaccine Efficacy</TabsTrigger>
          <TabsTrigger value="safety">Safety Data</TabsTrigger>
          <TabsTrigger value="coverage">Coverage Rates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="efficacy">
          <Card>
            <CardHeader>
              <CardTitle>Vaccine Efficacy Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Clinical trial data showing efficacy rates across different vaccine types and populations.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="safety">
          <Card>
            <CardHeader>
              <CardTitle>Safety Monitoring Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Comprehensive safety data from clinical trials and post-market surveillance systems.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="coverage">
          <Card>
            <CardHeader>
              <CardTitle>Vaccination Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Global and regional vaccination coverage rates and their impact on disease prevention.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default VaccineVisualizationsSection;
