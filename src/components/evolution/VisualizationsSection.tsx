
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const brainSizeData = [
  { name: 'A. afarensis', volume: 400, species: 'Australopithecine', age: 3.2 },
  { name: 'H. habilis', volume: 600, species: 'Early Homo', age: 2.1 },
  { name: 'H. erectus', volume: 900, species: 'Homo erectus', age: 1.9 },
  { name: 'H. heidelbergensis', volume: 1200, species: 'Archaic Human', age: 0.7 },
  { name: 'H. neanderthalensis', volume: 1400, species: 'Neanderthal', age: 0.4 },
  { name: 'H. sapiens', volume: 1350, species: 'Modern Human', age: 0.3 },
];

const geneticSimilarityData = [
  { name: 'Chimpanzees', similarity: 98.8 },
  { name: 'Gorillas', similarity: 98.4 },
  { name: 'Orangutans', similarity: 97.0 },
  { name: 'Gibbons', similarity: 96.0 },
  { name: 'Old World Monkeys', similarity: 93.0 },
  { name: 'New World Monkeys', similarity: 92.0 },
];

const migrationData = [
  { region: 'Africa', timeframe: '200,000 years ago', population: 100 },
  { region: 'Middle East', timeframe: '70,000 years ago', population: 85 },
  { region: 'Asia', timeframe: '65,000 years ago', population: 60 },
  { region: 'Europe', timeframe: '45,000 years ago', population: 40 },
  { region: 'Australia', timeframe: '50,000 years ago', population: 30 },
  { region: 'Americas', timeframe: '15,000 years ago', population: 25 }
];

const VisualizationsSection = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <Tabs defaultValue="brain" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="brain">Brain Evolution</TabsTrigger>
          <TabsTrigger value="genetic">Genetic Similarity</TabsTrigger>
          <TabsTrigger value="migration">Human Migration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="brain">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Hominid Brain Size Evolution</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="mb-6">
                <p className="mb-4">
                  Over millions of years, hominid brain capacity has increased significantly. This chart shows 
                  the brain volume (in cubic centimeters) for various hominid species throughout evolutionary history.
                </p>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={brainSizeData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                    <YAxis label={{ value: 'Brain Volume (cc)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value, name) => [`${value} cc`, 'Brain Volume']} />
                    <Bar dataKey="volume" fill="#0A2463" name="Brain Volume (cc)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-600 mt-4">Source: Multiple fossil studies and paleoanthropological research</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="genetic">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Human-Primate Genetic Similarity</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="mb-6">
                <p className="mb-4">
                  Humans share significant DNA sequence similarity with other primates. These percentages represent 
                  DNA sequence identity between humans and various primate species, demonstrating our evolutionary relationships.
                </p>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={geneticSimilarityData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                    <YAxis domain={[90, 100]} label={{ value: 'DNA Similarity (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => [`${value}%`, 'DNA Similarity']} />
                    <Line type="monotone" dataKey="similarity" stroke="#0A2463" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-600 mt-4">Source: Comparative genomic analyses</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="migration">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Human Migration Patterns</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="mb-6">
                <p className="mb-4">
                  Early humans migrated from Africa to populate the globe over tens of thousands of years. 
                  This timeline shows key migration events and estimated population sizes.
                </p>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={migrationData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" angle={-45} textAnchor="end" height={70} />
                    <YAxis label={{ value: 'Relative Population Size', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value, name) => [value, 'Population Index']} />
                    <Bar dataKey="population" fill="#0A2463" name="Population Index" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-600 mt-4">Source: Archaeological and genetic evidence of human migration</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default VisualizationsSection;
