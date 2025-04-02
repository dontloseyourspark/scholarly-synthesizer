import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: Record<string, any>) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  isAdmin: boolean;
  userProfile: UserProfile | null;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
};

export type UserProfile = {
  id: string;
  email: string | null;
  username: string | null;
  avatar_url: string | null;
  academic_title: string | null;
  institution: string | null;
  field_of_study: string | null;
  bio: string | null;
  is_scholar: boolean;
  verification_status: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define admin email
const ADMIN_EMAIL = 'dontloseyourspark8@gmail.com';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Function to fetch user profile
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }
      
      if (data) {
        // Map the database profile to our UserProfile type
        const profile: UserProfile = {
          id: data.id,
          email: user?.email || null,
          username: data.username,
          avatar_url: data.avatar_url,
          academic_title: data.academic_title,
          institution: data.institution,
          field_of_study: data.field_of_study,
          bio: data.bio,
          is_scholar: !!data.academic_title, // Determine scholar status based on academic title
          verification_status: data.verification_status || null
        };
        
        setUserProfile(profile);
        return profile;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  useEffect(() => {
    // Handle auth hash params from URL (for email confirmations, password resets, etc)
    const handleHashParams = async () => {
      // Check if we have hash parameters in the URL
      const hasHashParams = window.location.hash && window.location.hash.length > 1;
      
      if (hasHashParams) {
        try {
          setLoading(true);
          
          // In newer Supabase versions, we need to call getSession() after the redirect happens
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            toast.error(error.message || 'Error processing authentication');
            console.error('Auth error:', error);
          } else if (data?.session) {
            // Successfully authenticated
            setSession(data.session);
            setUser(data.session.user);
            toast.success('Authentication successful!');
            
            // Remove the hash to clean up the URL
            window.location.hash = '';
          }
        } catch (error: any) {
          console.error('Error handling auth redirect:', error);
          toast.error(error.message || 'An unexpected error occurred');
        } finally {
          setLoading(false);
        }
      }
    };
    
    // Run hash params handler on initial load
    handleHashParams();
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check if user is an admin
        if (session?.user) {
          checkAdminStatus(session.user);
          
          // If we have a user session, fetch their profile
          const profile = await fetchUserProfile(session.user.id);
          
          // Handle profile creation/updates on sign in or sign up
          if (event === 'SIGNED_IN' || event === 'SIGNED_UP') {
            try {
              // Check if the user already has a profile
              if (!profile) {
                // Create a new profile with user metadata
                const metadata = session.user.user_metadata;
                await supabase.from('profiles').insert({
                  id: session.user.id,
                  username: metadata?.username || session.user.email?.split('@')[0],
                  email: session.user.email,
                  is_scholar: metadata?.is_scholar || false,
                  academic_title: metadata?.academic_title || null,
                  institution: metadata?.institution || null,
                  field_of_study: metadata?.field_of_study || null,
                  verification_status: metadata?.is_scholar ? 'pending' : null
                });
                
                // Fetch the profile again after creating it
                await fetchUserProfile(session.user.id);
              }
            } catch (error) {
              console.error('Error setting up user profile:', error);
            }
          }
        } else {
          setIsAdmin(false);
          setUserProfile(null);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        checkAdminStatus(session.user);
        await fetchUserProfile(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = (user: User) => {
    // Only the specified email is admin
    const userEmail = user.email?.toLowerCase() || '';
    setIsAdmin(userEmail === ADMIN_EMAIL);
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success('Signed in successfully');
    } catch (error: any) {
      toast.error(error.message || 'Error signing in');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, metadata?: Record<string, any>) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: metadata ? { data: metadata } : undefined
      });
      if (error) throw error;
      toast.success('Account created! Check your email for confirmation.');
    } catch (error: any) {
      toast.error(error.message || 'Error creating account');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Signed out successfully');
    } catch (error: any) {
      toast.error(error.message || 'Error signing out');
    } finally {
      setLoading(false);
    }
  };

  // Add a function to update user profile
  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) {
      toast.error('You must be logged in to update your profile');
      return;
    }

    try {
      setLoading(true);
      
      // Only include fields that are allowed to be updated
      const updates = {
        username: profileData.username,
        bio: profileData.bio,
        avatar_url: profileData.avatar_url,
        // Keep scholar fields if the user is already a scholar
        ...(userProfile?.is_scholar ? {
          academic_title: profileData.academic_title,
          institution: profileData.institution,
          field_of_study: profileData.field_of_study,
        } : {})
      };

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;
      
      // Refresh the profile data
      await fetchUserProfile(user.id);
      
      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      signIn, 
      signUp, 
      signOut, 
      loading, 
      isAdmin,
      userProfile,
      updateProfile
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
