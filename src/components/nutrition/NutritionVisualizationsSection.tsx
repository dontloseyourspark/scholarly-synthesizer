
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import ConsensusChart from '@/components/common/ConsensusChart';

const consensusData = [
  { name: 'Support', value: 85, color: '#4CAF50' },
  { name: 'Limited Evidence', value: 15, color: '#FF9800' }
];

const consensusDescription = [
  "Nutrition scientists widely agree on fundamental principles of healthy eating, including the importance of balanced diets, adequate fruit and vegetable intake, and limiting processed foods. Evidence-based nutrition recommendations are supported by extensive research.",
  "Meta-analyses and systematic reviews consistently show the health benefits of following established dietary guidelines and the risks associated with poor nutrition."
];

const dietaryPatternsData = [
  { year: 2000, mediterranean: 28, western: 42, plantBased: 18 },
  { year: 2005, mediterranean: 26, western: 41, plantBased: 20 },
  { year: 2010, mediterranean: 24, western: 39, plantBased: 23 },
  { year: 2015, mediterranean: 23, western: 37, plantBased: 26 },
  { year: 2020, mediterranean: 22, western: 35, plantBased: 29 },
];

const nutrientDeficiencyData = [
  { nutrient: 'Vitamin D', prevalence: 42 },
  { nutrient: 'Iron', prevalence: 33 },
  { nutrient: 'Vitamin B12', prevalence: 15 },
  { nutrient: 'Calcium', prevalence: 28 },
  { nutrient: 'Omega-3', prevalence: 38 },
];

const processedFoodsData = [
  { year: 2000, consumption: 52 },
  { year: 2005, consumption: 58 },
  { year: 2010, consumption: 63 },
  { year: 2015, consumption: 68 },
  { year: 2020, consumption: 71 },
  { year: 2023, consumption: 73 },
];

const obesityRatesData = [
  { region: 'North America', rate: 36 },
  { region: 'Europe', rate: 23 },
  { region: 'Asia', rate: 14 },
  { region: 'Latin America', rate: 28 },
  { region: 'Middle East', rate: 31 },
];

const NutritionVisualizationsSection = () => {
  return (
    <Tabs defaultValue="consensus" className="w-full">
      <TabsList className="mb-8 flex-wrap h-auto">
        <TabsTrigger value="consensus">Scientific Consensus</TabsTrigger>
        <TabsTrigger value="patterns">Dietary Patterns</TabsTrigger>
        <TabsTrigger value="deficiencies">Nutrient Deficiencies</TabsTrigger>
        <TabsTrigger value="processed">Ultra-Processed Foods</TabsTrigger>
        <TabsTrigger value="obesity">Obesity Rates</TabsTrigger>
      </TabsList>
      
      <TabsContent value="consensus">
        <ConsensusChart
          title="Scientific Consensus on Nutrition Science"
          data={consensusData}
          description={consensusDescription}
          source="Nutrition research reviews and dietary guideline organizations"
        />
      </TabsContent>
      
      <TabsContent value="patterns">
        <Card>
          <CardHeader>
            <CardTitle>Mortality Risk by Dietary Pattern</CardTitle>
            <CardDescription>Relative mortality risk (%) across different dietary patterns over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{
              mediterranean: { label: "Mediterranean Diet", color: "hsl(142, 71%, 45%)" },
              western: { label: "Western Diet", color: "hsl(0, 84%, 60%)" },
              plantBased: { label: "Plant-Based Diet", color: "hsl(221, 83%, 53%)" }
            }} className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dietaryPatternsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: 'Mortality Risk (%)', angle: -90, position: 'insideLeft' }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="mediterranean" stroke="hsl(142, 71%, 45%)" strokeWidth={2} name="Mediterranean Diet" />
                  <Line type="monotone" dataKey="western" stroke="hsl(0, 84%, 60%)" strokeWidth={2} name="Western Diet" />
                  <Line type="monotone" dataKey="plantBased" stroke="hsl(221, 83%, 53%)" strokeWidth={2} name="Plant-Based Diet" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <p className="text-sm text-muted-foreground mt-4">
              Source: Global Burden of Disease Study, Harvard T.H. Chan School of Public Health
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="deficiencies">
        <Card>
          <CardHeader>
            <CardTitle>Nutrient Deficiency Prevalence</CardTitle>
            <CardDescription>Percentage of global population affected by common nutrient deficiencies</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{
              prevalence: { label: "Prevalence", color: "hsl(24, 95%, 53%)" }
            }} className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={nutrientDeficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nutrient" />
                  <YAxis label={{ value: 'Prevalence (%)', angle: -90, position: 'insideLeft' }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="prevalence" fill="hsl(24, 95%, 53%)" name="Prevalence (%)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <p className="text-sm text-muted-foreground mt-4">
              Source: WHO Global Nutrition Report 2023
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="processed">
        <Card>
          <CardHeader>
            <CardTitle>Ultra-Processed Foods Consumption</CardTitle>
            <CardDescription>Percentage of daily caloric intake from ultra-processed foods in developed countries</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{
              consumption: { label: "Consumption", color: "hsl(0, 84%, 60%)" }
            }} className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={processedFoodsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: 'Daily Caloric Intake (%)', angle: -90, position: 'insideLeft' }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="consumption" stroke="hsl(0, 84%, 60%)" strokeWidth={3} name="Consumption (%)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <p className="text-sm text-muted-foreground mt-4">
              Source: BMJ Open, PLOS Medicine - Meta-analysis of dietary surveys
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="obesity">
        <Card>
          <CardHeader>
            <CardTitle>Global Obesity Rates by Region</CardTitle>
            <CardDescription>Adult obesity prevalence (%) across major world regions (2023)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{
              rate: { label: "Obesity Rate", color: "hsl(280, 83%, 53%)" }
            }} className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={obesityRatesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis label={{ value: 'Obesity Rate (%)', angle: -90, position: 'insideLeft' }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="rate" fill="hsl(280, 83%, 53%)" name="Obesity Rate (%)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <p className="text-sm text-muted-foreground mt-4">
              Source: WHO Obesity Atlas 2023
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default NutritionVisualizationsSection;
