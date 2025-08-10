
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

export type ConsensusLevel = 'high' | 'medium' | 'low' | 'disputed';

type ConsensusIndicatorProps = {
  level: ConsensusLevel;
  percentage: number;
  sampleSize?: number;
  className?: string;
};

const ConsensusIndicator = ({ level, percentage, sampleSize, className }: ConsensusIndicatorProps) => {
  const getColor = () => {
    switch (level) {
      case 'high':
        return 'bg-consensus-high';
      case 'medium':
        return 'bg-consensus-medium';
      case 'low':
        return 'bg-consensus-low';
      case 'disputed':
        return 'bg-consensus-neutral';
      default:
        return 'bg-consensus-neutral';
    }
  };

  const getLabel = () => {
    switch (level) {
      case 'high':
        return 'Strong Consensus';
      case 'medium':
        return 'Moderate Consensus';
      case 'low':
        return 'Emerging Consensus';
      case 'disputed':
        return 'Disputed / No Consensus';
      default:
        return 'No Data';
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-sm font-medium">{getLabel()}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="ml-1 inline-flex">
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">What does this mean?</span>
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>
                  This indicator shows the level of consensus among scholars on this topic.
                  {typeof sampleSize === 'number' ? ` Based on ${sampleSize} peer-reviewed ${sampleSize === 1 ? 'source' : 'sources'}.` : ''}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <span className="text-sm font-medium">{percentage}%</span>
      </div>
      <Progress value={percentage} className={`h-2.5 ${getColor()}`} />
    </div>
  );
};

export default ConsensusIndicator;
