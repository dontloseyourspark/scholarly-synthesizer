
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import InsightsSection from './InsightsSection';
import { handleVote } from '@/utils/handleVote';
import { Insight } from '@/data/insightsData';
import { evolutionInsights } from '@/data/evolutionInsights';

const InsightsContainer: React.FC = () => {
  const [insights, setInsights] = useState<Insight[]>(evolutionInsights);
  const { toast } = useToast();

  const onVote = (insightId: string, voteType: 'up' | 'down') => {
    const updated = handleVote(insightId, voteType, insights);
    setInsights(updated);
    toast({
      title: `You voted ${voteType} on an insight.`,
    });
  };

  return <InsightsSection insights={insights} onVote={onVote} />;
};

export default InsightsContainer;
