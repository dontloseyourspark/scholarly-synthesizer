
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

interface NavbarDesktopMenuProps {
  isAdmin: boolean;
}

const NavbarDesktopMenu = ({ isAdmin }: NavbarDesktopMenuProps) => {
  return (
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
  );
};

export default NavbarDesktopMenu;
