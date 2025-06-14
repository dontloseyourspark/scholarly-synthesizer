
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ConsensusChart from '@/components/common/ConsensusChart';

const consensusData = [
  { name: 'Support', value: 92, color: '#4CAF50' },
  { name: 'Against', value: 8, color: '#F44336' }
];

const consensusDescription = [
  "Nutrition scientists widely agree on fundamental principles of healthy eating, including the importance of balanced diets, adequate fruit and vegetable intake, and limiting processed foods. Evidence-based nutrition recommendations are supported by extensive research.",
  "Meta-analyses and systematic reviews consistently show the health benefits of following established dietary guidelines and the risks associated with poor nutrition."
];

const NutritionVisualizationsSection = () => {
  return (
    <Tabs defaultValue="consensus" className="w-full">
      <TabsList className="mb-8">
        <TabsTrigger value="consensus">Scientific Consensus</TabsTrigger>
        <TabsTrigger value="guidelines">Dietary Guidelines</TabsTrigger>
        <TabsTrigger value="research">Research Trends</TabsTrigger>
      </TabsList>
      
      <TabsContent value="consensus">
        <ConsensusChart
          title="Scientific Consensus on Nutrition Science"
          data={consensusData}
          description={consensusDescription}
          source="Nutrition research reviews and dietary guideline organizations"
        />
      </TabsContent>
      
      <TabsContent value="guidelines">
        <Card>
          <CardHeader>
            <CardTitle>Dietary Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Evidence-based dietary recommendations from major health organizations worldwide.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="research">
        <Card>
          <CardHeader>
            <CardTitle>Nutrition Research Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Current trends and developments in nutrition research and dietary science.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default NutritionVisualizationsSection;
