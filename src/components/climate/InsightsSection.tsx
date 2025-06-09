import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, ExternalLink } from 'lucide-react';
import { Insight } from '@/data/insightsData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';



type InsightsSectionProps = {
  insights: Insight[];
  onVote: (insightId: string, voteType: 'up' | 'down') => void;
}; 

const InsightsSection: React.FC<InsightsSectionProps> = ({ insights, onVote }) => {
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

  return (
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
  );
};

export default InsightsSection;
