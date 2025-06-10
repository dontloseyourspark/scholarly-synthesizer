
import React from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

type VoteButtonsProps = {
  upvotes: number;
  downvotes: number;
  onVote: (voteType: 'up' | 'down') => void;
};

const VoteButtons: React.FC<VoteButtonsProps> = ({ upvotes, downvotes, onVote }) => {
  return (
    <div className="flex items-center space-x-4">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onVote('up')}
        className="text-muted-foreground hover:text-scholarly-blue"
      >
        <ThumbsUp className="h-4 w-4 mr-1" />
        {upvotes}
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onVote('down')}
        className="text-muted-foreground hover:text-scholarly-blue"
      >
        <ThumbsDown className="h-4 w-4 mr-1" />
        {downvotes}
      </Button>
    </div>
  );
};

export default VoteButtons;
