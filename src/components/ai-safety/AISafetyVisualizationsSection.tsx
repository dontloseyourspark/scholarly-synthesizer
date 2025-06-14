
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const consensusData = [
  { name: 'Support', value: 85 },
  { name: 'Against', value: 15 }
];

const CHART_COLORS = ['#4CAF50', '#F44336'];

const AISafetyVisualizationsSection = () => {
  return (
    <Tabs defaultValue="consensus" className="w-full">
      <TabsList className="mb-8">
        <TabsTrigger value="consensus">Scientific Consensus</TabsTrigger>
        <TabsTrigger value="risks">AI Risk Assessment</TabsTrigger>
        <TabsTrigger value="timeline">Development Timeline</TabsTrigger>
      </TabsList>
      
      <TabsContent value="consensus">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Scientific Consensus on AI Safety</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <p className="mb-6">
                  Leading AI researchers and scientists increasingly recognize the importance of AI safety research. 
                  There is growing consensus that as AI systems become more capable, ensuring their safe and beneficial 
                  development becomes critical.
                </p>
                <p>
                  Multiple surveys of AI researchers show significant concern about potential risks from advanced AI systems 
                  and the need for proactive safety measures.
                </p>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={consensusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {consensusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
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
