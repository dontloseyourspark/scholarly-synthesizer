
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useDiscussions } from '@/hooks/useDiscussions';
import DiscussionForm from './discussion/DiscussionForm';
import DiscussionComment from './discussion/DiscussionComment';
import ReplyForm from './discussion/ReplyForm';
import EmptyDiscussionState from './discussion/EmptyDiscussionState';
import SignInPrompt from './discussion/SignInPrompt';

interface DiscussionTabProps {
  topicId: number;
}

const DiscussionTab: React.FC<DiscussionTabProps> = ({ topicId }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { discussions, loading, createDiscussion } = useDiscussions(topicId);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignInClick = () => {
    navigate('/auth');
  };

  const handleSubmitComment = async (content: string) => {
    setIsSubmitting(true);
    try {
      await createDiscussion(content);
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitReply = async (content: string, parentId: string) => {
    setIsSubmitting(true);
    try {
      await createDiscussion(content, parentId);
      setReplyingTo(null);
    } catch (error) {
      console.error('Error posting reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReply = (discussionId: string) => {
    setReplyingTo(replyingTo === discussionId ? null : discussionId);
  };

  if (!user) {
    return <SignInPrompt onSignInClick={handleSignInClick} />;
  }

  return (
    <div className="space-y-6">
      <DiscussionForm onSubmit={handleSubmitComment} isSubmitting={isSubmitting} />

      {loading ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <p>Loading discussions...</p>
          </CardContent>
        </Card>
      ) : discussions.length === 0 ? (
        <EmptyDiscussionState />
      ) : (
        <div className="space-y-4">
          {discussions.map((discussion) => (
            <Card key={discussion.id}>
              <CardContent className="pt-6">
                <DiscussionComment
                  discussion={discussion}
                  onReply={handleReply}
                  isReplying={replyingTo === discussion.id}
                />

                {replyingTo === discussion.id && (
                  <ReplyForm
                    onSubmit={handleSubmitReply}
                    onCancel={() => setReplyingTo(null)}
                    parentId={discussion.id}
                    isSubmitting={isSubmitting}
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiscussionTab;
