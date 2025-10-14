
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import ConsensusChart from '@/components/common/ConsensusChart';

const consensusData = [
  { name: 'Support', value: 95, color: '#4CAF50' },
  { name: 'Against', value: 5, color: '#F44336' }
];

const colours = [
  {name: 'hsl(var(--chart-1))', value: '#2463eb'},
  {name: 'hsl(var(--chart-2))', value: '#21c45d'},
  {name: 'hsl(var(--chart-3))', value: '#ef4343'}
];

const consensusDescription = [
  "Extensive research and clinical trials consistently demonstrate that vaccines are highly effective at preventing infectious diseases. The scientific consensus is overwhelming, with studies showing vaccines have prevented millions of deaths and cases of serious illness.",
  "Multiple meta-analyses and systematic reviews confirm the safety and efficacy of vaccines across different populations and age groups."
];

const diseaseIncidenceData = [
  { year: '1950', measles: 500000, polio: 35000, mumps: 150000 },
  { year: '1970', measles: 47000, polio: 10, mumps: 80000 },
  { year: '1990', measles: 27000, polio: 0, mumps: 5000 },
  { year: '2010', measles: 63, polio: 0, mumps: 2500 },
  { year: '2023', measles: 100, polio: 0, mumps: 1500 }
];

const vaccineCoverageData = [
  { region: 'North America', coverage: 92 },
  { region: 'Europe', coverage: 94 },
  { region: 'Asia', coverage: 86 },
  { region: 'Africa', coverage: 76 },
  { region: 'South America', coverage: 88 },
  { region: 'Oceania', coverage: 93 }
];

const efficacyRatesData = [
  { vaccine: 'Measles', efficacy: 97 },
  { vaccine: 'Polio', efficacy: 99 },
  { vaccine: 'Mumps', efficacy: 88 },
  { vaccine: 'Rubella', efficacy: 97 },
  { vaccine: 'Hepatitis B', efficacy: 95 },
  { vaccine: 'HPV', efficacy: 90 }
];

const adverseEventsData = [
  { severity: 'Mild (soreness)', rate: 15.2 },
  { severity: 'Moderate (fever)', rate: 3.8 },
  { severity: 'Serious', rate: 0.003 },
  { severity: 'Severe allergic', rate: 0.0001 }
];

const VaccineVisualizationsSection = () => {
  return (
    <Tabs defaultValue="consensus" className="w-full">
      <TabsList className="mb-8">
        <TabsTrigger value="consensus">Scientific Consensus</TabsTrigger>
        <TabsTrigger value="incidence">Disease Incidence</TabsTrigger>
        <TabsTrigger value="efficacy">Efficacy Rates</TabsTrigger>
        <TabsTrigger value="safety">Safety Data</TabsTrigger>
        <TabsTrigger value="coverage">Coverage Rates</TabsTrigger>
      </TabsList>
      
      <TabsContent value="consensus">
        <ConsensusChart
          title="Scientific Consensus on Vaccine Efficacy"
          data={consensusData}
          description={consensusDescription}
          source="Clinical trials and medical research studies"
        />
      </TabsContent>
      
      <TabsContent value="incidence">
        <Card>
          <CardHeader>
            <CardTitle>Disease Incidence Before and After Vaccination</CardTitle>
            <CardDescription>Dramatic reduction in disease cases following vaccine introduction (cases per 100,000)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                measles: { label: "Measles", color: colours[0].value },
                polio: { label: "Polio", color: colours[1].value },
                mumps: { label: "Mumps", color: colours[2].value }
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={diseaseIncidenceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="measles" stroke={colours[0].value} strokeWidth={2} />
                  <Line type="monotone" dataKey="polio" stroke={colours[1].value} strokeWidth={2} />
                  <Line type="monotone" dataKey="mumps" stroke={colours[2].value} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <p className="text-sm text-muted-foreground mt-4">
              Source: CDC and WHO vaccination impact studies &nbsp;
               <a data-lov-name="Link"  data-component-name="Link" className="text-scholarly-blue transition-colors underline hover:text-scholarly-blue/80"
                 href="https://www.who.int/health-topics/vaccines-and-immunization#tab=tab_1" data-discover="true">Read more here</a>
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="efficacy">
        <Card>
          <CardHeader>
            <CardTitle>Vaccine Efficacy Rates</CardTitle>
            <CardDescription>Clinical trial efficacy rates for major vaccines (%)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                efficacy: { label: "Efficacy Rate", color: colours[0].value }
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={efficacyRatesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vaccine" />
                  <YAxis domain={[0, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="efficacy" fill={colours[0].value} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <p className="text-sm text-muted-foreground mt-4">
              Source: FDA approval documents and clinical trial data &nbsp;
              <a data-lov-name="Link"  data-component-name="Link" className="text-scholarly-blue transition-colors underline hover:text-scholarly-blue/80"
                 href="https://www.who.int/news-room/feature-stories/detail/vaccine-efficacy-effectiveness-and-protection" data-discover="true">Read more here</a> and 
                 <a data-lov-name="Link"  data-component-name="Link" className="text-scholarly-blue transition-colors underline hover:text-scholarly-blue/80" 
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7656319/" data-discover="true"> here</a>
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="safety">
        <Card>
          <CardHeader>
            <CardTitle>Adverse Event Rates</CardTitle>
            <CardDescription>Reported adverse events per 100,000 vaccine doses</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                rate: { label: "Rate", color: colours[1].value }
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adverseEventsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="severity" type="category" width={150} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="rate" fill={colours[1].value} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <p className="text-sm text-muted-foreground mt-4">
              Source: VAERS and WHO Global Vaccine Safety Initiative data &nbsp;
              <a data-lov-name="Link"  data-component-name="Link" className="text-scholarly-blue transition-colors underline hover:text-scholarly-blue/80"
                 href="https://www.who.int/initiatives/the-global-vaccine-safety-initiative" data-discover="true">Read more here,</a> 
                 <a data-lov-name="Link"  data-component-name="Link" className="text-scholarly-blue transition-colors underline hover:text-scholarly-blue/80" 
                  href="https://vaers.hhs.gov/about.html" data-discover="true"> here</a> and 
                  <a data-lov-name="Link"  data-component-name="Link" className="text-scholarly-blue transition-colors underline hover:text-scholarly-blue/80" 
                  href="https://www.publichealthontario.ca/-/media/documents/ncov/epi/covid-19-aefi-report.pdf" data-discover="true"> here</a>
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="coverage">
        <Card>
          <CardHeader>
            <CardTitle>Global Vaccination Coverage</CardTitle>
            <CardDescription>Regional vaccination coverage rates for routine immunizations (%)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                coverage: { label: "Coverage Rate", color: colours[2].value }
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vaccineCoverageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis domain={[0, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="coverage" fill={colours[2].value} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <p className="text-sm text-muted-foreground mt-4">
              Source: WHO/UNICEF immunization coverage estimates &nbsp;
              <a data-lov-name="Link"  data-component-name="Link" className="text-scholarly-blue transition-colors underline hover:text-scholarly-blue/80"
                 href="https://worldhealthorg.shinyapps.io/wuenic-trends/" data-discover="true">Read more here</a>
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default VaccineVisualizationsSection;
