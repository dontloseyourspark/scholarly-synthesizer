
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import TopicCard from '@/components/TopicCard';
import { topics } from '@/data/topicsData';
import { ArrowRight } from 'lucide-react';

const PopularTopicsSection = () => {
  // Get the 4 most popular topics (using contributorsCount as a proxy for popularity)
  const popularTopics = [...topics]
    .sort((a, b) => b.contributorsCount - a.contributorsCount)
    .slice(0, 4);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-3xl font-serif font-bold">Popular Topics</h2>
          <Link to="/topics">
            <Button variant="link" className="text-scholarly-blue p-0">
              View all topics <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularTopics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularTopicsSection;
