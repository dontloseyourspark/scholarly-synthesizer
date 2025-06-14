
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

export const useTopicPublications = (topicId: number) => {
  const [publications, setPublications] = useState<TopicPublication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchPublications = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('topic_publications')
        .select('*')
        .eq('topic_id', topicId)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      
      setPublications(data || []);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error fetching topic publications",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, [topicId]);

  return {
    publications,
    keyPublications: publications.filter(p => p.is_key_publication),
    loading,
    error,
    refetch: fetchPublications
  };
};
