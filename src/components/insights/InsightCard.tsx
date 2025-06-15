
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ScholarInfo from './ScholarInfo';
import PositionBadge from './PositionBadge';
import SourcesList from './SourcesList';
import VoteButtons from './VoteButtons';
import { DatabaseInsight } from '@/hooks/useInsights';

type InsightCardProps = {
  insight: DatabaseInsight;
  onVote: (insightId: string, voteType: 'up' | 'down') => void;
};

const InsightCard: React.FC<InsightCardProps> = ({ insight, onVote }) => {
  const handleVote = (voteType: 'up' | 'down') => {
    console.log('InsightCard handleVote called:', { insightId: insight.id, voteType });
    onVote(insight.id, voteType);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <ScholarInfo scholar={insight.scholar} />
          <PositionBadge position={insight.position} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{insight.content}</p>
        
        <SourcesList sources={insight.sources} variant="compact" />
        
        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-muted-foreground">
            Contributed on {new Date(insight.created_at).toLocaleDateString()}
          </div>
          <VoteButtons 
            upvotes={insight.upvotes || 0}
            downvotes={insight.downvotes || 0}
            onVote={handleVote}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightCard;
