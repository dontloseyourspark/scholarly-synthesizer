
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import SimpleCaptcha from '@/components/common/SimpleCaptcha';
import { discussionSchema, sanitizeHtml } from '@/lib/validation/schemas';
import { toast } from 'sonner';

interface DiscussionFormProps {
  onSubmit: (content: string) => Promise<void>;
  isSubmitting: boolean;
}

const DiscussionForm: React.FC<DiscussionFormProps> = ({ onSubmit, isSubmitting }) => {
  const [newComment, setNewComment] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [captchaReset, setCaptchaReset] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting || !isCaptchaValid) return;

    try {
      // Validate comment
      const validated = discussionSchema.parse({ content: newComment });
      const sanitized = sanitizeHtml(validated.content);
      
      await onSubmit(sanitized);
      setNewComment('');
      setIsCaptchaValid(false);
      setCaptchaReset(!captchaReset);
    } catch (err: any) {
      const errorMessage = err.errors ? err.errors.map((e: any) => e.message).join(', ') : err.message;
      toast.error(errorMessage || 'Invalid comment');
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="new-comment">Add to the discussion</Label>
            <Textarea
              id="new-comment"
              placeholder="Share your thoughts on this topic..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px]"
              disabled={isSubmitting}
            />
          </div>
          
          <SimpleCaptcha 
            onValidationChange={setIsCaptchaValid}
            reset={captchaReset}
          />
          
          <Button 
            type="submit" 
            disabled={!newComment.trim() || isSubmitting || !isCaptchaValid}
            className="bg-scholarly-blue hover:bg-scholarly-accent"
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DiscussionForm;
