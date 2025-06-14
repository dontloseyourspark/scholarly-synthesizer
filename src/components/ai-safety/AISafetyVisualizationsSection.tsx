import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ConsensusChart from '@/components/common/ConsensusChart';

const consensusData = [
  { name: 'Concerned', value: 78, color: '#F44336' },
  { name: 'Not concerned', value: 22, color: '#4CAF50' }
];

const consensusDescription = [
  "Leading AI researchers and scientists increasingly recognize the importance of AI safety research. There is growing consensus that as AI systems become more capable, ensuring their safe and beneficial development becomes critical.",
  "Multiple surveys of AI researchers show significant concern about potential risks from advanced AI systems and the need for proactive safety measures."
];

const AISafetyVisualizationsSection = () => {
  return (
    <Tabs defaultValue="consensus" className="w-full">
      <TabsList className="mb-8">
        <TabsTrigger value="consensus">Scientific Consensus</TabsTrigger>
        <TabsTrigger value="risks">AI Risk Assessment</TabsTrigger>
        <TabsTrigger value="timeline">Development Timeline</TabsTrigger>
      </TabsList>
      
      <TabsContent value="consensus">
        <ConsensusChart
          title="Scientific Consensus on AI Safety"
          data={consensusData}
          description={consensusDescription}
          source="Surveys of AI researchers and safety experts"
        />
      </TabsContent>
      
      <TabsContent value="risks">
        <Card>
          <CardHeader>
            <CardTitle>AI Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Analysis of potential risks and safety challenges in AI development and deployment.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="timeline">
        <Card>
          <CardHeader>
            <CardTitle>AI Development Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Timeline of AI capabilities and corresponding safety research milestones.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AISafetyVisualizationsSection;
