
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

type VoteButtonsProps = {
  upvotes: number;
  downvotes: number;
  onVote: (voteType: 'up' | 'down') => void;
  userVote?: 'up' | 'down' | null;
};

const VoteButtons: React.FC<VoteButtonsProps> = ({ upvotes, downvotes, onVote, userVote }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleVote = (voteType: 'up' | 'down') => {
    if (!user) {
      navigate('/auth');
      return;
    }
    onVote(voteType);
  };

  return (
    <div className="flex items-center space-x-4">
      <Button 
        variant={userVote === 'up' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => handleVote('up')}
        className={
          (userVote === 'up'
            ? 'bg-green-500 border-green-600 text-white hover:bg-green-600 '
            : 'text-muted-foreground hover:text-green-600 hover:border-green-600 '
          ) + 'transition-colors'
        }
        aria-pressed={userVote === 'up'}
        title={!user ? "Sign in to vote" : "Upvote this insight"}
      >
        <ThumbsUp className="h-4 w-4 mr-1" />
        {upvotes || 0}
      </Button>
      <Button 
        variant={userVote === 'down' ? 'default' : 'outline'}
        size="sm"
        onClick={() => handleVote('down')}
        className={
          (userVote === 'down'
            ? 'bg-red-500 border-red-600 text-white hover:bg-red-600 '
            : 'text-muted-foreground hover:text-red-600 hover:border-red-600 '
          ) + 'transition-colors'
        }
        aria-pressed={userVote === 'down'}
        title={!user ? "Sign in to vote" : "Downvote this insight"}
      >
        <ThumbsDown className="h-4 w-4 mr-1" />
        {downvotes || 0}
      </Button>
    </div>
  );
};

export default VoteButtons;
