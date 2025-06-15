
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

  // Source fields
  const [sourceTitle, setSourceTitle] = useState("");
  const [sourceAuthors, setSourceAuthors] = useState("");
  const [sourcePublication, setSourcePublication] = useState("");
  const [sourceYear, setSourceYear] = useState<number | "">("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [sourceDoi, setSourceDoi] = useState("");

  // Track visible error for missing profile
  const [profileError, setProfileError] = useState<string | null>(null);

  if (!user || !isScholar) return null;

  // Helper: Are any source fields filled?
  const anySourceEntered = () =>
    sourceTitle.trim() ||
    sourceAuthors.trim() ||
    sourcePublication.trim() ||
    sourceYear ||
    sourceUrl.trim() ||
    sourceDoi.trim();

  // Reset all source fields after submit
  const resetSourceFields = () => {
    setSourceTitle("");
    setSourceAuthors("");
    setSourcePublication("");
    setSourceYear("");
    setSourceUrl("");
    setSourceDoi("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setProfileError(null);
    console.log("[AddInsightForm] handleSubmit triggered");

    try {
      // Find the scholar profile id for this user
      const { data: scholar, error: scholarFetchError } = await supabase
        .from("scholars")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

      console.log("[AddInsightForm] Fetched scholar:", scholar, "Error:", scholarFetchError);

      if (!scholar || scholarFetchError) {
        const errMsg = "Your scholar profile could not be found. Please contact support or ensure you are recognized as a scholar.";
        setProfileError(errMsg);
        toast({
          title: "Profile issue",
          description: errMsg,
          variant: "destructive",
        });
        setSubmitting(false);
        return;
      }

      // Submit the insight
      const { data: insertedInsight, error: insertError } = await supabase
        .from("insights")
        .insert({
          topic_id: topicId,
          scholar_id: user.id,
          content,
          position,
          confidence,
          verification_status: "pending",
        })
        .select("id") // get the new insight id
        .maybeSingle();

      console.log("[AddInsightForm] Inserted insight:", insertedInsight, "Error:", insertError);

      if (insertError) throw insertError;

      // If a source is provided, add it, then link it to the insight
      if (insertedInsight && insertedInsight.id && anySourceEntered()) {
        // Insert into sources table (TODO: handle duplicate detection in future)
        const { data: sourceRow, error: sourceError } = await supabase
          .from("sources")
          .insert({
            title: sourceTitle || null,
            authors: sourceAuthors || null,
            publication: sourcePublication || null,
            year: sourceYear ? Number(sourceYear) : null,
            url: sourceUrl || null,
            doi: sourceDoi || null,
          })
          .select("id")
          .maybeSingle();

        console.log("[AddInsightForm] Inserted source:", sourceRow, "Error:", sourceError);

        if (sourceError) {
          throw sourceError;
        }
        if (sourceRow && sourceRow.id) {
          // Now link in insight_sources
          const { error: linkError } = await supabase
            .from("insight_sources")
            .insert({
              insight_id: insertedInsight.id,
              source_id: sourceRow.id,
            });
          console.log("[AddInsightForm] Linked source:", sourceRow.id, "to insight:", insertedInsight.id, "Error:", linkError);
          if (linkError) throw linkError;
        }
      }

      toast({
        title: "Insight submitted",
        description:
          "Your insight was submitted for review and vetting by the admin team.",
      });
      setContent("");
      resetSourceFields();
      onSubmitted();
    } catch (err: any) {
      console.error("[AddInsightForm] Submission error", err);
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
        {profileError && (
          <div className="mb-4 bg-red-100 text-red-800 border border-red-300 rounded px-4 py-2 text-sm" data-testid="profile-error-msg">
            {profileError}
          </div>
        )}
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
          
          {/* Source submission section */}
          <div className="pt-4 border-t mt-6">
            <label className="block text-base font-medium mb-2">Optional: Add a Source</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                className="w-full px-2 py-1 border rounded"
                placeholder="Title"
                value={sourceTitle}
                onChange={e => setSourceTitle(e.target.value)}
              />
              <input
                type="text"
                className="w-full px-2 py-1 border rounded"
                placeholder="Authors"
                value={sourceAuthors}
                onChange={e => setSourceAuthors(e.target.value)}
              />
              <input
                type="text"
                className="w-full px-2 py-1 border rounded"
                placeholder="Publication (Journal, Book, etc)"
                value={sourcePublication}
                onChange={e => setSourcePublication(e.target.value)}
              />
              <input
                type="number"
                className="w-full px-2 py-1 border rounded"
                placeholder="Year"
                value={sourceYear}
                onChange={e => setSourceYear(e.target.value ? Number(e.target.value) : "")}
              />
              <input
                type="text"
                className="w-full px-2 py-1 border rounded"
                placeholder="DOI"
                value={sourceDoi}
                onChange={e => setSourceDoi(e.target.value)}
              />
              <input
                type="text"
                className="w-full px-2 py-1 border rounded"
                placeholder="URL"
                value={sourceUrl}
                onChange={e => setSourceUrl(e.target.value)}
              />
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Provide publication details or a link to help others verify your insight. All fields are optional.
            </div>
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
