
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import StaticPageLayout from '@/components/layout/StaticPageLayout';
import TopicsHeader from '@/components/topics/TopicsHeader';
import TopicsFilters from '@/components/topics/TopicsFilters';
import TopicCard, { Topic } from '@/components/TopicCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Earth } from 'lucide-react';
import { searchTopics, topics } from '@/data/topicsData';

const Topics = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>(topics);
  const [consensusFilter, setConsensusFilter] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const allTags = Array.from(new Set(topics.flatMap(topic => topic.tags))).sort();
  
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get('q');
    setSearchQuery(q || '');
  }, [location.search]);
  
  useEffect(() => {
    let filtered = searchQuery ? searchTopics(searchQuery) : [...topics];
    
    if (consensusFilter !== 'all') {
      filtered = filtered.filter(topic => topic.consensusLevel === consensusFilter);
    }
    
    if (selectedTags.length > 0) {
      filtered = filtered.filter(topic => 
        topic.tags.some(tag => selectedTags.includes(tag))
      );
    }
    
    setFilteredTopics(filtered);
  }, [searchQuery, consensusFilter, selectedTags]);
  
  const handleTagChange = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(item => item !== tag) 
        : [...prev, tag]
    );
  };
  
  return (
    <StaticPageLayout>
      <div className="bg-scholarly-lightGray pb-16">
        <TopicsHeader />
        
        <div className="container mx-auto px-4 mb-8">
          <Alert className="bg-scholarly-blue/10 border-scholarly-blue">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Earth className="h-5 w-5 text-scholarly-blue mr-2" />
                <AlertDescription className="text-foreground">
                  <strong>Featured Topic:</strong> Explore our detailed page on Climate Change
                </AlertDescription>
              </div>
              <Button variant="outline" size="sm" className="text-scholarly-blue border-scholarly-blue hover:bg-scholarly-blue/10" asChild>
                <Link to="/climate-change">View Climate Change Page</Link>
              </Button>
            </div>
          </Alert>
        </div>
        
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All Topics</TabsTrigger>
              <TabsTrigger value="science">Science & Technology</TabsTrigger>
              <TabsTrigger value="medicine">Medicine & Health</TabsTrigger>
              <TabsTrigger value="social">Social Sciences</TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <TopicsFilters
                consensusFilter={consensusFilter}
                setConsensusFilter={setConsensusFilter}
                selectedTags={selectedTags}
                onTagChange={handleTagChange}
                allTags={allTags}
              />
              
              <div className="lg:col-span-3">
                {filteredTopics.length === 0 ? (
                  <div className="bg-white p-8 rounded-lg text-center">
                    <h3 className="text-xl font-medium mb-2">No topics found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search terms or filters to find what you're looking for.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredTopics.map((topic) => (
                      <TopicCard key={topic.id} topic={topic} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </StaticPageLayout>
  );
};

export default Topics;
