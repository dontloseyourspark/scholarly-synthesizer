
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getTopic } from '@/data/topicsData';
import { keyPublications } from '@/data/climateChangeData';
import { vaccinePublications } from '@/data/vaccineData';

const TopicPublications = () => {
  const { slug } = useParams();
  const topic = getTopic(slug || '');

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

  // Get topic-specific publications
  const getPublicationsForTopic = (topicSlug: string) => {
    switch (topicSlug) {
      case 'vaccine-efficacy':
        return vaccinePublications;
      case 'climate-change':
        return keyPublications;
      default:
        // For now, return empty array for topics without specific publications
        return [];
    }
  };

  const publications = getPublicationsForTopic(topic.slug);

  // Determine the correct back route
  const getBackRoute = (topicSlug: string) => {
    switch (topicSlug) {
      case 'climate-change':
        return '/climate-change';
      case 'evolution-of-humans':
        return '/evolution-of-humans';
      case 'vaccine-efficacy':
        return '/vaccine-efficacy';
      case 'artificial-intelligence-safety':
        return '/artificial-intelligence-safety';
      case 'nutrition-science':
        return '/nutrition-science';
      case 'quantum-computing':
        return '/quantum-computing';
      case 'economic-impacts-immigration':
        return '/economic-impacts-immigration';
      case 'effectiveness-psychotherapy':
        return '/effectiveness-psychotherapy';
      default:
        return `/topics/${topicSlug}`;
    }
  };

  const backRoute = getBackRoute(topic.slug);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-scholarly-lightGray py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link 
              to={backRoute} 
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

          {publications.length > 0 ? (
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
                      This is a peer-reviewed publication related to {topic.title.toLowerCase()}.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-4">Publications Coming Soon</h3>
              <p className="text-muted-foreground mb-6">
                We're currently compiling peer-reviewed publications for this topic. 
                Check back soon for a comprehensive list of sources.
              </p>
              <Link 
                to={backRoute}
                className="text-scholarly-blue hover:underline"
              >
                Return to {topic.title}
              </Link>
            </div>
          )}

          {/* Placeholder for pagination in case of many publications */}
          {publications.length > 0 && topic.sourcesCount > publications.length && (
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
