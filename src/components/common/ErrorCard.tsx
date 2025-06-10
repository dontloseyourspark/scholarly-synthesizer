
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type ErrorCardProps = {
  error: string;
  onRetry?: () => void;
  retryText?: string;
};

const ErrorCard: React.FC<ErrorCardProps> = ({ 
  error, 
  onRetry, 
  retryText = "Try Again" 
}) => {
  return (
    <Card>
      <CardContent className="pt-6 text-center">
        <p className="text-red-600">Error: {error}</p>
        {onRetry && (
          <Button className="mt-4" onClick={onRetry}>
            {retryText}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ErrorCard;
