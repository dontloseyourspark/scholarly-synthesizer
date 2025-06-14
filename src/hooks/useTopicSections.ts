
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type TopicSection = {
  id: string;
  topic_id: number;
  section_type: 'hero' | 'description' | 'content' | 'visualizations' | 'call_to_action';
  title: string | null;
  subtitle: string | null;
  description: string | null;
  additional_content: string | null;
  category_label: string | null;
  category_icon: string | null;
  sort_order: number;
};

export const useTopicSections = (topicId: number) => {
  const [sections, setSections] = useState<TopicSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchSections = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('topic_sections')
        .select('*')
        .eq('topic_id', topicId)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      
      // Type cast the data to ensure proper typing
      const typedSections = (data || []).map(section => ({
        ...section,
        section_type: section.section_type as TopicSection['section_type']
      }));
      
      setSections(typedSections);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error fetching topic sections",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, [topicId]);

  return {
    sections,
    loading,
    error,
    refetch: fetchSections
  };
};
