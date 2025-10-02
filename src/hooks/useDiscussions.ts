
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type Discussion = {
  id: string;
  content: string;
  created_at: string;
  user_id?: string | null; // Optional - only available to authenticated users for their own discussions
  user_profile: any;
  topic_id: number | null;
  parent_id: string | null;
  replies?: Discussion[];
};

// Export alias for backward compatibility
export type DatabaseDiscussion = Discussion;

const useDiscussions = (topicId: number) => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, userProfile } = useAuth();

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      // Don't select user_id to protect user privacy (prevents tracking/profiling)
      // Only select fields needed for display
      const { data, error } = await supabase
        .from("discussions")
        .select(`
          id,
          content,
          created_at,
          topic_id,
          parent_id,
          user_profile
        `)
        .eq("topic_id", topicId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching discussions:", error);
      }

      // Group discussions by parent/child relationship
      const discussionsMap = new Map<string, Discussion>();
      const rootDiscussions: Discussion[] = [];

      // First pass: create map of all discussions
      (data || []).forEach((d) => {
        discussionsMap.set(d.id, { ...d, replies: [] });
      });

      // Second pass: organize into parent-child structure
      (data || []).forEach((d) => {
        const discussion = discussionsMap.get(d.id)!;
        if (d.parent_id && discussionsMap.has(d.parent_id)) {
          const parent = discussionsMap.get(d.parent_id)!;
          parent.replies!.push(discussion);
        } else {
          rootDiscussions.push(discussion);
        }
      });

      setDiscussions(rootDiscussions);
    } finally {
      setLoading(false);
    }
  }, [topicId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll, topicId]);

  // After adding a comment, send a notification to the recipient (parent user if it's a reply)
  const createDiscussion = async (content: string, parentId?: string) => {
    const { data, error } = await supabase
      .from("discussions")
      .insert({
        topic_id: topicId,
        content: content,
        parent_id: parentId || null,
        user_id: user?.id,
        user_profile: {
          username: userProfile?.username,
        }
      })
      .select(`
        id,
        content,
        created_at,
        topic_id,
        parent_id,
        user_profile
      `)
      .maybeSingle();

    // If reply, notify parent
    if (!error && data && parentId) {
      // Lookup parent discussion to get its user_id (we can query it but not expose it publicly)
      const { data: parentRow } = await supabase
        .from("discussions")
        .select("user_id")
        .eq("id", parentId)
        .maybeSingle();

      if (parentRow?.user_id && parentRow.user_id !== user?.id) {
        await supabase.from("notifications").insert({
          user_id: parentRow.user_id,
          event_type: "reply",
          related_id: data.id,
          message: `${userProfile?.username || "Someone"} replied to your comment.`,
        });
      }
    }

    // Refresh discussions after creating
    await fetchAll();
    return { data, error };
  };

  const remove = async (id: string) => {
    try {
      const { error } = await supabase
        .from("discussions")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting discussion:", error);
      } else {
        await fetchAll();
      }
    } catch (error) {
      console.error("Error deleting discussion:", error);
    }
  };

  return {
    discussions,
    loading,
    createDiscussion,
    fetchAll,
    remove,
  };
};

export { useDiscussions };
