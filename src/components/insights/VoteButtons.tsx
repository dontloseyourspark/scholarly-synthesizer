
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
    console.log('Vote button clicked:', voteType);
    if (!user) {
      console.log('User not authenticated, redirecting to auth');
      navigate('/auth');
      return;
    }
    console.log('Calling onVote with:', voteType);
    onVote(voteType);
  };

  return (
    <div className="flex items-center space-x-4">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => handleVote('up')}
        className="text-muted-foreground hover:text-green-600 hover:border-green-600 transition-colors"
        title={!user ? "Sign in to vote" : "Upvote this insight"}
      >
        <ThumbsUp className="h-4 w-4 mr-1" />
        {upvotes || 0}
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => handleVote('down')}
        className="text-muted-foreground hover:text-red-600 hover:border-red-600 transition-colors"
        title={!user ? "Sign in to vote" : "Downvote this insight"}
      >
        <ThumbsDown className="h-4 w-4 mr-1" />
        {downvotes || 0}
      </Button>
    </div>
  );
};

export default VoteButtons;
