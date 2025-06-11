
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const consensusData = [
  { name: 'Support vaccine efficacy', value: 97 },
  { name: 'Other/Uncertain', value: 3 }
];

const CHART_COLORS = ['#0A2463', '#D1D5DB'];

const VaccineVisualizationsSection = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <Tabs defaultValue="consensus" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="consensus">Scientific Consensus</TabsTrigger>
          <TabsTrigger value="efficacy">Vaccine Efficacy</TabsTrigger>
          <TabsTrigger value="safety">Safety Data</TabsTrigger>
          <TabsTrigger value="coverage">Coverage Rates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="consensus">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Scientific Consensus on Vaccine Efficacy</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <p className="mb-6">
                    Extensive research and clinical trials consistently demonstrate that vaccines are highly effective at preventing 
                    infectious diseases. The scientific consensus is overwhelming, with studies showing vaccines have prevented 
                    millions of deaths and cases of serious illness.
                  </p>
                  <p>
                    Multiple meta-analyses and systematic reviews confirm the safety and efficacy of vaccines across different 
                    populations and age groups.
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
        
        <TabsContent value="efficacy">
          <Card>
            <CardHeader>
              <CardTitle>Vaccine Efficacy Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Clinical trial data showing efficacy rates across different vaccine types and populations.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="safety">
          <Card>
            <CardHeader>
              <CardTitle>Safety Monitoring Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Comprehensive safety data from clinical trials and post-market surveillance systems.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="coverage">
          <Card>
            <CardHeader>
              <CardTitle>Vaccination Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Global and regional vaccination coverage rates and their impact on disease prevention.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default VaccineVisualizationsSection;
