import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ConsensusChart from '@/components/common/ConsensusChart';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const consensusData = [
  { name: 'Concerned', value: 78, color: '#FF9800' },
  { name: 'Not concerned', value: 22, color: '#4CAF50' }
];

const consensusDescription = [
  "Leading AI researchers and scientists increasingly recognize the importance of AI safety research. There is growing consensus that as AI systems become more capable, ensuring their safe and beneficial development becomes critical.",
  "Multiple surveys of AI researchers show significant concern about potential risks from advanced AI systems and the need for proactive safety measures."
];

const riskLevelData = [
  { risk: 'Existential Risk', researchers: 48, color: '#F44336' },
  { risk: 'High Impact', researchers: 67, color: '#FF9800' },
  { risk: 'Medium Impact', researchers: 78, color: '#FFC107' },
  { risk: 'Low Impact', researchers: 21, color: '#4CAF50' }
];

const timelineData = [
  { year: '2015', concerns: 35, funding: 20 },
  { year: '2017', concerns: 48, funding: 35 },
  { year: '2019', concerns: 62, funding: 55 },
  { year: '2021', concerns: 71, funding: 78 },
  { year: '2023', concerns: 78, funding: 92 }
];

const priorityAreasData = [
  { name: 'Alignment', value: 32, color: '#2196F3' },
  { name: 'Robustness', value: 24, color: '#4CAF50' },
  { name: 'Interpretability', value: 22, color: '#FF9800' },
  { name: 'Governance', value: 22, color: '#9C27B0' }
];

const AISafetyVisualizationsSection = () => {
  return (
    <Tabs defaultValue="consensus" className="w-full">
      <TabsList className="mb-8">
        <TabsTrigger value="consensus">Scientific Consensus</TabsTrigger>
        <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
        <TabsTrigger value="timeline">Research Timeline</TabsTrigger>
        <TabsTrigger value="priorities">Priority Areas</TabsTrigger>
      </TabsList>
      
      <TabsContent value="consensus">
        <ConsensusChart
          title="Scientific Consensus on AI Safety"
          data={consensusData}
          description={consensusDescription}
          source="Surveys of AI researchers and safety experts"
        />
      </TabsContent>
      
      <TabsContent value="risks">
        <Card>
          <CardHeader>
            <CardTitle>AI Risk Assessment by Researchers</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={riskLevelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="risk" />
                <YAxis label={{ value: 'Percentage of Researchers (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="researchers" name="Researchers Concerned (%)">
                  {riskLevelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-sm text-muted-foreground mt-4">
              Source: AI Impacts Survey, FLI Surveys (2015-2023) &nbsp;
              <a data-lov-name="Link"  data-component-name="Link" className="text-scholarly-blue transition-colors underline hover:text-scholarly-blue/80"
                 href="https://arxiv.org/pdf/2401.02843" data-discover="true">Read more here</a> 
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="timeline">
        <Card>
          <CardHeader>
            <CardTitle>AI Safety Research Growth (2015-2023)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis label={{ value: 'Index (Baseline 2015 = 100)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="concerns" stroke="#F44336" strokeWidth={2} name="Research Concerns" />
                <Line type="monotone" dataKey="funding" stroke="#4CAF50" strokeWidth={2} name="Funding Allocation" />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-sm text-muted-foreground mt-4">
              Source: AI Safety research publications and funding databases &nbsp;
              <a data-lov-name="Link"  data-component-name="Link" className="text-scholarly-blue transition-colors underline hover:text-scholarly-blue/80"
                 href="https://safe.ai/" data-discover="true">Read more here</a> 
            </p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="priorities">
        <Card>
          <CardHeader>
            <CardTitle>AI Safety Research Priority Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={priorityAreasData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {priorityAreasData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-sm text-muted-foreground mt-4">
              Source: Analysis of AI safety research papers and grant allocations (2020-2023) &nbsp;
               <a data-lov-name="Link"  data-component-name="Link" className="text-scholarly-blue transition-colors underline hover:text-scholarly-blue/80"
                 href="https://arxiv.org/html/2505.00174v2#:~:text=Abstract,-Report%20issue%20for&text=Drawing%20on%201%2C178%20safety%20and,of%20in%2Dmarket%20AI%20behaviors.&text=Keywords:%20AI%20research;%20alignment;,;%20cloud%20providers;%20model%20developers." data-discover="true">Read more here</a> and &nbsp;
                 <a data-lov-name="Link"  data-component-name="Link" className="text-scholarly-blue transition-colors underline hover:text-scholarly-blue/80"
                 href="https://forum.effectivealtruism.org/posts/XdhwXppfqrpPL2YDX/an-overview-of-the-ai-safety-funding-situation#:~:text=The%20FTX%20Future%20Fund%20was,Prizes%20at%20ECCV%2C%20$30k" data-discover="true">here</a> 
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AISafetyVisualizationsSection;
