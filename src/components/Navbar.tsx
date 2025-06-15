import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import NavbarBrand from './navbar/NavbarBrand';
import NavbarDesktopMenu from './navbar/NavbarDesktopMenu';
import NavbarSearch from './navbar/NavbarSearch';
import NavbarAuth from './navbar/NavbarAuth';
import NavbarMobileMenu from './navbar/NavbarMobileMenu';
import NotificationBell from './navbar/NavbarNotifications';

const Navbar = () => {
  const { user, signOut, isAdmin, userProfile } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <NavbarBrand />
        
        <NavbarDesktopMenu isAdmin={isAdmin} />
        
        <div className="hidden md:flex items-center space-x-4">
          <NavbarSearch />
          <NotificationBell />
          <NavbarAuth 
            user={user} 
            userProfile={userProfile} 
            isAdmin={isAdmin} 
            handleSignOut={handleSignOut} 
          />
        </div>
        
        <NavbarMobileMenu 
          user={user} 
          userProfile={userProfile} 
          isAdmin={isAdmin} 
          handleSignOut={handleSignOut} 
        />
      </div>
    </header>
  );
};

export default Navbar;
