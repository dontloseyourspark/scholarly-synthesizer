
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import ConsensusChart from '@/components/common/ConsensusChart';

const consensusData = [
  { name: 'Promising', value: 75, color: '#4CAF50' },
  { name: 'Uncertain', value: 25, color: '#FFA726' }
];

const consensusDescription = [
  "75% of quantum physicists and computer scientists view quantum computing as promising, representing a revolutionary approach to computation with the potential to solve certain problems exponentially faster than classical computers.",
  "However, 25% remain uncertain about the timeline and practical viability of quantum computing applications, citing significant technical challenges that remain to be overcome."
];

const qubitProgressData = [
  { year: 2016, ibm: 5, google: 9, ionq: 11 },
  { year: 2017, ibm: 16, google: 20, ionq: 11 },
  { year: 2018, ibm: 20, google: 72, ionq: 11 },
  { year: 2019, ibm: 53, google: 53, ionq: 32 },
  { year: 2020, ibm: 65, google: 53, ionq: 32 },
  { year: 2021, ibm: 127, google: 53, ionq: 32 },
  { year: 2022, ibm: 433, google: 70, ionq: 32 },
  { year: 2023, ibm: 1121, google: 70, ionq: 36 },
];

const quantumVolumeData = [
  { year: 2017, volume: 4 },
  { year: 2018, volume: 8 },
  { year: 2019, volume: 16 },
  { year: 2020, volume: 64 },
  { year: 2021, volume: 128 },
  { year: 2022, volume: 512 },
  { year: 2023, volume: 2048 },
];

const applicationAreasData = [
  { area: 'Cryptography', potential: 95 },
  { area: 'Drug Discovery', potential: 88 },
  { area: 'Optimization', potential: 82 },
  { area: 'Material Science', potential: 85 },
  { area: 'AI/ML', potential: 78 },
  { area: 'Financial Modeling', potential: 73 },
];

const investmentData = [
  { year: 2016, investment: 0.3 },
  { year: 2017, investment: 0.5 },
  { year: 2018, investment: 0.9 },
  { year: 2019, investment: 1.4 },
  { year: 2020, investment: 2.1 },
  { year: 2021, investment: 3.8 },
  { year: 2022, investment: 5.2 },
  { year: 2023, investment: 7.1 },
];

const QuantumVisualizationsSection = () => {
  return (
    <Tabs defaultValue="consensus" className="w-full">
      <TabsList className="mb-8 flex-wrap h-auto">
        <TabsTrigger value="consensus">Scientific Consensus</TabsTrigger>
        <TabsTrigger value="qubits">Qubit Progress</TabsTrigger>
        <TabsTrigger value="volume">Quantum Volume</TabsTrigger>
        <TabsTrigger value="applications">Application Areas</TabsTrigger>
        <TabsTrigger value="investment">Investment Trends</TabsTrigger>
      </TabsList>
      
      <TabsContent value="consensus">
        <ConsensusChart
          title="Scientific Consensus on Quantum Computing"
          data={consensusData}
          description={consensusDescription}
          source="Quantum physics and computer science research communities"
        />
      </TabsContent>
      
      <TabsContent value="qubits">
        <Card>
          <CardHeader>
            <CardTitle>Qubit Count Progress</CardTitle>
            <CardDescription>Number of physical qubits in quantum processors by major companies</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{
              ibm: { label: "IBM", color: "hsl(221, 83%, 53%)" },
              google: { label: "Google", color: "hsl(142, 71%, 45%)" },
              ionq: { label: "IonQ", color: "hsl(280, 83%, 53%)" }
            }} className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={qubitProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: 'Number of Qubits', angle: -90, position: 'insideLeft' }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="ibm" stroke="hsl(221, 83%, 53%)" strokeWidth={2} name="IBM" />
                  <Line type="monotone" dataKey="google" stroke="hsl(142, 71%, 45%)" strokeWidth={2} name="Google" />
                  <Line type="monotone" dataKey="ionq" stroke="hsl(280, 83%, 53%)" strokeWidth={2} name="IonQ" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <p className="text-sm text-muted-foreground mt-4">
              Source: Company announcements and Nature Quantum Information reports
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="volume">
        <Card>
          <CardHeader>
            <CardTitle>Quantum Volume Growth</CardTitle>
            <CardDescription>IBM's Quantum Volume metric showing quantum computer performance improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{
              volume: { label: "Quantum Volume", color: "hsl(221, 83%, 53%)" }
            }} className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={quantumVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: 'Quantum Volume', angle: -90, position: 'insideLeft' }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="volume" stroke="hsl(221, 83%, 53%)" strokeWidth={3} name="Quantum Volume" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <p className="text-sm text-muted-foreground mt-4">
              Source: IBM Quantum Roadmap & Research Reports
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="applications">
        <Card>
          <CardHeader>
            <CardTitle>Quantum Computing Application Potential</CardTitle>
            <CardDescription>Expert assessment of quantum advantage potential across different fields (%)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{
              potential: { label: "Potential Impact", color: "hsl(142, 71%, 45%)" }
            }} className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={applicationAreasData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="area" />
                  <YAxis label={{ value: 'Potential Impact (%)', angle: -90, position: 'insideLeft' }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="potential" fill="hsl(142, 71%, 45%)" name="Potential Impact (%)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <p className="text-sm text-muted-foreground mt-4">
              Source: McKinsey Quantum Computing Report & IEEE Quantum Week surveys
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="investment">
        <Card>
          <CardHeader>
            <CardTitle>Global Quantum Computing Investment</CardTitle>
            <CardDescription>Annual investment in quantum computing R&D (billions USD)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{
              investment: { label: "Investment", color: "hsl(24, 95%, 53%)" }
            }} className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={investmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: 'Investment (Billions USD)', angle: -90, position: 'insideLeft' }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="investment" stroke="hsl(24, 95%, 53%)" strokeWidth={3} name="Investment (Billions USD)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <p className="text-sm text-muted-foreground mt-4">
              Source: Global Quantum Intelligence, BCG Analysis
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default QuantumVisualizationsSection;
