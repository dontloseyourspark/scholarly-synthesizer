
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, User, Search, Menu, LogOut, ShieldCheck, UserCircle, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = () => {
  const { user, signOut, isAdmin, userProfile } = useAuth();
  const navigate = useNavigate();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const processedQuery = searchQuery.trim().toLowerCase().replace(/\s+/g, '-');
      navigate(`/topics?q=${encodeURIComponent(processedQuery)}`);
      setIsSearchExpanded(false);
      setSearchQuery('');
    }
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      setSearchQuery('');
    }
  };

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-scholarly-blue" />
          <span className="font-serif text-xl font-bold text-scholarly-blue">ScholarSphere</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
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
          {isAdmin && (
            <Link to="/admin" className="text-foreground hover:text-scholarly-blue transition-colors flex items-center">
              <ShieldCheck className="h-4 w-4 mr-1" />
              Admin
            </Link>
          )}
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          {isSearchExpanded ? (
            <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 animate-in slide-in-from-right-2 duration-200">
              <Input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
                autoFocus
              />
              <Button type="button" variant="ghost" size="sm" onClick={toggleSearch}>
                <X className="h-4 w-4" />
              </Button>
            </form>
          ) : (
            <Button variant="outline" size="sm" className="flex items-center" onClick={toggleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          )}
          
          {user ? (
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
          ) : (
            <Button 
              variant="default" 
              size="sm" 
              className="bg-scholarly-blue hover:bg-scholarly-accent"
              onClick={() => navigate('/auth')}
            >
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          )}
        </div>
        
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
      </div>
    </header>
  );
};

export default Navbar;
