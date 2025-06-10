
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type DatabaseTopic = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string | null;
};

export const useTopics = () => {
  const [topics, setTopics] = useState<DatabaseTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchTopics = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('topics')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setTopics(data || []);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error fetching topics",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTopic = async (topicData: { name: string; description: string }) => {
    try {
      const { data, error } = await supabase
        .from('topics')
        .insert([topicData])
        .select()
        .single();

      if (error) throw error;

      await fetchTopics();
      toast({
        title: "Topic created",
        description: "New topic has been created successfully.",
      });

      return data;
    } catch (err: any) {
      toast({
        title: "Error creating topic",
        description: err.message,
        variant: "destructive",
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return {
    topics,
    loading,
    error,
    createTopic,
    refetch: fetchTopics
  };
};
