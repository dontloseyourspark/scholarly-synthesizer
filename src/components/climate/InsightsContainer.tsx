// InsightsContainer.tsx
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import InsightsSection from './InsightsSection';
import { handleVote } from '@/utils/handleVote';
import { Insight } from '@/data/insightsData';
import { insights as initialInsights }  from '@/data/insightsData'; // replace with your real data source

const InsightsContainer: React.FC = () => {
  const [insights, setInsights] = useState<Insight[]>(initialInsights);
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
