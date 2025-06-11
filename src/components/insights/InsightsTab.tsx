
import React from 'react';
import InsightsList from './InsightsList';
import { DatabaseInsight } from '@/hooks/useInsights';

type InsightsTabProps = {
  insights: DatabaseInsight[];
  onVote: (insightId: string, voteType: 'up' | 'down') => void;
};

const InsightsTab: React.FC<InsightsTabProps> = ({ insights, onVote }) => {
  return <InsightsList insights={insights} onVote={onVote} />;
};

export default InsightsTab;
