
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getTopic } from '@/data/topicsData';
import { keyPublications } from '@/data/climateChangeData';

const TopicPublications = () => {
  const { id } = useParams();
  const topic = getTopic(id || '');

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  if (!topic) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-scholarly-lightGray py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">Topic not found</h1>
            <p className="mb-6">We couldn't find the requested topic.</p>
            <Link to="/topics" className="text-scholarly-blue hover:underline">
              Browse All Topics
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // For now, we'll use the keyPublications data for any topic
  // In a real application, this would be topic-specific
  const publications = keyPublications;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-scholarly-lightGray py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link 
              to={topic.slug === 'climate-change' ? '/climate-change' : `/topics/${topic.slug}`} 
              className="text-scholarly-blue hover:text-scholarly-darkBlue flex items-center mb-4"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to {topic.title}
            </Link>
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{topic.title}: Publications</h1>
            <p className="text-muted-foreground">
              {topic.sourcesCount} peer-reviewed sources supporting the scientific consensus.
            </p>
          </div>

          <div className="space-y-6">
            {publications.map((publication, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">
                    <a 
                      href={publication.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-scholarly-blue hover:underline"
                    >
                      {publication.title}
                    </a>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">
                    {publication.authors}, {publication.year}
                  </p>
                  <p className="text-sm">
                    {/* In a real app, we would include an abstract or summary here */}
                    This is a peer-reviewed publication related to {topic.title.toLowerCase()}.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Placeholder for pagination in case of many publications */}
          {topic.sourcesCount > publications.length && (
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                Showing {publications.length} of {topic.sourcesCount} publications.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TopicPublications;
