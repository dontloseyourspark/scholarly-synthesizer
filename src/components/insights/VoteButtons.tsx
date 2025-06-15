
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

type VoteButtonsProps = {
  upvotes: number;
  downvotes: number;
  onVote: (voteType: 'up' | 'down') => void;
};

const VoteButtons: React.FC<VoteButtonsProps> = ({ upvotes, downvotes, onVote }) => {
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
        variant="outline" 
        size="sm"
        onClick={() => handleVote('up')}
        className="text-muted-foreground hover:text-scholarly-blue"
        title={!user ? "Sign in to vote" : "Upvote this insight"}
      >
        <ThumbsUp className="h-4 w-4 mr-1" />
        {upvotes}
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => handleVote('down')}
        className="text-muted-foreground hover:text-scholarly-blue"
        title={!user ? "Sign in to vote" : "Downvote this insight"}
      >
        <ThumbsDown className="h-4 w-4 mr-1" />
        {downvotes}
      </Button>
    </div>
  );
};

export default VoteButtons;
