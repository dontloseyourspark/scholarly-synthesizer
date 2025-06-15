import { useState, useEffect, useCallback, useContext } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthContext } from "@/contexts/AuthContext";

export type Discussion = {
  id: string;
  content: string;
  created_at: string;
  user_id: string | null;
  user_profile: any;
  topic_id: number | null;
  parent_id: string | null;
};

const useDiscussions = (topicId: number) => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, userProfile } = useContext(AuthContext);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("discussions")
        .select("*")
        .eq("topic_id", topicId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching discussions:", error);
      }

      setDiscussions(data || []);
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
      .select("*")
      .maybeSingle();

    // If reply, notify parent
    if (!error && data && parentId) {
      // Lookup parent discussion to get its user_id
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
        setDiscussions((prevDiscussions) =>
          prevDiscussions.filter((discussion) => discussion.id !== id)
        );
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
