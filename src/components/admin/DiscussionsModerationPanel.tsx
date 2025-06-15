import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Discussion = {
  id: string;
  content: string;
  created_at: string;
  user_profile: any;
  topic_id: number;
  parent_id: string | null;
};

const DiscussionsModerationPanel: React.FC = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [topicsById, setTopicsById] = useState<Record<number, string>>({});
  const { toast } = useToast();

  // Fetch all topics (id -> name mapping)
  const fetchTopics = async () => {
    const { data, error } = await supabase
      .from("topics")
      .select("id, name");
    if (!error && data) {
      const map: Record<number, string> = {};
      data.forEach((t: any) => { if (t.id) map[t.id] = t.name; });
      setTopicsById(map);
    }
  };

  // Fetch all discussions for moderation
  const fetchDiscussions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("discussions")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (!error) {
      setDiscussions(data || []);
    } else {
      toast({ 
        title: "Error", 
        description: "Failed to load discussions", 
        variant: "destructive" 
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTopics();
    fetchDiscussions();
  }, []);

  const removeDiscussion = async (id: string) => {
    const { error } = await supabase
      .from("discussions")
      .delete()
      .eq("id", id);
    
    if (!error) {
      toast({ 
        title: "Discussion Removed", 
        description: "The selected comment/discussion has been deleted successfully.",
        variant: "default"
      });
      setDiscussions(prev => prev.filter(d => d.id !== id));
    } else {
      toast({ 
        title: "Error", 
        description: error.message, 
        variant: "destructive" 
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments & Discussions Moderation</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>Loading discussions...</div>
        ) : discussions.length === 0 ? (
          <div className="text-muted-foreground text-sm">No discussions found.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Topic</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {discussions.map((discussion) => (
                <TableRow key={discussion.id}>
                  <TableCell>
                    <div className="font-medium">
                      {discussion.user_profile?.username || 'Anonymous'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate">
                      {discussion.content}
                    </div>
                  </TableCell>
                  <TableCell>
                    {discussion.topic_id && topicsById[discussion.topic_id]
                      ? topicsById[discussion.topic_id] 
                      : 'Unknown Topic'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={discussion.parent_id ? "secondary" : "default"}>
                      {discussion.parent_id ? "Reply" : "Comment"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(discussion.created_at)}
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => removeDiscussion(discussion.id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default DiscussionsModerationPanel;
