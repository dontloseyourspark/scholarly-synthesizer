
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ConsensusChart from '@/components/common/ConsensusChart';

const consensusData = [
  { name: 'Promising', value: 75, color: '#4CAF50' },
  { name: 'Uncertain', value: 25, color: '#FFA726' }
];

const consensusDescription = [
  "75% of quantum physicists and computer scientists view quantum computing as promising, representing a revolutionary approach to computation with the potential to solve certain problems exponentially faster than classical computers.",
  "However, 25% remain uncertain about the timeline and practical viability of quantum computing applications, citing significant technical challenges that remain to be overcome."
];

const QuantumVisualizationsSection = () => {
  return (
    <Tabs defaultValue="consensus" className="w-full">
      <TabsList className="mb-8">
        <TabsTrigger value="consensus">Scientific Consensus</TabsTrigger>
        <TabsTrigger value="progress">Development Progress</TabsTrigger>
        <TabsTrigger value="applications">Potential Applications</TabsTrigger>
      </TabsList>
      
      <TabsContent value="consensus">
        <ConsensusChart
          title="Scientific Consensus on Quantum Computing"
          data={consensusData}
          description={consensusDescription}
          source="Quantum physics and computer science research communities"
        />
      </TabsContent>
      
      <TabsContent value="progress">
        <Card>
          <CardHeader>
            <CardTitle>Quantum Computing Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Visualizations of quantum computing development timeline and technological milestones.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="applications">
        <Card>
          <CardHeader>
            <CardTitle>Potential Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Overview of potential quantum computing applications across various fields and industries.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default QuantumVisualizationsSection;
