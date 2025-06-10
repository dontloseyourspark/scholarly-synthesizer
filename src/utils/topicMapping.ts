
// Utility to map static topic data to database topics
export const getTopicIdFromSlug = (slug: string): number | null => {
  const slugToIdMap: Record<string, number> = {
    'climate-change': 1,
    'evolution-of-humans': 2,
  };
  
  return slugToIdMap[slug] || null;
};

export const getSlugFromTopicId = (topicId: number): string | null => {
  const idToSlugMap: Record<number, string> = {
    1: 'climate-change',
    2: 'evolution-of-humans',
  };
  
  return idToSlugMap[topicId] || null;
};
