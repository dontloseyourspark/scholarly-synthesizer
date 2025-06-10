
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ConsensusIndicator from '@/components/ConsensusIndicator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { BookOpen, Calendar, Users, ArrowLeft } from 'lucide-react';
import { getTopic } from '@/data/topicsData';
import { getTopicIdFromSlug } from '@/utils/topicMapping';
import DatabaseInsightsContainer from '@/components/database/DatabaseInsightsContainer';

const TopicDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [topic, setTopic] = useState(slug ? getTopic(slug) : undefined);
  
  useEffect(() => {
    if (!slug) return;
    
    const foundTopic = getTopic(slug);
    setTopic(foundTopic);
  }, [slug]);
  
  if (!topic || !slug) {
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

  const topicId = getTopicIdFromSlug(slug);
  
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
              </div>
            </div>
          </div>
        </section>
        
        {/* Topic Content */}
        {topicId ? (
          <DatabaseInsightsContainer topicId={topicId} />
        ) : (
          <div className="container mx-auto px-4 mt-8">
            <div className="text-center text-red-600">
              Error: Could not map topic to database
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default TopicDetail;
