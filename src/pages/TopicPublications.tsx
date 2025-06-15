
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getTopic } from "@/data/topicsData";
import { getTopicIdFromSlug } from "@/utils/topicMapping";
import PublicationsSection from "@/components/publications/PublicationsSection";
import { useFilteredTopicPublications } from "@/hooks/useFilteredTopicPublications";

const ITEMS_PER_PAGE = 10;

const TopicPublications = () => {
  const { slug } = useParams();
  const topic = getTopic(slug || "");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<
    "year-desc" | "year-asc" | "title-asc" | "title-desc"
  >("year-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const topicId = topic ? getTopicIdFromSlug(topic.slug) : null;

  const {
    pagedPublications,
    totalCount,
    allFilteredSorted,
    useStaticData,
    loading,
    error,
    currentPageCount,
  } = useFilteredTopicPublications({
    topicId,
    topicSlug: topic?.slug || "",
    searchTerm: debouncedSearchTerm,
    sortBy,
    page: currentPage,
    itemsPerPage,
  });

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const getBackRoute = (topicSlug: string) => {
    switch (topicSlug) {
      case "climate-change":
        return "/climate-change";
      case "evolution-of-humans":
        return "/evolution-of-humans";
      case "vaccine-efficacy":
        return "/vaccine-efficacy";
      case "artificial-intelligence-safety":
        return "/artificial-intelligence-safety";
      case "nutrition-science":
        return "/nutrition-science";
      case "quantum-computing":
        return "/quantum-computing";
      case "economic-impacts-immigration":
        return "/economic-impacts-immigration";
      case "effectiveness-psychotherapy":
        return "/effectiveness-psychotherapy";
      default:
        return `/topics/${topicSlug}`;
    }
  };

  const backRoute = topic ? getBackRoute(topic.slug) : "/topics";

  const handleClearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  if (!topic) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-scholarly-lightGray py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">
              Topic not found
            </h1>
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
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
              {topic.title}: Publications
            </h1>
            <p className="text-muted-foreground">
              {loading
                ? "Loading..."
                : `${totalCount} peer-reviewed sources supporting the scientific consensus.`}
            </p>
          </div>
          <PublicationsSection
            topicTitle={topic.title}
            topicSlug={topic.slug}
            loading={loading}
            totalCount={totalCount}
            pagedPublications={pagedPublications}
            allFilteredSorted={allFilteredSorted}
            useStaticData={useStaticData}
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={setItemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            error={error}
            currentPageCount={currentPageCount}
            backRoute={backRoute}
            handleClearSearch={handleClearSearch}
            totalPages={totalPages}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TopicPublications;
