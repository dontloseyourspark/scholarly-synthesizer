
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ConsensusChart from '@/components/common/ConsensusChart';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const consensusData = [
  { name: 'Effective', value: 92.5, color: '#4CAF50' },
  { name: 'Not Effective', value: 7.5, color: '#F44336' }
];

const consensusDescription = [
  "Mental health professionals and researchers have strong consensus that psychotherapy is effective for treating a wide range of mental health conditions. Meta-analyses consistently demonstrate significant benefits for patients receiving psychological treatments.",
  "Evidence-based therapies have been rigorously tested and shown to be effective for conditions such as depression, anxiety, PTSD, and many other psychological disorders."
];

const effectivenessData = [
  { condition: 'Depression', effectSize: 0.75, percentage: 75 },
  { condition: 'Anxiety Disorders', effectSize: 0.85, percentage: 85 },
  { condition: 'PTSD', effectSize: 0.80, percentage: 80 },
  { condition: 'OCD', effectSize: 0.78, percentage: 78 },
  { condition: 'Panic Disorder', effectSize: 0.82, percentage: 82 },
  { condition: 'Social Anxiety', effectSize: 0.77, percentage: 77 }
];

const therapyComparisonData = [
  { therapy: 'CBT', effectiveness: 82, evidenceQuality: 'High' },
  { therapy: 'Psychodynamic', effectiveness: 75, evidenceQuality: 'Moderate' },
  { therapy: 'Humanistic', effectiveness: 70, evidenceQuality: 'Moderate' },
  { therapy: 'EMDR', effectiveness: 78, evidenceQuality: 'High' },
  { therapy: 'ACT', effectiveness: 76, evidenceQuality: 'High' },
  { therapy: 'DBT', effectiveness: 80, evidenceQuality: 'High' }
];

const outcomeTimelineData = [
  { sessions: 4, improvement: 35 },
  { sessions: 8, improvement: 55 },
  { sessions: 12, improvement: 68 },
  { sessions: 16, improvement: 75 },
  { sessions: 20, improvement: 80 },
  { sessions: 24, improvement: 83 }
];

const remissionRatesData = [
  { name: 'Full Remission', value: 45, color: '#4CAF50' },
  { name: 'Partial Remission', value: 30, color: '#2196F3' },
  { name: 'No Change', value: 20, color: '#FF9800' },
  { name: 'Worsening', value: 5, color: '#F44336' }
];

const COLORS = ['#4CAF50', '#2196F3', '#FF9800', '#F44336'];

const PsychotherapyVisualizationsSection = () => {
  return (
    <Tabs defaultValue="consensus" className="w-full">
      <TabsList className="mb-8 flex-wrap h-auto">
        <TabsTrigger value="consensus">Clinical Consensus</TabsTrigger>
        <TabsTrigger value="effectiveness">Effectiveness by Condition</TabsTrigger>
        <TabsTrigger value="therapy-types">Therapy Types</TabsTrigger>
        <TabsTrigger value="timeline">Treatment Timeline</TabsTrigger>
        <TabsTrigger value="outcomes">Remission Rates</TabsTrigger>
      </TabsList>
      
      <TabsContent value="consensus">
        <ConsensusChart
          title="Clinical Consensus on Psychotherapy"
          data={consensusData}
          description={consensusDescription}
          source="Clinical psychology research and professional organizations"
        />
      </TabsContent>
      
      <TabsContent value="effectiveness">
        <Card>
          <CardHeader>
            <CardTitle>Treatment Effectiveness by Mental Health Condition</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Effect sizes and treatment success rates across various psychological disorders
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={effectivenessData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="condition" angle={-45} textAnchor="end" height={100} />
                <YAxis label={{ value: 'Effectiveness (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="percentage" fill="#4CAF50" name="Success Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-sm text-muted-foreground mt-4">
              Source: Meta-analyses of randomized controlled trials (Lambert & Ogles, 2004; Hofmann et al., 2012)
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="therapy-types">
        <Card>
          <CardHeader>
            <CardTitle>Comparison of Evidence-Based Therapy Approaches</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Effectiveness rates of different therapeutic modalities
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={therapyComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="therapy" />
                <YAxis label={{ value: 'Effectiveness Rating', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="effectiveness" fill="#2196F3" name="Effectiveness Score" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium">Evidence Quality Ratings:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {therapyComparisonData.map((therapy) => (
                  <li key={therapy.therapy}>
                    <strong>{therapy.therapy}:</strong> {therapy.evidenceQuality} quality evidence
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                Source: APA Division 12 Task Force on Evidence-Based Practice
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="timeline">
        <Card>
          <CardHeader>
            <CardTitle>Patient Improvement Over Treatment Duration</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Average symptom improvement as a function of therapy sessions
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={outcomeTimelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="sessions" 
                  label={{ value: 'Number of Sessions', position: 'insideBottom', offset: -5 }} 
                />
                <YAxis 
                  label={{ value: 'Symptom Improvement (%)', angle: -90, position: 'insideLeft' }} 
                />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="improvement" 
                  stroke="#4CAF50" 
                  strokeWidth={3}
                  name="Improvement Rate (%)"
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-sm text-muted-foreground mt-4">
              Source: Hansen, Lambert & Forman (2002). Dose-response relationship in psychotherapy
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="outcomes">
        <Card>
          <CardHeader>
            <CardTitle>Treatment Outcome Distribution</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Patient remission and recovery rates following psychotherapy
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={remissionRatesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {remissionRatesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>Full Remission:</strong> Complete resolution of symptoms meeting diagnostic criteria
              </p>
              <p>
                <strong>Partial Remission:</strong> Significant symptom reduction but some symptoms persist
              </p>
              <p className="mt-4">
                Source: DeRubeis et al. (2005); Cuijpers et al. (2014)
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default PsychotherapyVisualizationsSection;
