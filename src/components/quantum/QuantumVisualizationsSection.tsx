
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ConsensusChart from '@/components/common/ConsensusChart';

const consensusData = [
  { name: 'Promising', value: 75, color: '#4CAF50' },
  { name: 'Uncertain', value: 25, color: '#FFA726' }
];

const consensusDescription = [
  "Quantum physicists and computer scientists widely agree that quantum computing represents a revolutionary approach to computation with the potential to solve certain problems exponentially faster than classical computers.",
  "While challenges remain in building practical quantum computers, the scientific community has strong consensus on the theoretical foundations and potential applications of quantum computing."
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
