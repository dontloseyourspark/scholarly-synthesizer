
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getTopic } from '@/data/topicsData';
import { useTopicPublications } from '@/hooks/useTopicPublications';
import { keyPublications } from '@/data/climateChangeData';
import { vaccinePublications } from '@/data/vaccineData';

const ITEMS_PER_PAGE = 10;

const TopicPublications = () => {
  const { slug } = useParams();
  const topic = getTopic(slug || '');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'year-desc' | 'year-asc' | 'title-asc' | 'title-desc'>('year-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce search term to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to first page when searching
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get topic ID for database queries
  const getTopicId = (topicSlug: string): number | null => {
    switch (topicSlug) {
      case 'climate-change':
        return 1; // Assuming climate change has ID 1 in the database
      case 'vaccine-efficacy':
        return 2; // Assuming vaccine efficacy has ID 2 in the database
      default:
        return null;
    }
  };

  const topicId = topic ? getTopicId(topic.slug) : null;

  // Use database hook if we have a topic ID, otherwise fall back to static data
  const {
    publications: dbPublications,
    totalCount: dbTotalCount,
    loading: dbLoading,
    error: dbError
  } = useTopicPublications(topicId || 0, {
    searchTerm: debouncedSearchTerm,
    sortBy,
    page: currentPage,
    itemsPerPage: ITEMS_PER_PAGE
  });

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

  // Fall back to static data if no topic ID or database error
  const getPublicationsForTopic = (topicSlug: string) => {
    switch (topicSlug) {
      case 'vaccine-efficacy':
        return vaccinePublications;
      case 'climate-change':
        return keyPublications;
      default:
        return [];
    }
  };

  const useStaticData = !topicId || dbError;
  
  let allPublications, totalCount, loading;
  
  if (useStaticData) {
    // Use static data with client-side filtering
    const staticPublications = getPublicationsForTopic(topic.slug);
    const filteredPublications = staticPublications.filter(pub =>
      pub.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      pub.authors.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    
    const sortedPublications = [...filteredPublications].sort((a, b) => {
      switch (sortBy) {
        case 'year-desc':
          return b.year - a.year;
        case 'year-asc':
          return a.year - b.year;
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    totalCount = sortedPublications.length;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    allPublications = sortedPublications.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    loading = false;
  } else {
    // Use database data
    allPublications = dbPublications;
    totalCount = dbTotalCount;
    loading = dbLoading;
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Generate pagination items
  const generatePaginationItems = () => {
    const items = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          items.push(i);
        }
        items.push('ellipsis');
        items.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        items.push(1);
        items.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          items.push(i);
        }
      } else {
        items.push(1);
        items.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          items.push(i);
        }
        items.push('ellipsis');
        items.push(totalPages);
      }
    }
    
    return items;
  };

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
              {loading ? 'Loading...' : `${totalCount} peer-reviewed sources supporting the scientific consensus.`}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-scholarly-blue mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading publications...</p>
            </div>
          ) : totalCount > 0 ? (
            <>
              {/* Search and Sort Controls */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search publications by title or author..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="md:w-48">
                    <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="year-desc">Year (Newest)</SelectItem>
                        <SelectItem value="year-asc">Year (Oldest)</SelectItem>
                        <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                        <SelectItem value="title-desc">Title (Z-A)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {searchTerm && (
                  <div className="mt-4 text-sm text-muted-foreground">
                    {useStaticData ? 
                      `Showing ${allPublications.length} of ${totalCount} publications` :
                      `Found ${totalCount} publications`
                    }
                  </div>
                )}
              </div>

              {/* Publications List */}
              <div className="space-y-6">
                {allPublications.map((publication, index) => (
                  <Card key={publication.id || index}>
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
                      {publication.publication && (
                        <p className="text-sm text-muted-foreground mb-2">
                          Published in: {publication.publication}
                        </p>
                      )}
                      {publication.doi && (
                        <p className="text-sm text-muted-foreground mb-2">
                          DOI: {publication.doi}
                        </p>
                      )}
                      <p className="text-sm">
                        This is a peer-reviewed publication related to {topic.title.toLowerCase()}.
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious 
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(currentPage - 1);
                              window.scrollTo(0, 0);
                            }}
                          />
                        </PaginationItem>
                      )}
                      
                      {generatePaginationItems().map((item, index) => (
                        <PaginationItem key={index}>
                          {item === 'ellipsis' ? (
                            <PaginationEllipsis />
                          ) : (
                            <PaginationLink
                              href="#"
                              isActive={currentPage === item}
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(item as number);
                                window.scrollTo(0, 0);
                              }}
                            >
                              {item}
                            </PaginationLink>
                          )}
                        </PaginationItem>
                      ))}
                      
                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationNext 
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(currentPage + 1);
                              window.scrollTo(0, 0);
                            }}
                          />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                </div>
              )}

              {/* Results Summary */}
              <div className="mt-6 text-center text-sm text-muted-foreground">
                {useStaticData ? (
                  <>Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} of {totalCount} publications</>
                ) : (
                  <>Showing page {currentPage} of {totalPages} ({totalCount} total publications)</>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-4">
                {searchTerm ? 'No publications found' : 'Publications Coming Soon'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm ? 
                  'Try adjusting your search terms or filters.' :
                  'We\'re currently compiling peer-reviewed publications for this topic. Check back soon for a comprehensive list of sources.'
                }
              </p>
              {searchTerm && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setCurrentPage(1);
                  }}
                  className="mb-4"
                >
                  Clear Search
                </Button>
              )}
              <Link 
                to={backRoute}
                className="text-scholarly-blue hover:underline block"
              >
                Return to {topic.title}
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TopicPublications;
