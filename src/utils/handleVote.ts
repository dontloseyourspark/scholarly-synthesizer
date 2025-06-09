// handleVote.ts
import { useToast } from '@/components/ui/use-toast';

import { useState } from 'react';

const [insights, setInsights] = useState<Insight[]>([]);
  const { toast } = useToast();

  type Insight = {
    id: string;
    content: string;
    votes: number;
    // ...other fields
  };


export const handleVote = (insightId: string, voteType: 'up' | 'down') => {
    setInsights(prevInsights =>
      prevInsights.map(insight =>
        insight.id === insightId
          ? {
              ...insight,
              votes:
                voteType === 'up'
                  ? insight.votes + 1
                  : insight.votes > 0
                  ? insight.votes - 1
                  : 0,
            }
          : insight
      )
    );
    toast({
      title: `You voted ${voteType} on an insight.`,
    });
  };


