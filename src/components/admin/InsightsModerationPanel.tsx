import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const InsightsModerationPanel: React.FC = () => {
  const [pending, setPending] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load pending insights with topic + scholar details
  const fetchPending = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("insights")
      .select(`
        *,
        scholars(*),
        topics(*)
      `)
      .eq("verification_status", "pending")
      .order("created_at", { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load pending insights",
        variant: "destructive",
      });
      setPending([]);
    } else {
      setPending(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const notifyScholar = async (scholarId: string, status: string) => {
    let message = "";
    if (status === "verified") {
      message = "Your insight has been approved and is now publicly visible.";
    } else if (status === "rejected") {
      message = "Your insight submission was rejected by moderators.";
    }
    await supabase.from("notifications").insert({
      user_id: scholarId,
      event_type: status === "verified" ? "insight_approved" : "insight_rejected",
      related_id: null,
      message,
    });
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("insights")
        .update({
          verification_status: status,
          verified_at: status === "verified" ? new Date().toISOString() : null,
        })
        .eq("id", id);

      const insight = pending.find((item) => item.id === id);
      if (insight?.scholar_id) {
        await notifyScholar(insight.scholar_id, status);
      }

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: status === "verified" ? "Approval Successful" : "Insight Rejected",
          description:
            status === "verified"
              ? "Insight has been approved and verified."
              : "This insight has been rejected and removed from the pending list.",
          variant: status === "verified" ? "default" : "destructive",
        });
        setPending((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Pending Insights for Vetting</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>Loading...</div>
        ) : pending.length === 0 ? (
          <div className="text-muted-foreground text-sm">No pending insights.</div>
        ) : (
          <ul className="space-y-4">
            {pending.map((item) => {
              const topicName =
                typeof item.topics?.name === "string"
                  ? item.topics.name
                  : Array.isArray(item.topics) && item.topics[0]?.name
                  ? item.topics[0].name
                  : undefined;

              return (
                <li key={item.id} className="border p-4 rounded">
                  <div className="font-semibold mb-2">
                    {item.scholars?.name || "Unknown Scholar"}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Topic: {topicName || "Unknown Topic"}
                  </div>
                  <div className="mb-1 text-sm">{item.content}</div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Button size="sm" onClick={() => updateStatus(item.id, "verified")}>
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => updateStatus(item.id, "rejected")}
                    >
                      Reject
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default InsightsModerationPanel;
