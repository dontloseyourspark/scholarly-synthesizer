
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, User, Search, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navbar = () => {
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
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="sm" className="flex items-center">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button variant="default" size="sm" className="bg-scholarly-blue hover:bg-scholarly-accent">
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
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
              <hr className="border-border" />
              <Button variant="outline" size="sm" className="flex items-center justify-center">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="default" size="sm" className="bg-scholarly-blue hover:bg-scholarly-accent">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
