
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type TopicPublication = {
  id: string;
  topic_id: number;
  title: string;
  authors: string;
  year: number;
  url: string;
  doi: string | null;
  publication: string | null;
  is_key_publication: boolean;
  sort_order: number;
};

export type PublicationFilters = {
  searchTerm?: string;
  sortBy?: 'year-desc' | 'year-asc' | 'title-asc' | 'title-desc';
  page?: number;
  itemsPerPage?: number;
};

export const useTopicPublications = (topicId: number, filters: PublicationFilters = {}) => {
  const [publications, setPublications] = useState<TopicPublication[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    searchTerm = '',
    sortBy = 'year-desc',
    page = 1,
    itemsPerPage = 10
  } = filters;

  const fetchPublications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let query = supabase
        .from('topic_publications')
        .select('*', { count: 'exact' })
        .eq('topic_id', topicId);

      // Apply search filter
      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,authors.ilike.%${searchTerm}%`);
      }

      // Apply sorting
      switch (sortBy) {
        case 'year-desc':
          query = query.order('year', { ascending: false });
          break;
        case 'year-asc':
          query = query.order('year', { ascending: true });
          break;
        case 'title-asc':
          query = query.order('title', { ascending: true });
          break;
        case 'title-desc':
          query = query.order('title', { ascending: false });
          break;
      }

      // Apply pagination
      const from = (page - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;
      
      setPublications(data || []);
      setTotalCount(count || 0);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error fetching publications",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, [topicId, searchTerm, sortBy, page, itemsPerPage]);

  return {
    publications,
    keyPublications: publications.filter(p => p.is_key_publication),
    totalCount,
    loading,
    error,
    refetch: fetchPublications
  };
};
