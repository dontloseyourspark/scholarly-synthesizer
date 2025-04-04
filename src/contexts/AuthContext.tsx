
import React, { createContext, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { AuthContextType, UserProfile } from '@/types/auth';
import { useAuthOperations } from '@/hooks/useAuthOperations';
import { useAuthState } from '@/hooks/useAuthState';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { signIn, signUp, signOut, updateProfile, loading: operationLoading } = useAuthOperations();
  const { 
    session, 
    user, 
    loading: stateLoading, 
    isAdmin, 
    userProfile, 
    setUserProfile,
    profileLoaded 
  } = useAuthState();

  const handleUpdateProfile = async (profile: Partial<UserProfile>) => {
    if (!user) return;
    const updatedProfile = await updateProfile(user.id, profile);
    if (updatedProfile) {
      setUserProfile(updatedProfile);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      signIn, 
      signUp, 
      signOut, 
      loading: stateLoading || operationLoading, 
      isAdmin,
      userProfile,
      updateProfile: handleUpdateProfile,
      profileLoaded
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
