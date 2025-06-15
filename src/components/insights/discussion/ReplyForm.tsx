
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import SimpleCaptcha from '@/components/common/SimpleCaptcha';

interface ReplyFormProps {
  onSubmit: (content: string, parentId: string) => Promise<void>;
  onCancel: () => void;
  parentId: string;
  isSubmitting: boolean;
}

const ReplyForm: React.FC<ReplyFormProps> = ({ onSubmit, onCancel, parentId, isSubmitting }) => {
  const [replyContent, setReplyContent] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [captchaReset, setCaptchaReset] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || isSubmitting || !isCaptchaValid) return;

    await onSubmit(replyContent, parentId);
    setReplyContent('');
    setIsCaptchaValid(false);
    setCaptchaReset(!captchaReset); // Reset captcha after successful submission
  };

  const handleCancel = () => {
    onCancel();
    setReplyContent('');
    setIsCaptchaValid(false);
  };

  return (
    <div className="ml-11">
      <form onSubmit={handleSubmit} className="space-y-3 border-l-2 border-muted pl-4">
        <Textarea
          placeholder="Write a reply..."
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          className="min-h-[80px]"
          disabled={isSubmitting}
        />
        
        <SimpleCaptcha 
          onValidationChange={setIsCaptchaValid}
          reset={captchaReset}
        />
        
        <div className="flex gap-2">
          <Button 
            type="submit" 
            size="sm"
            disabled={!replyContent.trim() || isSubmitting || !isCaptchaValid}
            className="bg-scholarly-blue hover:bg-scholarly-accent"
          >
            {isSubmitting ? 'Posting...' : 'Post Reply'}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReplyForm;
