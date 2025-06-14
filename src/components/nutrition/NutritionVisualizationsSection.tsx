
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const consensusData = [
  { name: 'Support', value: 92 },
  { name: 'Against', value: 8 }
];

const CHART_COLORS = ['#4CAF50', '#F44336'];

const NutritionVisualizationsSection = () => {
  return (
    <Tabs defaultValue="consensus" className="w-full">
      <TabsList className="mb-8">
        <TabsTrigger value="consensus">Scientific Consensus</TabsTrigger>
        <TabsTrigger value="guidelines">Dietary Guidelines</TabsTrigger>
        <TabsTrigger value="research">Research Trends</TabsTrigger>
      </TabsList>
      
      <TabsContent value="consensus">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Scientific Consensus on Nutrition Science</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <p className="mb-6">
                  Nutrition scientists widely agree on fundamental principles of healthy eating, including the importance 
                  of balanced diets, adequate fruit and vegetable intake, and limiting processed foods. Evidence-based 
                  nutrition recommendations are supported by extensive research.
                </p>
                <p>
                  Meta-analyses and systematic reviews consistently show the health benefits of following established 
                  dietary guidelines and the risks associated with poor nutrition.
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
