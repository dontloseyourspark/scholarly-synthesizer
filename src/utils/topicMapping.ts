
// Utility to map static topic data to database topics
export const getTopicIdFromSlug = (slug: string): number | null => {
  const slugToIdMap: Record<string, number> = {
    'climate-change': 1,
    'evolution-of-humans': 2,
    'vaccine-efficacy': 3,
    'artificial-intelligence-safety': 4,
    'nutrition-science': 5,
    'quantum-computing': 6,
    'economic-impacts-immigration': 7,
    'effectiveness-psychotherapy': 8,
  };
  
  return slugToIdMap[slug] || null;
};

export const getSlugFromTopicId = (topicId: number): string | null => {
  const idToSlugMap: Record<number, string> = {
    1: 'climate-change',
    2: 'evolution-of-humans',
    3: 'vaccine-efficacy',
    4: 'artificial-intelligence-safety',
    5: 'nutrition-science',
    6: 'quantum-computing',
    7: 'economic-impacts-immigration',
    8: 'effectiveness-psychotherapy',
  };
  
  return idToSlugMap[topicId] || null;
};
