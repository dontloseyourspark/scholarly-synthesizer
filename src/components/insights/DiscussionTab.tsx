
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DiscussionTab: React.FC = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/auth');
  };

  return (
    <Card>
      <CardContent className="pt-6 text-center py-12">
        <h3 className="text-xl font-medium mb-4">Discussion</h3>
        <p className="text-muted-foreground mb-6">Join the conversation about this topic.</p>
        <Button 
          className="bg-scholarly-blue hover:bg-scholarly-accent"
          onClick={handleSignInClick}
        >
          Sign In to Participate
        </Button>
      </CardContent>
    </Card>
  );
};

export default DiscussionTab;
