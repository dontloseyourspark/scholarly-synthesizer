
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SignInPromptProps {
  onSignInClick: () => void;
}

const SignInPrompt: React.FC<SignInPromptProps> = ({ onSignInClick }) => {
  return (
    <Card>
      <CardContent className="pt-6 text-center py-12">
        <h3 className="text-xl font-medium mb-4">Discussion</h3>
        <p className="text-muted-foreground mb-6">Join the conversation about this topic.</p>
        <Button 
          className="bg-scholarly-blue hover:bg-scholarly-accent"
          onClick={onSignInClick}
        >
          Sign In to Participate
        </Button>
      </CardContent>
    </Card>
  );
};

export default SignInPrompt;
