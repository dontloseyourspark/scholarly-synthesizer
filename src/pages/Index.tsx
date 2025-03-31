
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import TopicCard from '@/components/TopicCard';
import { Button } from '@/components/ui/button';
import { topics } from '@/data/topicsData';
import { ArrowRight, BookOpen, Users, TrendingUp, FileText } from 'lucide-react';

const Index = () => {
  // Get the 4 most popular topics (using contributorsCount as a proxy for popularity)
  const popularTopics = [...topics]
    .sort((a, b) => b.contributorsCount - a.contributorsCount)
    .slice(0, 4);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-scholarly-blue text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Discover Scholarly Consensus
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-scholarly-lightGray">
              Explore what experts agree on across important topics. 
              See the strength of consensus and dive into insights from leading scholars.
            </p>
            <SearchBar className="mx-auto" />
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-scholarly-lightGray">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">How ScholarSphere Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-scholarly-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-scholarly-blue" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-3">Expert Insights</h3>
                <p className="text-muted-foreground">Contributions from verified scholars with relevant expertise.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-scholarly-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-scholarly-blue" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-3">Consensus Visualization</h3>
                <p className="text-muted-foreground">Clear indicators of agreement levels on key claims within topics.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-scholarly-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-scholarly-blue" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-3">Source Verification</h3>
                <p className="text-muted-foreground">All insights backed by peer-reviewed sources and quality evidence.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-scholarly-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-scholarly-blue" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-3">Community Feedback</h3>
                <p className="text-muted-foreground">Scholars and readers can vote on and discuss contributions.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Popular Topics Section */}
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
        
        {/* CTA Section */}
        <section className="py-20 bg-scholarly-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">Are You a Scholar?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Contribute your expertise to help build a clearer picture of scholarly consensus.
              Share insights backed by evidence and engage with other experts.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-scholarly-blue hover:bg-scholarly-lightGray">
                Learn About Contributing
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-scholarly-accent">
                Sign In as Scholar
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
