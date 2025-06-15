
import React from 'react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { Reply } from 'lucide-react';
import ScholarAvatar from '../ScholarAvatar';
import { DatabaseDiscussion } from '@/hooks/useDiscussions';

interface DiscussionCommentProps {
  discussion: DatabaseDiscussion;
  onReply: (discussionId: string) => void;
  isReplying: boolean;
  showReplyButton?: boolean;
}

const DiscussionComment: React.FC<DiscussionCommentProps> = ({ 
  discussion, 
  onReply, 
  isReplying,
  showReplyButton = true
}) => {
  return (
    <div className="space-y-4">
      {/* User Info and Content */}
      <div className="flex items-start space-x-3">
        <ScholarAvatar 
          name={discussion.user_profile?.username || 'Anonymous'} 
          avatarUrl={discussion.user_profile?.avatar_url}
          size="sm"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm font-medium text-foreground">
              {discussion.user_profile?.username || 'Anonymous'}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(discussion.created_at), { addSuffix: true })}
            </span>
          </div>
          <p className="text-foreground whitespace-pre-wrap">{discussion.content}</p>
        </div>
      </div>

      {/* Actions */}
      {showReplyButton && (
        <div className="flex items-center gap-2 ml-11">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onReply(discussion.id)}
          >
            <Reply className="h-4 w-4 mr-1" />
            Reply
          </Button>
        </div>
      )}

      {/* Replies */}
      {discussion.replies && discussion.replies.length > 0 && (
        <div className="ml-11 space-y-3 border-l-2 border-muted pl-4">
          {discussion.replies.map((reply) => (
            <div key={reply.id} className="flex items-start space-x-3">
              <ScholarAvatar 
                name={reply.user_profile?.username || 'Anonymous'} 
                avatarUrl={reply.user_profile?.avatar_url}
                size="sm"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-foreground">
                    {reply.user_profile?.username || 'Anonymous'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-foreground whitespace-pre-wrap">{reply.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiscussionComment;
