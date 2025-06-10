
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type EmptyStateProps = {
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
};

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  className = "pt-6 text-center"
}) => {
  return (
    <Card>
      <CardContent className={className}>
        <p>{title}</p>
        {description && <p className="text-muted-foreground mt-2">{description}</p>}
        {actionText && onAction && (
          <Button className="mt-4 bg-scholarly-blue hover:bg-scholarly-accent" onClick={onAction}>
            {actionText}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EmptyState;
