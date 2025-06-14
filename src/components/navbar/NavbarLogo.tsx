
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const NavbarLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <BookOpen className="h-6 w-6 text-scholarly-blue" />
      <span className="font-serif text-xl font-bold text-scholarly-blue">ScholarSphere</span>
    </Link>
  );
};

export default NavbarLogo;
