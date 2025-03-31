
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import TopicCard, { Topic } from '@/components/TopicCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { searchTopics, topics } from '@/data/topicsData';

const Topics = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>(topics);
  const [consensusFilter, setConsensusFilter] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Extract unique tags from all topics
  const allTags = Array.from(new Set(topics.flatMap(topic => topic.tags))).sort();
  
  // Parse query from URL if any
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get('q');
    if (q) {
      setSearchQuery(q);
    }
  }, [location.search]);
  
  // Apply filters when search query, consensus filter, or tags change
  useEffect(() => {
    let filtered = searchQuery ? searchTopics(searchQuery) : [...topics];
    
    // Apply consensus filter
    if (consensusFilter !== 'all') {
      filtered = filtered.filter(topic => topic.consensusLevel === consensusFilter);
    }
    
    // Apply tag filters if any are selected
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-scholarly-lightGray pb-16">
        {/* Topics Header */}
        <section className="bg-scholarly-blue py-12 mb-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-serif font-bold text-white mb-4">Browse Topics</h1>
            <p className="text-scholarly-lightGray max-w-3xl mb-6">
              Explore scholarly consensus across a wide range of fields, from climate science to medicine, 
              technology, and social sciences.
            </p>
            <SearchBar />
          </div>
        </section>
        
        {/* Topics Content */}
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All Topics</TabsTrigger>
              <TabsTrigger value="science">Science & Technology</TabsTrigger>
              <TabsTrigger value="medicine">Medicine & Health</TabsTrigger>
              <TabsTrigger value="social">Social Sciences</TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters */}
              <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
                <h3 className="font-medium text-lg mb-4">Filters</h3>
                
                <div className="space-y-6">
                  <div>
                    <Label className="text-base mb-2 block">Consensus Level</Label>
                    <RadioGroup value={consensusFilter} onValueChange={setConsensusFilter}>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="all" id="all" />
                        <Label htmlFor="all" className="font-normal">All levels</Label>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="high" id="high" />
                        <Label htmlFor="high" className="font-normal">High consensus</Label>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium" className="font-normal">Medium consensus</Label>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="low" id="low" />
                        <Label htmlFor="low" className="font-normal">Low consensus</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="disputed" id="disputed" />
                        <Label htmlFor="disputed" className="font-normal">Disputed</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label className="text-base mb-2 block">Tags</Label>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                      {allTags.map((tag) => (
                        <div key={tag} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`tag-${tag}`} 
                            checked={selectedTags.includes(tag)}
                            onCheckedChange={() => handleTagChange(tag)}
                          />
                          <Label htmlFor={`tag-${tag}`} className="font-normal">{tag}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Topics Grid */}
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Topics;
