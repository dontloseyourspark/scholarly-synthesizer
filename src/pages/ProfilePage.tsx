
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Loader2 } from 'lucide-react';
import ProfileAvatar from '@/components/profile/ProfileAvatar';
import ProfileForm from '@/components/profile/ProfileForm';
import { useProfileForm } from '@/hooks/useProfileForm';

const ProfilePage = () => {
  const { userProfile, loading: authLoading, profileLoaded } = useAuth();
  const navigate = useNavigate();
  
  const {
    user,
    formData,
    loading,
    initializeForm,
    handleChange,
    handleSubmit,
    handleAvatarChange
  } = useProfileForm();

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  // Initialize form with profile data when available
  useEffect(() => {
    if (userProfile && profileLoaded && !formData) {
      initializeForm(userProfile);
    }
  }, [userProfile, profileLoaded, initializeForm, formData]);
  

  // Show loading state while authentication or profile data is loading
  if (authLoading || !profileLoaded) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-scholarly-blue" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 bg-scholarly-lightGray">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-serif mb-8 text-center">Your Profile</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProfileAvatar 
              userProfile={userProfile} 
              user={user} 
              onAvatarChange={handleAvatarChange} 
            />
            
            <ProfileForm 
              formData={formData}
              userProfile={userProfile}
              loading={loading}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
