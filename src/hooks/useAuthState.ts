
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/auth';
import { checkAdminStatus, fetchUserProfile, createUserProfile } from '@/utils/authUtils';

export const useAuthState = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

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
            console.error('Auth error:', error);
          } else if (data?.session) {
            // Successfully authenticated
            setSession(data.session);
            setUser(data.session.user);
            
            // Remove the hash to clean up the URL
            window.location.hash = '';
          }
        } catch (error: any) {
          console.error('Error handling auth redirect:', error);
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
          const isUserAdmin = checkAdminStatus(session.user);
          setIsAdmin(isUserAdmin);
          
          // If we have a user session, fetch their profile
          const profile = await fetchUserProfile(session.user.id, session.user.email);
          setUserProfile(profile);
          
          // Handle profile creation/updates on sign in or sign up
          if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
            try {
              // Check if the user already has a profile
              if (!profile) {
                // Create a new profile with user metadata
                const metadata = session.user.user_metadata;
                await createUserProfile(session.user.id, session.user.email, metadata);
                
                // Fetch the profile again after creating it
                const newProfile = await fetchUserProfile(session.user.id, session.user.email);
                setUserProfile(newProfile);
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
        const isUserAdmin = checkAdminStatus(session.user);
        setIsAdmin(isUserAdmin);
        const profile = await fetchUserProfile(session.user.id, session.user.email);
        setUserProfile(profile);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { 
    session, 
    user, 
    loading, 
    isAdmin, 
    userProfile, 
    setUserProfile 
  };
};
