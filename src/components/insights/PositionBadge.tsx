
import React from 'react';
import { Badge } from '@/components/ui/badge';

type PositionBadgeProps = {
  position: 'support' | 'neutral' | 'against';
};

const PositionBadge: React.FC<PositionBadgeProps> = ({ position }) => {
  const getBadgeClass = () => {
    switch (position) {
      case 'support':
        return 'bg-consensus-high';
      case 'neutral':
        return 'bg-consensus-neutral';
      case 'against':
        return 'bg-consensus-low';
      default:
        return 'bg-consensus-neutral';
    }
  };

  const getBadgeText = () => {
    switch (position) {
      case 'support':
        return 'Supporting Consensus';
      case 'neutral':
        return 'Neutral Position';
      case 'against':
        return 'Against Consensus';
      default:
        return 'Unknown Position';
    }
  };

  return (
    <Badge className={`${getBadgeClass()} text-white`}>
      {getBadgeText()}
    </Badge>
  );
};

export default PositionBadge;
