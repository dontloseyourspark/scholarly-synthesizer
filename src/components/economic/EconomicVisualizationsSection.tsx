
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Legend } from 'recharts';

const consensusData = [
  { name: 'Net positive economic impact', value: 78, color: '#0A2463' },
  { name: 'Mixed/Uncertain views', value: 22, color: '#D1D5DB' }
];

const laborMarketData = [
  { sector: 'Agriculture', nativeWages: 0.2, immigrantShare: 36 },
  { sector: 'Construction', nativeWages: -0.1, immigrantShare: 25 },
  { sector: 'Hospitality', nativeWages: 0.3, immigrantShare: 23 },
  { sector: 'Healthcare', nativeWages: 0.8, immigrantShare: 18 },
  { sector: 'Technology', nativeWages: 1.2, immigrantShare: 32 }
];

const fiscalImpactData = [
  { timeframe: 'First 10 years', impact: -2.4 },
  { timeframe: '11-20 years', impact: 1.8 },
  { timeframe: '21-30 years', impact: 4.2 },
  { timeframe: 'Lifetime total', impact: 3.6 }
];

const CHART_COLORS = ['#0A2463', '#D1D5DB'];

const EconomicVisualizationsSection = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <Tabs defaultValue="consensus" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="consensus">Economic Consensus</TabsTrigger>
          <TabsTrigger value="impacts">Fiscal Impact</TabsTrigger>
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
                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                      >
                        {consensusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="impacts">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Fiscal Impact Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="mb-4">
                  Immigration's fiscal impact varies significantly over time. While there may be initial costs, 
                  immigrants typically become net fiscal contributors as they establish careers and pay taxes.
                </p>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={fiscalImpactData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timeframe" angle={-45} textAnchor="end" height={70} />
                    <YAxis label={{ value: 'Net Fiscal Impact (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Net Fiscal Impact']} />
                    <Bar dataKey="impact" fill="#0A2463" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-600 mt-4">Source: National Academy of Sciences economic analysis</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Labor Market Effects by Sector</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="mb-4">
                  Immigration effects vary by economic sector. This chart shows the relationship between 
                  immigrant workforce participation and wage effects for native workers.
                </p>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={laborMarketData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sector" angle={-45} textAnchor="end" height={70} />
                    <YAxis label={{ value: 'Native Wage Change (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="nativeWages" stroke="#0A2463" name="Native Wage Change %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-600 mt-4">Source: Bureau of Labor Statistics and economic research studies</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default EconomicVisualizationsSection;
