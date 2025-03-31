
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ConsensusIndicator from '@/components/ConsensusIndicator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { BookOpen, Calendar, Users, ThumbsUp, ThumbsDown, ExternalLink, ArrowLeft } from 'lucide-react';
import { getTopic } from '@/data/topicsData';
import { getInsightsForTopic, Insight } from '@/data/insightsData';
import { useToast } from '@/components/ui/use-toast';

const TopicDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [topic, setTopic] = useState(slug ? getTopic(slug) : undefined);
  const [insights, setInsights] = useState<Insight[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!slug) return;
    
    const foundTopic = getTopic(slug);
    setTopic(foundTopic);
    
    if (foundTopic) {
      setInsights(getInsightsForTopic(foundTopic.id));
    }
  }, [slug]);
  
  if (!topic) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-scholarly-lightGray">
          <div className="text-center p-8">
            <h1 className="text-2xl font-medium mb-4">Topic not found</h1>
            <p className="text-muted-foreground mb-6">The topic you're looking for doesn't exist or has been removed.</p>
            <Link to="/topics">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Topics
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleVote = (insightId: string, voteType: 'up' | 'down') => {
    setInsights(prevInsights => 
      prevInsights.map(insight => {
        if (insight.id === insightId) {
          if (voteType === 'up') {
            toast({ title: "Upvoted", description: "Thank you for your feedback" });
            return { ...insight, upvotes: insight.upvotes + 1 };
          } else {
            toast({ title: "Downvoted", description: "Thank you for your feedback" });
            return { ...insight, downvotes: insight.downvotes + 1 };
          }
        }
        return insight;
      })
    );
  };
  
  // Calculate position distribution for pie chart
  const positionCounts = {
    support: insights.filter(i => i.position === 'support').length,
    neutral: insights.filter(i => i.position === 'neutral').length,
    against: insights.filter(i => i.position === 'against').length,
  };
  
  const positionData = [
    { name: 'Support', value: positionCounts.support },
    { name: 'Neutral', value: positionCounts.neutral },
    { name: 'Against', value: positionCounts.against },
  ].filter(item => item.value > 0);
  
  const POSITION_COLORS = {
    'Support': '#4CAF50',
    'Neutral': '#9E9E9E',
    'Against': '#F44336',
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-scholarly-lightGray pb-16">
        {/* Topic Header */}
        <section className="bg-scholarly-blue py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <Link to="/topics" className="text-scholarly-lightGray hover:text-white flex items-center mb-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Topics
                </Link>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">{topic.title}</h1>
              </div>
              <Button className="mt-4 md:mt-0 bg-white text-scholarly-blue hover:bg-scholarly-lightGray">
                Contribute Insight
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {topic.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-scholarly-blue bg-opacity-20 text-white border-scholarly-lightGray">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <p className="text-foreground mb-6">{topic.description}</p>
              
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1">
                  <ConsensusIndicator 
                    level={topic.consensusLevel} 
                    percentage={topic.consensusPercentage} 
                    sampleSize={topic.contributorsCount}
                    className="mb-4"
                  />
                  
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{topic.contributorsCount} contributors</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      <span>{topic.sourcesCount} sources</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Updated {new Date(topic.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                {positionData.length > 0 && (
                  <div className="w-full md:w-56 h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={positionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={70}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {positionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={POSITION_COLORS[entry.name as keyof typeof POSITION_COLORS]} />
                          ))}
                        </Pie>
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Topic Content */}
        <div className="container mx-auto px-4 mt-8">
          <Tabs defaultValue="insights" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="insights">Scholar Insights</TabsTrigger>
              <TabsTrigger value="sources">Key Sources</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>
            
            <TabsContent value="insights">
              <div className="space-y-6">
                {insights.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <p>No insights have been contributed for this topic yet.</p>
                      <Button className="mt-4 bg-scholarly-blue hover:bg-scholarly-accent">
                        Be the first to contribute
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  insights.map((insight) => (
                    <Card key={insight.id} className="overflow-hidden">
                      <CardHeader className="pb-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center">
                            <Avatar className="h-12 w-12 mr-4">
                              <AvatarImage src={insight.scholar.avatar} alt={insight.scholar.name} />
                              <AvatarFallback>{insight.scholar.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{insight.scholar.name}</CardTitle>
                              <p className="text-sm text-muted-foreground">{insight.scholar.title}, {insight.scholar.institution}</p>
                            </div>
                          </div>
                          <Badge className={`
                            ${insight.position === 'support' ? 'bg-consensus-high' : ''}
                            ${insight.position === 'neutral' ? 'bg-consensus-neutral' : ''}
                            ${insight.position === 'against' ? 'bg-consensus-low' : ''}
                            text-white
                          `}>
                            {insight.position === 'support' ? 'Supporting Consensus' : ''}
                            {insight.position === 'neutral' ? 'Neutral Position' : ''}
                            {insight.position === 'against' ? 'Against Consensus' : ''}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p>{insight.content}</p>
                        
                        <div className="bg-scholarly-lightGray p-4 rounded-md">
                          <h4 className="font-medium mb-2">Sources:</h4>
                          <ul className="space-y-1">
                            {insight.sources.map((source) => (
                              <li key={source.id}>
                                <a 
                                  href={source.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-scholarly-blue hover:underline flex items-center"
                                >
                                  <ExternalLink className="h-3.5 w-3.5 mr-1.5 inline" />
                                  {source.title} ({source.year})
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="text-sm text-muted-foreground">
                            Contributed on {new Date(insight.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center space-x-4">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleVote(insight.id, 'up')}
                              className="text-muted-foreground hover:text-scholarly-blue"
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {insight.upvotes}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleVote(insight.id, 'down')}
                              className="text-muted-foreground hover:text-scholarly-blue"
                            >
                              <ThumbsDown className="h-4 w-4 mr-1" />
                              {insight.downvotes}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="sources">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-medium mb-4">Key Sources on this Topic</h3>
                  
                  <div className="space-y-4">
                    {Array.from(new Set(insights.flatMap(i => i.sources))).map((source) => (
                      <div key={source.id} className="border p-4 rounded-md">
                        <h4 className="font-medium mb-1">{source.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{source.authors}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-sm">
                            <span className="text-scholarly-gray">{source.publication}, {source.year}</span>
                            {source.doi && <span className="ml-2 text-scholarly-gray">DOI: {source.doi}</span>}
                          </div>
                          <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-scholarly-blue hover:underline text-sm flex items-center"
                          >
                            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                            View Source
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="discussion">
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <h3 className="text-xl font-medium mb-4">Discussion</h3>
                  <p className="text-muted-foreground mb-6">Join the conversation about this topic.</p>
                  <Button className="bg-scholarly-blue hover:bg-scholarly-accent">
                    Sign In to Participate
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TopicDetail;
