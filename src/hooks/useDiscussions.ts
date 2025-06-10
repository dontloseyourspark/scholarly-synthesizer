
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type DatabaseDiscussion = {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  parent_id: string | null;
  user: {
    id: string;
    username: string | null;
    avatar_url: string | null;
  } | null;
  replies?: DatabaseDiscussion[];
};

export const useDiscussions = (topicId: number) => {
  const [discussions, setDiscussions] = useState<DatabaseDiscussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchDiscussions = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('discussions')
        .select(`
          *,
          profiles (
            id,
            username,
            avatar_url
          )
        `)
        .eq('topic_id', topicId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      // Transform the data to include user info and organize replies
      const transformedData = (data || []).map(discussion => ({
        ...discussion,
        user: discussion.profiles ? {
          id: discussion.profiles.id,
          username: discussion.profiles.username,
          avatar_url: discussion.profiles.avatar_url
        } : null
      }));

      // Organize discussions with replies
      const topLevelDiscussions = transformedData.filter(d => !d.parent_id);
      const repliesMap = new Map();
      
      transformedData.filter(d => d.parent_id).forEach(reply => {
        if (!repliesMap.has(reply.parent_id)) {
          repliesMap.set(reply.parent_id, []);
        }
        repliesMap.get(reply.parent_id).push(reply);
      });

      const discussionsWithReplies = topLevelDiscussions.map(discussion => ({
        ...discussion,
        replies: repliesMap.get(discussion.id) || []
      }));

      setDiscussions(discussionsWithReplies);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error fetching discussions",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createDiscussion = async (content: string, parentId?: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to participate in discussions.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('discussions')
        .insert({
          topic_id: topicId,
          user_id: user.id,
          content,
          parent_id: parentId || null
        });

      if (error) throw error;

      await fetchDiscussions();
      toast({
        title: "Comment posted",
        description: "Your comment has been added to the discussion.",
      });
    } catch (err: any) {
      toast({
        title: "Error posting comment",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchDiscussions();
  }, [topicId]);

  return {
    discussions,
    loading,
    error,
    createDiscussion,
    refetch: fetchDiscussions
  };
};
