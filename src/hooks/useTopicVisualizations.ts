
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type TopicVisualization = {
  id: string;
  topic_id: number;
  tab_key: string;
  tab_label: string;
  chart_type: 'consensus' | 'bar' | 'line' | 'pie' | 'custom';
  chart_data: any;
  chart_config: any;
  content_title: string | null;
  content_description: string | null;
  source_citation: string | null;
  sort_order: number;
};

export const useTopicVisualizations = (topicId: number) => {
  const [visualizations, setVisualizations] = useState<TopicVisualization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchVisualizations = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('topic_visualizations')
        .select('*')
        .eq('topic_id', topicId)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      
      setVisualizations(data || []);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error fetching topic visualizations",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisualizations();
  }, [topicId]);

  return {
    visualizations,
    loading,
    error,
    refetch: fetchVisualizations
  };
};
