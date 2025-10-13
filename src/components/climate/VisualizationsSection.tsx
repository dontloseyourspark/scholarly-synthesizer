
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ConsensusTab from './ConsensusTab';
import ImpactsTab from './ImpactsTab';
import PublicationsTab from './PublicationsTab';

// Temperature anomaly data (relative to 1951-1980 average)
const temperatureData = [
  { year: '1880', temp: -0.16 },
  { year: '1900', temp: -0.08 },
  { year: '1920', temp: -0.27 },
  { year: '1940', temp: 0.13 },
  { year: '1960', temp: -0.03 },
  { year: '1980', temp: 0.26 },
  { year: '2000', temp: 0.61 },
  { year: '2020', temp: 1.02 },
  { year: '2023', temp: 1.17 }
];

// Global CO2 emissions by sector
const emissionsBySector = [
  { name: 'Energy', value: 73.2, color: '#ef4444' },
  { name: 'Agriculture', value: 18.4, color: '#f59e0b' },
  { name: 'Industry', value: 5.2, color: '#8b5cf6' },
  { name: 'Waste', value: 3.2, color: '#06b6d4' }
];

// Sea level rise data (mm relative to 1993)
const seaLevelData = [
  { year: '1993', level: 0 },
  { year: '1998', level: 22 },
  { year: '2003', level: 38 },
  { year: '2008', level: 52 },
  { year: '2013', level: 68 },
  { year: '2018', level: 82 },
  { year: '2023', level: 101 }
];

// Arctic sea ice extent (million km²)
const arcticIceData = [
  { year: '1979', extent: 7.2 },
  { year: '1990', extent: 6.8 },
  { year: '2000', extent: 6.4 },
  { year: '2010', extent: 5.5 },
  { year: '2020', extent: 4.3 },
  { year: '2023', extent: 4.1 }
];

const VisualizationsSection = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <Tabs defaultValue="consensus" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="consensus">Scientific Consensus</TabsTrigger>
          <TabsTrigger value="temperature">Temperature Trends</TabsTrigger>
          <TabsTrigger value="emissions">Emissions by Sector</TabsTrigger>
          <TabsTrigger value="sealevel">Sea Level Rise</TabsTrigger>
          <TabsTrigger value="arcticice">Arctic Ice Extent</TabsTrigger>
          <TabsTrigger value="impacts">Climate Impacts</TabsTrigger>
          {/* <TabsTrigger value="publications">Key Publications</TabsTrigger> */}
        </TabsList>
        
        <TabsContent value="consensus">
          <ConsensusTab />
        </TabsContent>

        <TabsContent value="temperature">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Global Temperature Anomaly</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <p className="mb-6">
                Global surface temperature has risen by approximately 1.2°C since pre-industrial times. 
                The chart shows temperature anomalies relative to the 1951-1980 average, with most of the 
                warming occurring in the past 40 years.
              </p>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={temperatureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis label={{ value: 'Temperature Anomaly (°C)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={2} name="Temperature Change (°C)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Source: NASA Goddard Institute for Space Studies (GISS)
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emissions">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Global Greenhouse Gas Emissions by Sector</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <p className="mb-6">
                Energy production accounts for the majority of global greenhouse gas emissions, followed by 
                agriculture, industrial processes, and waste. Understanding the sources of emissions is crucial 
                for developing effective mitigation strategies.
              </p>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={emissionsBySector}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {emissionsBySector.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Source: Intergovernmental Panel on Climate Change (IPCC)
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sealevel">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Global Mean Sea Level Rise</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <p className="mb-6">
                Global mean sea level has risen by about 101mm since 1993, with the rate of increase accelerating. 
                This rise is primarily due to thermal expansion of seawater and melting of glaciers and ice sheets.
              </p>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={seaLevelData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis label={{ value: 'Sea Level Rise (mm)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="level" stroke="#06b6d4" strokeWidth={2} name="Sea Level (mm)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Source: NASA Sea Level Change Portal
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="arcticice">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Arctic Sea Ice Extent Decline</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <p className="mb-6">
                Arctic sea ice extent has declined dramatically since satellite observations began in 1979. 
                September minimum ice extent has decreased by about 13% per decade, with significant implications 
                for global climate patterns and Arctic ecosystems.
              </p>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={arcticIceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis label={{ value: 'Ice Extent (million km²)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="extent" stroke="#3b82f6" strokeWidth={2} name="Ice Extent" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Source: National Snow and Ice Data Center (NSIDC)
              </p>
            </CardContent>
          </Card>
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
