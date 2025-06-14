
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Search, User, LogOut, ShieldCheck, UserCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface NavbarMobileMenuProps {
  user: any;
  userProfile: any;
  isAdmin: boolean;
  handleSignOut: () => Promise<void>;
}

const NavbarMobileMenu = ({ user, userProfile, isAdmin, handleSignOut }: NavbarMobileMenuProps) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <nav className="flex flex-col space-y-4 mt-6">
          <Link to="/" className="text-foreground hover:text-scholarly-blue transition-colors">
            Home
          </Link>
          <Link to="/topics" className="text-foreground hover:text-scholarly-blue transition-colors">
            Topics
          </Link>
          <Link to="/contribute" className="text-foreground hover:text-scholarly-blue transition-colors">
            Contribute
          </Link>
          <Link to="/about" className="text-foreground hover:text-scholarly-blue transition-colors">
            About
          </Link>
          {user && (
            <Link to="/profile" className="text-foreground hover:text-scholarly-blue transition-colors flex items-center">
              <UserCircle className="h-4 w-4 mr-1" />
              Edit Profile
            </Link>
          )}
          {isAdmin && (
            <Link to="/admin" className="text-foreground hover:text-scholarly-blue transition-colors flex items-center">
              <ShieldCheck className="h-4 w-4 mr-1" />
              Admin Panel
            </Link>
          )}
          <hr className="border-border" />
          <Button variant="outline" size="sm" className="flex items-center justify-center">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          {user ? (
            <>
              <Button disabled size="sm" className="justify-start font-normal text-sm">
                {userProfile?.username || user.email}
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="flex items-center justify-center bg-red-500 hover:bg-red-600"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <Button 
              variant="default" 
              size="sm" 
              className="flex items-center justify-center bg-scholarly-blue hover:bg-scholarly-accent"
              onClick={() => navigate('/auth')}
            >
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarMobileMenu;
