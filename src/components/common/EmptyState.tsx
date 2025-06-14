
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

type EmptyStateProps = {
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  actionLink?: string;
  className?: string;
};

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  actionLink,
  className = "pt-6 text-center"
}) => {
  return (
    <Card>
      <CardContent className={className}>
        <p>{title}</p>
        {description && <p className="text-muted-foreground mt-2">{description}</p>}
        {actionText && (
          <>
            {actionLink ? (
              <Button className="mt-4 bg-scholarly-blue hover:bg-scholarly-accent" asChild>
                <Link to={actionLink}>
                  {actionText}
                </Link>
              </Button>
            ) : onAction ? (
              <Button className="mt-4 bg-scholarly-blue hover:bg-scholarly-accent" onClick={onAction}>
                {actionText}
              </Button>
            ) : null}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default EmptyState;
