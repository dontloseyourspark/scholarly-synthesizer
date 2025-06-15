
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';

const EmptyDiscussionState: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-6 text-center py-12">
        <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No discussions yet</h3>
        <p className="text-muted-foreground">Be the first to start a conversation about this topic.</p>
      </CardContent>
    </Card>
  );
};

export default EmptyDiscussionState;
