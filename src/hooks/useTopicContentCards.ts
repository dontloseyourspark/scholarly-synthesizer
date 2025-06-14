
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type TopicContentCard = {
  id: string;
  topic_id: number;
  title: string;
  description: string;
  icon_name: string | null;
  icon_color: string | null;
  sort_order: number;
};

export const useTopicContentCards = (topicId: number) => {
  const [cards, setCards] = useState<TopicContentCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCards = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('topic_content_cards')
        .select('*')
        .eq('topic_id', topicId)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      
      setCards(data || []);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error fetching topic content cards",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [topicId]);

  return {
    cards,
    loading,
    error,
    refetch: fetchCards
  };
};
