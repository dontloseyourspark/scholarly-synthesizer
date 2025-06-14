
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import NavbarUserMenu from './NavbarUserMenu';

interface NavbarAuthProps {
  user: any;
  userProfile: any;
  isAdmin: boolean;
  handleSignOut: () => Promise<void>;
}

const NavbarAuth = ({ user, userProfile, isAdmin, handleSignOut }: NavbarAuthProps) => {
  const navigate = useNavigate();

  if (!user) {
    return (
      <Button 
        variant="default" 
        size="sm" 
        className="bg-scholarly-blue hover:bg-scholarly-accent"
        onClick={() => navigate('/auth')}
      >
        <User className="h-4 w-4 mr-2" />
        Sign In
      </Button>
    );
  }

  return (
    <NavbarUserMenu 
      user={user} 
      userProfile={userProfile} 
      isAdmin={isAdmin} 
      handleSignOut={handleSignOut} 
    />
  );
};

export default NavbarAuth;
