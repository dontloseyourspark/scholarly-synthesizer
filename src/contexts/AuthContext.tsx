
import React, { createContext, useContext, useMemo } from 'react';
import { useAuthOperations } from '@/hooks/useAuthOperations';
import { useAuthState } from '@/hooks/useAuthState';
import { AuthContextType, UserProfile } from '@/types/auth';

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

  // Memoize only the context value (avoid recomputing unnecessarily)
  const contextValue = useMemo(() => ({
    session,
    user,
    signIn,
    signUp,
    signOut,
    loading: stateLoading || operationLoading,
    isAdmin,
    userProfile,
    updateProfile: handleUpdateProfile,
    profileLoaded,
    isScholar: userProfile?.is_scholar || false // Provide isScholar
  }), [session, user, stateLoading, operationLoading, isAdmin, userProfile, profileLoaded]);
  
  return (
    <AuthContext.Provider value={contextValue}>
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
