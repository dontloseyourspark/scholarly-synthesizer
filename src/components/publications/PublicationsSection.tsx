
import React from "react";
import PublicationsPagination from "@/components/publications/PublicationsPagination";
import PublicationsResultsSummary from "@/components/publications/PublicationsResultsSummary";
import SearchAndSortControls from "@/components/publications/SearchAndSortControls";
import EmptyPublicationsState from "@/components/publications/EmptyPublicationsState";
import PublicationCard from "@/components/publications/PublicationCard";
import DownloadPublicationsCSVButton from "@/components/publications/DownloadPublicationsCSVButton";

type PublicationsSectionProps = {
  topicTitle: string;
  topicSlug: string;
  loading: boolean;
  totalCount: number;
  pagedPublications: any[];
  allFilteredSorted: any[];
  useStaticData: boolean;
  searchTerm: string;
  onSearchTermChange: (s: string) => void;
  sortBy: "year-desc" | "year-asc" | "title-asc" | "title-desc";
  onSortByChange: (v: any) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (v: number) => void;
  currentPage: number;
  setCurrentPage: (n: number) => void;
  error?: any;
  currentPageCount: number;
  backRoute: string;
  handleClearSearch: () => void;
  totalPages: number;
};

const PublicationsSection: React.FC<PublicationsSectionProps> = ({
  topicTitle,
  topicSlug,
  loading,
  totalCount,
  pagedPublications,
  allFilteredSorted,
  useStaticData,
  searchTerm,
  onSearchTermChange,
  sortBy,
  onSortByChange,
  itemsPerPage,
  onItemsPerPageChange,
  currentPage,
  setCurrentPage,
  error,
  currentPageCount,
  backRoute,
  handleClearSearch,
  totalPages,
}) => {
  return (
    <div>
      <div className="mb-8">
        <DownloadPublicationsCSVButton
          publications={allFilteredSorted}
          topicTitle={topicTitle}
          disabled={loading || totalCount === 0}
          useStaticData={useStaticData}
          totalCount={totalCount}
          currentPageCount={currentPageCount}
        />
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
            onSearchTermChange={onSearchTermChange}
            sortBy={sortBy}
            onSortByChange={onSortByChange}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            totalCount={totalCount}
            useStaticData={useStaticData}
            filteredCount={pagedPublications.length}
          />

          {/* Publications List */}
          <div className="space-y-6">
            {pagedPublications.map((publication, index) => (
              <PublicationCard
                key={publication.id || index}
                publication={publication}
                topicTitle={topicTitle}
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
          topicTitle={topicTitle}
          backRoute={backRoute}
        />
      )}
    </div>
  );
};

export default PublicationsSection;
