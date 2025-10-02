import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddInsightSourceFields from "./AddInsightSourceFields";
import { insightSchema, sourceSchema, sanitizeHtml } from "@/lib/validation/schemas";

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

  // Track visible error for missing profile (not needed, since isScholar covers this case)
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

    try {
      // Validate insight data
      const validatedInsight = insightSchema.parse({
        content,
        position,
        confidence,
      });

      // Sanitize content to prevent XSS
      const sanitizedContent = sanitizeHtml(validatedInsight.content);

      // Submit the insight
      const { data: insertedInsight, error: insertError } = await supabase
        .from("insights")
        .insert({
          topic_id: topicId,
          scholar_id: user.id,
          content: sanitizedContent,
          position: validatedInsight.position,
          confidence: validatedInsight.confidence,
          verification_status: "pending",
        })
        .select("id") // get the new insight id
        .maybeSingle();

      //console.log("[AddInsightForm] Inserted insight:", insertedInsight, "Error:", insertError);

      if (insertError) throw insertError;

      // If a source is provided, validate and add it
      if (insertedInsight && insertedInsight.id && anySourceEntered()) {
        // Validate source data
        const validatedSource = sourceSchema.parse({
          title: sourceTitle || null,
          authors: sourceAuthors || null,
          publication: sourcePublication || null,
          year: sourceYear ? Number(sourceYear) : null,
          url: sourceUrl || null,
          doi: sourceDoi || null,
        });

        const { data: sourceRow, error: sourceError } = await supabase
          .from("sources")
          .insert(validatedSource)
          .select("id")
          .maybeSingle();

        //console.log("[AddInsightForm] Inserted source:", sourceRow, "Error:", sourceError);

        if (sourceError) {
          throw sourceError;
        }
        if (sourceRow && sourceRow.id) {
          // Link in insight_sources
          const { error: linkError } = await supabase
            .from("insight_sources")
            .insert({
              insight_id: insertedInsight.id,
              source_id: sourceRow.id,
            });
          //console.log("[AddInsightForm] Linked source:", sourceRow.id, "to insight:", insertedInsight.id, "Error:", linkError);
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
      const errorMessage = err.errors ? err.errors.map((e: any) => e.message).join(', ') : err.message;
      toast({
        title: "Validation error",
        description: errorMessage || "Please check your input and try again.",
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
        {/* No need for profileError display as eligibility is handled via isScholar */}
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
          <AddInsightSourceFields
            sourceTitle={sourceTitle}
            setSourceTitle={setSourceTitle}
            sourceAuthors={sourceAuthors}
            setSourceAuthors={setSourceAuthors}
            sourcePublication={sourcePublication}
            setSourcePublication={setSourcePublication}
            sourceYear={sourceYear}
            setSourceYear={setSourceYear}
            sourceDoi={sourceDoi}
            setSourceDoi={setSourceDoi}
            sourceUrl={sourceUrl}
            setSourceUrl={setSourceUrl}
          />
          <Button type="submit" disabled={submitting || !content.trim()}>
            {submitting ? "Submitting..." : "Submit Insight"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddInsightForm;
