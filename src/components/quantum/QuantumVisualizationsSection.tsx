
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const consensusData = [
  { name: 'Support', value: 88 },
  { name: 'Against', value: 12 }
];

const CHART_COLORS = ['#4CAF50', '#F44336'];

const QuantumVisualizationsSection = () => {
  return (
    <Tabs defaultValue="consensus" className="w-full">
      <TabsList className="mb-8">
        <TabsTrigger value="consensus">Scientific Consensus</TabsTrigger>
        <TabsTrigger value="progress">Development Progress</TabsTrigger>
        <TabsTrigger value="applications">Potential Applications</TabsTrigger>
      </TabsList>
      
      <TabsContent value="consensus">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Scientific Consensus on Quantum Computing</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <p className="mb-6">
                  Quantum physicists and computer scientists widely agree that quantum computing represents a 
                  revolutionary approach to computation with the potential to solve certain problems exponentially 
                  faster than classical computers.
                </p>
                <p>
                  While challenges remain in building practical quantum computers, the scientific community 
                  has strong consensus on the theoretical foundations and potential applications of quantum computing.
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
