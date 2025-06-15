
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useDiscussions } from '@/hooks/useDiscussions';
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle, Reply } from 'lucide-react';

interface DiscussionTabProps {
  topicId: number;
}

const DiscussionTab: React.FC<DiscussionTabProps> = ({ topicId }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { discussions, loading, createDiscussion } = useDiscussions(topicId);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignInClick = () => {
    navigate('/auth');
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await createDiscussion(newComment);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || !replyingTo || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await createDiscussion(replyContent, replyingTo);
      setReplyContent('');
      setReplyingTo(null);
    } catch (error) {
      console.error('Error posting reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="pt-6 text-center py-12">
          <h3 className="text-xl font-medium mb-4">Discussion</h3>
          <p className="text-muted-foreground mb-6">Join the conversation about this topic.</p>
          <Button 
            className="bg-scholarly-blue hover:bg-scholarly-accent"
            onClick={handleSignInClick}
          >
            Sign In to Participate
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* New Comment Form */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmitComment} className="space-y-4">
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
            <Button 
              type="submit" 
              disabled={!newComment.trim() || isSubmitting}
              className="bg-scholarly-blue hover:bg-scholarly-accent"
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Discussion List */}
      {loading ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <p>Loading discussions...</p>
          </CardContent>
        </Card>
      ) : discussions.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No discussions yet</h3>
            <p className="text-muted-foreground">Be the first to start a conversation about this topic.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {discussions.map((discussion) => (
            <Card key={discussion.id}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {formatDistanceToNow(new Date(discussion.created_at), { addSuffix: true })}
                    </p>
                    <p className="text-foreground whitespace-pre-wrap">{discussion.content}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setReplyingTo(replyingTo === discussion.id ? null : discussion.id)}
                    >
                      <Reply className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                  </div>

                  {/* Reply Form */}
                  {replyingTo === discussion.id && (
                    <form onSubmit={handleSubmitReply} className="space-y-3 ml-4 border-l-2 border-muted pl-4">
                      <Textarea
                        placeholder="Write a reply..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="min-h-[80px]"
                        disabled={isSubmitting}
                      />
                      <div className="flex gap-2">
                        <Button 
                          type="submit" 
                          size="sm"
                          disabled={!replyContent.trim() || isSubmitting}
                          className="bg-scholarly-blue hover:bg-scholarly-accent"
                        >
                          {isSubmitting ? 'Posting...' : 'Post Reply'}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyContent('');
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  )}

                  {/* Replies */}
                  {discussion.replies && discussion.replies.length > 0 && (
                    <div className="ml-4 space-y-3 border-l-2 border-muted pl-4">
                      {discussion.replies.map((reply) => (
                        <div key={reply.id} className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
                          </p>
                          <p className="text-foreground whitespace-pre-wrap">{reply.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiscussionTab;
