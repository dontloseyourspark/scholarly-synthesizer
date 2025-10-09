
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import ConsensusChart from '@/components/common/ConsensusChart';

const consensusData = [
  { name: 'Support', value: 75, color: '#4CAF50' },
  { name: 'Against', value: 25, color: '#F44336' }
];

const consensusDescription = [
  "Most economists agree that immigration has a net positive impact on the economy over the long term. Research consistently shows that immigrants contribute to economic growth through labor force participation, entrepreneurship, and innovation.",
  "While there may be short-term adjustments in specific sectors or regions, the overall economic consensus supports the beneficial effects of immigration on economic development."
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

const gdpContributionData = [
  { year: '2010', contribution: 11.2 },
  { year: '2012', contribution: 11.8 },
  { year: '2014', contribution: 12.3 },
  { year: '2016', contribution: 12.9 },
  { year: '2018', contribution: 13.4 },
  { year: '2020', contribution: 13.8 }
];

const innovationData = [
  { year: '2010', patents: 24.2, startups: 18.5 },
  { year: '2012', patents: 26.1, startups: 20.3 },
  { year: '2014', patents: 27.8, startups: 22.1 },
  { year: '2016', patents: 29.4, startups: 24.7 },
  { year: '2018', patents: 30.8, startups: 27.2 },
  { year: '2020', patents: 31.5, startups: 28.9 }
];

const entrepreneurshipData = [
  { category: 'Native-born', rate: 0.31 },
  { category: 'Immigrants', rate: 0.42 }
];

const EconomicVisualizationsSection = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <Tabs defaultValue="consensus" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="consensus">Economic Consensus</TabsTrigger>
          <TabsTrigger value="impacts">Fiscal Impact</TabsTrigger>
          <TabsTrigger value="data">Labor Market Data</TabsTrigger>
          <TabsTrigger value="gdp">GDP Contribution</TabsTrigger>
          <TabsTrigger value="innovation">Innovation & Patents</TabsTrigger>
          <TabsTrigger value="entrepreneurship">Entrepreneurship</TabsTrigger>
        </TabsList>
        
        <TabsContent value="consensus">
          <ConsensusChart
            title="Economic Consensus on Immigration"
            data={consensusData}
            description={consensusDescription}
            source="Surveys of economists and economic research studies"
          />
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

        <TabsContent value="gdp">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Immigrant Contribution to GDP</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="mb-4">
                  Immigrants contribute significantly to the U.S. economy, with their share of GDP growing steadily. 
                  This reflects their increasing workforce participation and economic productivity.
                </p>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={gdpContributionData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis label={{ value: 'GDP Contribution (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => [`${value}%`, 'GDP Contribution']} />
                    <Line type="monotone" dataKey="contribution" stroke="#0A2463" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-600 mt-4">Source: Bureau of Economic Analysis</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="innovation">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Innovation & Entrepreneurship Contributions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="mb-4">
                  Immigrants play a disproportionate role in innovation and entrepreneurship, contributing to 
                  patents and founding startups at rates exceeding their population share.
                </p>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={innovationData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => [`${value}%`, '']} />
                    <Line type="monotone" dataKey="patents" stroke="#0A2463" strokeWidth={2} name="Patent Share" />
                    <Line type="monotone" dataKey="startups" stroke="#4CAF50" strokeWidth={2} name="Startup Founders" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-600 mt-4">Source: U.S. Patent Office and Kauffman Foundation</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="entrepreneurship">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Entrepreneurship Rates Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="mb-4">
                  Immigrants demonstrate higher entrepreneurship rates compared to native-born Americans, 
                  starting new businesses at significantly higher rates per capita.
                </p>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={entrepreneurshipData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis label={{ value: 'Monthly Entrepreneurship Rate', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Rate']} />
                    <Bar dataKey="rate" fill="#0A2463" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-600 mt-4">Source: Kauffman Index of Startup Activity</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default EconomicVisualizationsSection;
