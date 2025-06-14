
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ConsensusChart from '@/components/common/ConsensusChart';

const consensusData = [
  { name: 'Support', value: 89, color: '#4CAF50' },
  { name: 'Against', value: 11, color: '#F44336' }
];

const consensusDescription = [
  "Mental health professionals and researchers have strong consensus that psychotherapy is effective for treating a wide range of mental health conditions. Meta-analyses consistently demonstrate significant benefits for patients receiving psychological treatments.",
  "Evidence-based therapies have been rigorously tested and shown to be effective for conditions such as depression, anxiety, PTSD, and many other psychological disorders."
];

const PsychotherapyVisualizationsSection = () => {
  return (
    <Tabs defaultValue="consensus" className="w-full">
      <TabsList className="mb-8">
        <TabsTrigger value="consensus">Clinical Consensus</TabsTrigger>
        <TabsTrigger value="effectiveness">Treatment Effectiveness</TabsTrigger>
        <TabsTrigger value="outcomes">Patient Outcomes</TabsTrigger>
      </TabsList>
      
      <TabsContent value="consensus">
        <ConsensusChart
          title="Clinical Consensus on Psychotherapy"
          data={consensusData}
          description={consensusDescription}
          source="Clinical psychology research and professional organizations"
        />
      </TabsContent>
      
      <TabsContent value="effectiveness">
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
      </TabsContent>
      
      <TabsContent value="outcomes">
        <Card>
          <CardHeader>
            <CardTitle>Patient Outcomes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Data on patient outcomes and recovery rates across different therapeutic approaches.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default PsychotherapyVisualizationsSection;
