
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ConsensusChart from '@/components/common/ConsensusChart';

const consensusData = [
  { name: 'Support', value: 97, color: '#4CAF50' },
  { name: 'Against', value: 3, color: '#F44336' }
];

const consensusDescription = [
  "Extensive research and clinical trials consistently demonstrate that vaccines are highly effective at preventing infectious diseases. The scientific consensus is overwhelming, with studies showing vaccines have prevented millions of deaths and cases of serious illness.",
  "Multiple meta-analyses and systematic reviews confirm the safety and efficacy of vaccines across different populations and age groups."
];

const VaccineVisualizationsSection = () => {
  return (
    <Tabs defaultValue="consensus" className="w-full">
      <TabsList className="mb-8">
        <TabsTrigger value="consensus">Scientific Consensus</TabsTrigger>
        <TabsTrigger value="efficacy">Vaccine Efficacy</TabsTrigger>
        <TabsTrigger value="safety">Safety Data</TabsTrigger>
        <TabsTrigger value="coverage">Coverage Rates</TabsTrigger>
      </TabsList>
      
      <TabsContent value="consensus">
        <ConsensusChart
          title="Scientific Consensus on Vaccine Efficacy"
          data={consensusData}
          description={consensusDescription}
          source="Clinical trials and medical research studies"
        />
      </TabsContent>
      
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
  );
};

export default VaccineVisualizationsSection;
