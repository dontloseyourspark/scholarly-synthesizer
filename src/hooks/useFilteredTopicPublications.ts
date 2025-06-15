
import { useMemo } from "react";
import { useTopicPublications } from "@/hooks/useTopicPublications";
import { keyPublications } from "@/data/climateChangeData";
import { vaccinePublications } from "@/data/vaccineData";

// Utility to get publications for a specific static topic
const getStaticPublications = (slug: string) => {
  switch (slug) {
    case "vaccine-efficacy":
      return vaccinePublications;
    case "climate-change":
      return keyPublications;
    default:
      return [];
  }
};

export type FilterSortParams = {
  topicId: number | null;
  topicSlug: string;
  searchTerm: string;
  sortBy: "year-desc" | "year-asc" | "title-asc" | "title-desc";
  page: number;
  itemsPerPage: number;
};

export function useFilteredTopicPublications({
  topicId,
  topicSlug,
  searchTerm,
  sortBy,
  page,
  itemsPerPage,
}: FilterSortParams) {
  // Database publications hook
  const {
    publications: dbPublications,
    totalCount: dbTotalCount,
    loading: dbLoading,
    error: dbError,
  } = useTopicPublications(topicId || 0, {
    searchTerm,
    sortBy,
    page,
    itemsPerPage,
  });

  // Static fallback logic
  const useStaticData = !topicId || !!dbError;
  const staticPublications = getStaticPublications(topicSlug);

  // Memoized filtering/sorting for static data
  const {
    pagedPublications,
    totalCount,
    allFilteredSorted,
    loading,
  } = useMemo(() => {
    if (useStaticData) {
      // Search
      const filtered = staticPublications.filter(
        (pub) =>
          pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pub.authors.toLowerCase().includes(searchTerm.toLowerCase())
      );
      // Sort
      const sorted = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case "year-desc":
            return b.year - a.year;
          case "year-asc":
            return a.year - b.year;
          case "title-asc":
            return a.title.localeCompare(b.title);
          case "title-desc":
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });
      // Paginate
      const startIndex = (page - 1) * itemsPerPage;
      return {
        allFilteredSorted: sorted,
        pagedPublications: sorted.slice(startIndex, startIndex + itemsPerPage),
        totalCount: sorted.length,
        loading: false,
      };
    } else {
      return {
        allFilteredSorted: dbPublications,
        pagedPublications: dbPublications,
        totalCount: dbTotalCount,
        loading: dbLoading,
      };
    }
  }, [
    staticPublications,
    dbPublications,
    dbTotalCount,
    dbLoading,
    useStaticData,
    searchTerm,
    sortBy,
    page,
    itemsPerPage,
  ]);

  return {
    pagedPublications,
    totalCount,
    allFilteredSorted,
    useStaticData,
    loading,
    error: dbError,
    currentPageCount: pagedPublications.length,
  };
}
