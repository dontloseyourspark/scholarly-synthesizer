
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ConsensusTab from './ConsensusTab';
import ImpactsTab from './ImpactsTab';
import PublicationsTab from './PublicationsTab';

const VisualizationsSection = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <Tabs defaultValue="consensus" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="consensus">Scientific Consensus</TabsTrigger>
          <TabsTrigger value="impacts">Climate Impacts</TabsTrigger>
          <TabsTrigger value="publications">Key Publications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="consensus">
          <ConsensusTab />
        </TabsContent>
        
        <TabsContent value="impacts">
          <ImpactsTab />
        </TabsContent>
        
        <TabsContent value="publications">
          <PublicationsTab />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default VisualizationsSection;
