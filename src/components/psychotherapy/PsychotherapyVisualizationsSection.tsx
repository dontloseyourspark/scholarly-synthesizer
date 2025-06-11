
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const consensusData = [
  { name: 'Support psychotherapy effectiveness', value: 89 },
  { name: 'Other/Uncertain', value: 11 }
];

const CHART_COLORS = ['#0A2463', '#D1D5DB'];

const PsychotherapyVisualizationsSection = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <Tabs defaultValue="consensus" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="consensus">Clinical Consensus</TabsTrigger>
          <TabsTrigger value="effectiveness">Treatment Effectiveness</TabsTrigger>
          <TabsTrigger value="outcomes">Patient Outcomes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="consensus">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Clinical Consensus on Psychotherapy</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <p className="mb-6">
                    Mental health professionals and researchers have strong consensus that psychotherapy is effective 
                    for treating a wide range of mental health conditions. Meta-analyses consistently demonstrate 
                    significant benefits for patients receiving psychological treatments.
                  </p>
                  <p>
                    Evidence-based therapies have been rigorously tested and shown to be effective for conditions 
                    such as depression, anxiety, PTSD, and many other psychological disorders.
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
    </section>
  );
};

export default PsychotherapyVisualizationsSection;
