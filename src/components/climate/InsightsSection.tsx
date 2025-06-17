import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, ExternalLink } from 'lucide-react';
import { Insight } from '@/data/insightsData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';



interface InsightsSectionProps {
  insights: Insight[];
  onVote: (insightId: string, voteType: 'up' | 'down') => void;
}

const InsightsSection = ({ insights, onVote }: InsightsSectionProps) => {
  if (insights.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p>No insights have been contributed for this topic yet.</p>
          <Button className="mt-4 bg-scholarly-blue hover:bg-scholarly-accent">
            Be the first to contribute
          </Button>
        </CardContent>
      </Card>
    );
  }


  console.log('All insights:', insights); // Debugging log
  const approvedInsights = insights.filter(insight => insight.verification_status === 'verified');
  console.log('Approved insights:', approvedInsights); // Debugging log

  return (
    <section className="container mx-auto px-4 py-6">
      <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">Expert Insights on Climate Change</h2>


        <div className="space-y-6">
        {approvedInsights.map((insight) => (
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
                  {insight.position === 'support' ? 'Supporting Evidence' : ''}
                  {insight.position === 'neutral' ? 'Neutral Analysis' : ''}
                  {insight.position === 'against' ? 'Critical View' : ''}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{insight.content}</p>
              
              <div className="bg-scholarly-lightGray p-4 rounded-md">
                <h4 className="font-medium mb-2">Sources:</h4>
                <ul className="space-y-1">
                {insight?.sources?.map((source, index) => {
                  const url = source?.url;
                  const title = source?.title;

                  return url ? (
                    <li key={index}>
                      <a>

                        <ExternalLink className="h-3.5 w-3.5 mr-1.5 inline" />
                        {source.title} ({source.year})
                      </a>
                    </li>
                  ) : null;
                })
                }
                                      
                
               
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
                        onClick={() => onVote(insight.id, 'up')}
                        className="text-muted-foreground hover:text-scholarly-blue"
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {insight.upvotes}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onVote(insight.id, 'down')}
                        className="text-muted-foreground hover:text-scholarly-blue"
                      >
                        <ThumbsDown className="h-4 w-4 mr-1" />
                        {insight.downvotes}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
          </section>

  );
};

export default InsightsSection;
