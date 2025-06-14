
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, LogOut, ShieldCheck, UserCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NavbarUserMenuProps {
  user: any;
  userProfile: any;
  isAdmin: boolean;
  handleSignOut: () => Promise<void>;
}

const NavbarUserMenu = ({ user, userProfile, isAdmin, handleSignOut }: NavbarUserMenuProps) => {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" size="sm" className="bg-scholarly-blue hover:bg-scholarly-accent">
          {userProfile?.avatar_url ? (
            <Avatar className="h-5 w-5 mr-2">
              <AvatarImage src={userProfile.avatar_url} alt={userProfile.username || user.email || 'User'} />
              <AvatarFallback>
                {userProfile.username ? userProfile.username[0].toUpperCase() : user.email?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <User className="h-4 w-4 mr-2" />
          )}
          Profile
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem disabled className="font-medium">
          {userProfile?.username || user.email}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
          <UserCircle className="h-4 w-4 mr-2" />
          Edit Profile
        </DropdownMenuItem>
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/admin')} className="cursor-pointer">
              <ShieldCheck className="h-4 w-4 mr-2" />
              Admin Panel
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-red-500 cursor-pointer">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarUserMenu;
