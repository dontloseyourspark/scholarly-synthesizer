import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AddInsightFormProps = {
  topicId: number;
  onSubmitted: () => void;
};

const AddInsightForm: React.FC<AddInsightFormProps> = ({ topicId, onSubmitted }) => {
  const { user, isScholar } = useAuth();
  const { toast } = useToast();

  const [content, setContent] = useState("");
  const [position, setPosition] = useState<"support" | "neutral" | "against">("support");
  const [confidence, setConfidence] = useState(80);

  const [submitting, setSubmitting] = useState(false);

  if (!user || !isScholar) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Find the scholar profile id for this user
      const { data: scholar } = await supabase
        .from("scholars")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

      if (!scholar) {
        toast({
          title: "Profile issue",
          description: "Your scholar profile could not be found.",
          variant: "destructive",
        });
        setSubmitting(false);
        return;
      }

      const { error: insertError } = await supabase.from("insights").insert({
        topic_id: topicId,
        scholar_id: user.id,
        content,
        position,
        confidence,
        verification_status: "pending",
      });

      if (insertError) throw insertError;

      toast({
        title: "Insight submitted",
        description: "Your insight was submitted for review and vetting by the admin team.",
      });
      setContent("");
      onSubmitted();
    } catch (err: any) {
      toast({
        title: "Submission error",
        description: err.message || "There was a problem submitting your insight.",
        variant: "destructive",
      });
    }
    setSubmitting(false);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Contribute an Insight</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Your Insight</label>
            <textarea
              className="w-full px-3 py-2 border rounded min-h-[70px]"
              required
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Position</label>
            <select
              className="w-full px-2 py-1 border rounded"
              value={position}
              onChange={e => setPosition(e.target.value as any)}
            >
              <option value="support">Support</option>
              <option value="neutral">Neutral</option>
              <option value="against">Against</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confidence (%)</label>
            <input
              type="number"
              min={0}
              max={100}
              className="w-full px-2 py-1 border rounded"
              value={confidence}
              onChange={e => setConfidence(Number(e.target.value))}
            />
          </div>
          <Button type="submit" disabled={submitting || !content.trim()}>
            {submitting ? "Submitting..." : "Submit Insight"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddInsightForm;
