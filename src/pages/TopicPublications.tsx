
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchAndSortControls from '@/components/publications/SearchAndSortControls';
import PublicationCard from '@/components/publications/PublicationCard';
import PublicationsPagination from '@/components/publications/PublicationsPagination';
import PublicationsResultsSummary from '@/components/publications/PublicationsResultsSummary';
import EmptyPublicationsState from '@/components/publications/EmptyPublicationsState';
import { getTopic } from '@/data/topicsData';
import { useTopicPublications } from '@/hooks/useTopicPublications';
import { getTopicIdFromSlug } from '@/utils/topicMapping';
import { keyPublications } from '@/data/climateChangeData';
import { vaccinePublications } from '@/data/vaccineData';

const ITEMS_PER_PAGE = 10;

const TopicPublications = () => {
  const { slug } = useParams();
  const topic = getTopic(slug || '');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'year-desc' | 'year-asc' | 'title-asc' | 'title-desc'>('year-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce search term to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to first page when searching
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset to first page when items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get topic ID using the centralized mapping utility
  const topicId = topic ? getTopicIdFromSlug(topic.slug) : null;

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
    itemsPerPage: itemsPerPage
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

  const useStaticData = !topicId || !!dbError; // Convert to boolean with !!
  
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
    const startIndex = (currentPage - 1) * itemsPerPage;
    allPublications = sortedPublications.slice(startIndex, startIndex + itemsPerPage);
    loading = false;
  } else {
    // Use database data
    allPublications = dbPublications;
    totalCount = dbTotalCount;
    loading = dbLoading;
  }

  const totalPages = Math.ceil(totalCount / itemsPerPage);

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

  const handleClearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

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
              <SearchAndSortControls
                searchTerm={searchTerm}
                onSearchTermChange={setSearchTerm}
                sortBy={sortBy}
                onSortByChange={setSortBy}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={setItemsPerPage}
                totalCount={totalCount}
                useStaticData={useStaticData}
                filteredCount={allPublications.length}
              />

              {/* Publications List */}
              <div className="space-y-6">
                {allPublications.map((publication, index) => (
                  <PublicationCard
                    key={publication.id || index}
                    publication={publication}
                    topicTitle={topic.title}
                    index={index}
                  />
                ))}
              </div>

              <PublicationsPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />

              <PublicationsResultsSummary
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalCount={totalCount}
                totalPages={totalPages}
                useStaticData={useStaticData}
              />
            </>
          ) : (
            <EmptyPublicationsState
              searchTerm={searchTerm}
              onClearSearch={handleClearSearch}
              topicTitle={topic.title}
              backRoute={backRoute}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TopicPublications;
