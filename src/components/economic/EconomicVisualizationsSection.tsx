
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const consensusData = [
  { name: 'Immigration has net positive economic impact', value: 78 },
  { name: 'Other/Mixed/Uncertain', value: 22 }
];

const CHART_COLORS = ['#0A2463', '#D1D5DB'];

const EconomicVisualizationsSection = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <Tabs defaultValue="consensus" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="consensus">Economic Consensus</TabsTrigger>
          <TabsTrigger value="impacts">Economic Impacts</TabsTrigger>
          <TabsTrigger value="data">Labor Market Data</TabsTrigger>
        </TabsList>
        
        <TabsContent value="consensus">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Economic Consensus on Immigration</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <p className="mb-6">
                    Most economists agree that immigration has a net positive impact on the economy over the long term. 
                    Research consistently shows that immigrants contribute to economic growth through labor force 
                    participation, entrepreneurship, and innovation.
                  </p>
                  <p>
                    While there may be short-term adjustments in specific sectors or regions, the overall economic 
                    consensus supports the beneficial effects of immigration on economic development.
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
        
        <TabsContent value="impacts">
          <Card>
            <CardHeader>
              <CardTitle>Economic Impacts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Charts and graphs showing economic impacts of immigration across different metrics.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Labor Market Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Analysis of labor market effects and employment patterns related to immigration.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default EconomicVisualizationsSection;
