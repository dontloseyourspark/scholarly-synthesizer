
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  { name: 'A. afarensis', volume: 400, species: 'Australopithecine' },
  { name: 'H. habilis', volume: 600, species: 'Early Homo' },
  { name: 'H. erectus', volume: 900, species: 'Homo erectus' },
  { name: 'H. heidelbergensis', volume: 1200, species: 'Archaic Human' },
  { name: 'H. neanderthalensis', volume: 1400, species: 'Neanderthal' },
  { name: 'H. sapiens', volume: 1350, species: 'Modern Human' },
];

const geneticSimilarityData = [
  { name: 'Chimpanzees', similarity: 98.8 },
  { name: 'Gorillas', similarity: 98.4 },
  { name: 'Orangutans', similarity: 97.0 },
  { name: 'Gibbons', similarity: 96.0 },
  { name: 'Old World Monkeys', similarity: 93.0 },
  { name: 'New World Monkeys', similarity: 92.0 },
];

const VisualizationsSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-serif font-bold mb-2 text-center">Evolutionary Data Visualizations</h2>
        <p className="text-center text-muted-foreground mb-8">Explore the scientific evidence through data</p>
        
        <Tabs defaultValue="brain">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="brain">Brain Size Evolution</TabsTrigger>
            <TabsTrigger value="genetic">Genetic Similarity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="brain" className="mt-6">
            <div className="bg-scholarly-lightGray rounded-lg p-6">
              <h3 className="text-xl font-medium mb-4">Hominid Brain Size Evolution</h3>
              <p className="mb-6">Over millions of years, hominid brain capacity has increased significantly. This chart shows the brain volume (in cubic centimeters) for various hominid species.</p>
              
              <div className="h-80 w-full">
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
            </div>
          </TabsContent>
          
          <TabsContent value="genetic" className="mt-6">
            <div className="bg-scholarly-lightGray rounded-lg p-6">
              <h3 className="text-xl font-medium mb-4">Human-Primate Genetic Similarity</h3>
              <p className="mb-6">Humans share significant DNA sequence similarity with other primates. These percentages represent DNA sequence identity between humans and other primates.</p>
              
              <div className="h-80 w-full">
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default VisualizationsSection;
