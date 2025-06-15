
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const InsightsModerationPanel: React.FC = () => {
  const [pending, setPending] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPending = async () => {
    setLoading(true);
    console.log('Fetching pending insights...');
    
    // First, let's try a simpler query to see what we get
    const { data, error } = await supabase
      .from("insights")
      .select(`
        *, 
        scholars(id, name, title, institution, avatar_url),
        topics(id, name)
      `)
      .eq("verification_status", "pending")
      .order("created_at", { ascending: true });
    
    if (error) {
      console.error('Error fetching pending insights:', error);
      toast({
        title: "Error",
        description: "Failed to load pending insights",
        variant: "destructive",
      });
    } else {
      console.log('Fetched pending insights:', data);
      setPending(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchPending(); }, []);

  const updateStatus = async (id: string, status: string) => {
    console.log(`Updating insight ${id} to status: ${status}`);
    try {
      const { error } = await supabase
        .from("insights")
        .update({ 
          verification_status: status, 
          verified_at: status === "verified" ? new Date().toISOString() : null 
        })
        .eq("id", id);
      
      if (error) {
        console.error('Error updating insight status:', error);
        toast({ 
          title: "Error", 
          description: error.message, 
          variant: "destructive" 
        });
      } else {
        console.log(`Successfully updated insight ${id} to ${status}`);
        toast({ 
          title: `Insight ${status}`, 
          description: `Insight has been ${status}.` 
        });
        // Remove the item from pending list
        setPending(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast({ 
        title: "Error", 
        description: "An unexpected error occurred", 
        variant: "destructive" 
      });
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Pending Insights for Vetting</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? <div>Loading...</div> : (
          pending.length === 0 ? (
            <div className="text-muted-foreground text-sm">No pending insights.</div>
          ) : (
            <ul className="space-y-4">
              {pending.map((item) => (
                <li key={item.id} className="border p-4 rounded">
                  <div className="font-semibold mb-2">{item.scholars?.name || 'Unknown Scholar'}</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Topic: {item.topics?.name || `Topic ID: ${item.topic_id}` || 'Unknown Topic'}
                  </div>
                  <div className="mb-1 text-sm">{item.content}</div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Button size="sm" onClick={() => updateStatus(item.id, "verified")}>Approve</Button>
                    <Button size="sm" variant="destructive" onClick={() => updateStatus(item.id, "rejected")}>Reject</Button>
                  </div>
                </li>
              ))}
            </ul>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default InsightsModerationPanel;
