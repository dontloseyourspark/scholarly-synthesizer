
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Earth, ThermometerSun, Cloud, Wind, TreePine, ExternalLink, BookOpen, Download } from 'lucide-react';
import ConsensusIndicator from '@/components/ConsensusIndicator';
import { getTopic } from '@/data/topicsData';

const ClimateChange = () => {
  // Get the climate change topic data
  const climateChangeTopic = getTopic('climate-change');
  
  // Sample data for visualization
  const consensusData = [
    { name: 'Support', value: 97 },
    { name: 'Against', value: 3 }
  ];
  
  const impactData = [
    { category: 'Sea Level Rise', value: 0.19, fill: '#0EA5E9' },
    { category: 'Global Temperature', value: 1.1, fill: '#F97316' },
    { category: 'CO₂ (ppm)', value: 415, fill: '#8B5CF6' },
    { category: 'Arctic Ice Loss (%)', value: 13.1, fill: '#D946EF' }
  ];
  
  const keyPublications = [
    {
      id: 1,
      title: "IPCC Sixth Assessment Report",
      authors: "Intergovernmental Panel on Climate Change",
      year: 2021,
      url: "https://www.ipcc.ch/report/ar6/wg1/"
    },
    {
      id: 2,
      title: "Global Warming of 1.5°C",
      authors: "IPCC Special Report",
      year: 2018,
      url: "https://www.ipcc.ch/sr15/"
    },
    {
      id: 3,
      title: "State of the Climate 2022",
      authors: "World Meteorological Organization",
      year: 2022,
      url: "https://library.wmo.int/index.php?lvl=notice_display&id=22130"
    }
  ];
  
  const climateEffects = [
    {
      title: "Rising Temperatures",
      icon: <ThermometerSun className="h-8 w-8 text-orange-500" />,
      description: "Global average temperature has increased by about 1.1°C since pre-industrial times."
    },
    {
      title: "Changing Weather Patterns",
      icon: <Cloud className="h-8 w-8 text-blue-400" />,
      description: "Increased frequency and intensity of extreme weather events, including hurricanes, droughts, and floods."
    },
    {
      title: "Melting Ice Caps",
      icon: <Wind className="h-8 w-8 text-cyan-500" />,
      description: "Arctic sea ice is declining at a rate of 13.1% per decade, affecting global ocean currents and weather patterns."
    },
    {
      title: "Biodiversity Loss",
      icon: <TreePine className="h-8 w-8 text-green-600" />,
      description: "An estimated one million plant and animal species are at risk of extinction due to climate change."
    }
  ];

  const COLORS = ['#4CAF50', '#F44336'];
  
  if (!climateChangeTopic) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-scholarly-lightGray py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">Topic data not found</h1>
            <p className="mb-6">We couldn't find information about the Climate Change topic.</p>
            <Button asChild>
              <Link to="/topics">Browse All Topics</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-scholarly-lightGray pb-16">
        {/* Hero Section */}
        <section className="bg-scholarly-blue py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <Link to="/topics" className="text-scholarly-lightGray hover:text-white flex items-center mb-4">
                  <Earth className="mr-2 h-5 w-5" />
                  Climate Topics
                </Link>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">Climate Change</h1>
                <div className="flex flex-wrap gap-2 mb-6">
                  {climateChangeTopic.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-scholarly-blue bg-opacity-20 text-white border-scholarly-lightGray">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-auto">
                <Card className="bg-white shadow border-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Scientific Consensus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ConsensusIndicator 
                      level={climateChangeTopic.consensusLevel} 
                      percentage={climateChangeTopic.consensusPercentage} 
                      sampleSize={climateChangeTopic.contributorsCount}
                      className="mb-4"
                    />
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mt-2">
                      <Link 
                        to={`/topics/${climateChangeTopic.slug}/contributors`} 
                        className="flex items-center hover:text-scholarly-blue transition-colors"
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        <span>{climateChangeTopic.sourcesCount} peer-reviewed sources</span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* Description Section */}
        <section className="container mx-auto px-4 py-10">
          <Card className="border-none shadow-lg">
            <CardContent className="p-6 md:p-8">
              <p className="text-lg mb-6">
                {climateChangeTopic.description}
              </p>
              <p className="text-lg mb-4">
                Climate change refers to long-term shifts in temperatures and weather patterns. These shifts may be natural, 
                such as through variations in the solar cycle. However, since the 1800s, human activities have been the main driver of climate change, 
                primarily due to burning fossil fuels like coal, oil and gas, which produces heat-trapping gases.
              </p>
              <p className="text-lg">
                The scientific consensus on climate change is clear: it is real, it is caused by humans, and its impacts are already being felt 
                worldwide. The Intergovernmental Panel on Climate Change (IPCC) has concluded with over 95% certainty that human influence 
                has been the dominant cause of observed warming since the mid-20th century.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Key Effects Section */}
        <section className="container mx-auto px-4 py-6">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">Key Effects of Climate Change</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {climateEffects.map((effect, index) => (
              <Card key={index} className="border-none shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4">
                    {effect.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{effect.title}</h3>
                  <p className="text-muted-foreground">{effect.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Visualizations and Data Section */}
        <section className="container mx-auto px-4 py-10">
          <Tabs defaultValue="consensus" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="consensus">Scientific Consensus</TabsTrigger>
              <TabsTrigger value="impacts">Climate Impacts</TabsTrigger>
              <TabsTrigger value="publications">Key Publications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="consensus">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Scientific Consensus on Climate Change</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <p className="mb-6">
                        Multiple studies published in peer-reviewed scientific journals show that 97% or more of actively publishing climate scientists agree 
                        that climate-warming trends over the past century are extremely likely due to human activities.
                      </p>
                      <p>
                        This consensus is supported by scientific academies and societies worldwide. A small number of scientists disagree with the consensus 
                        position, but the vast majority of climate scientists have concluded that human-caused climate change is happening.
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
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {consensusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Legend />
                          <Tooltip />
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
                  <CardTitle className="text-2xl">Measurable Climate Impacts</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <p className="mb-4">
                        Climate change is already affecting every region on Earth. The impacts of climate change are being felt in the form of:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 mb-4">
                        <li>Rising global temperatures</li>
                        <li>Sea level rise due to melting ice sheets and glaciers</li>
                        <li>Increased concentration of carbon dioxide in the atmosphere</li>
                        <li>Loss of Arctic sea ice</li>
                        <li>More frequent and intense extreme weather events</li>
                        <li>Shifts in plant and animal ranges</li>
                        <li>Longer or more intense droughts</li>
                      </ul>
                      <p>
                        These impacts are projected to intensify in the coming decades, with the severity dependent on the amount 
                        of heat-trapping gases emitted globally and how sensitive the Earth's climate is to those emissions.
                      </p>
                    </div>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={impactData}
                          layout="vertical"
                          margin={{
                            top: 20,
                            right: 30,
                            left: 50,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis type="category" dataKey="category" />
                          <Tooltip />
                          <Bar dataKey="value">
                            {impactData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                      <p className="text-center text-sm text-muted-foreground mt-2">
                        Note: CO₂ value shown at reduced scale (actual value: 415 ppm)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="publications">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Key Publications & Resources</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <p className="mb-6">
                    The following publications represent major scientific contributions to our understanding of climate change.
                    These reports are compiled by hundreds of leading scientists from around the world and undergo extensive 
                    peer review before publication.
                  </p>
                  
                  <div className="space-y-6">
                    {keyPublications.map((pub) => (
                      <div key={pub.id} className="border p-4 rounded-md hover:bg-gray-50 transition-colors">
                        <h4 className="font-medium text-lg mb-1">{pub.title}</h4>
                        <p className="text-muted-foreground mb-3">{pub.authors} ({pub.year})</p>
                        <div className="flex justify-end">
                          <Button variant="outline" asChild size="sm">
                            <a href={pub.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                              <ExternalLink className="h-4 w-4 mr-1.5" />
                              View Resource
                            </a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex justify-center">
                    <Button className="bg-scholarly-blue hover:bg-scholarly-accent">
                      <Download className="h-4 w-4 mr-1.5" />
                      Download Complete Bibliography
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Call-to-Action Section */}
        <section className="container mx-auto px-4 py-10">
          <Card className="bg-scholarly-blue text-white border-none">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Join the Climate Conversation</h2>
              <p className="mb-6 text-scholarly-lightGray max-w-3xl mx-auto">
                Contribute to the scholarly discussion on climate change. Add insights, evaluate evidence, 
                and help build a comprehensive resource for understanding this global challenge.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-scholarly-blue" asChild>
                  <Link to={`/topics/${climateChangeTopic.slug}`}>View Full Topic Details</Link>
                </Button>
                <Button variant="default" className="bg-white text-scholarly-blue hover:bg-scholarly-lightGray" asChild>
                  <Link to="/contribute">Contribute an Insight</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ClimateChange;
