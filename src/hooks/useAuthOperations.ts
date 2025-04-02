
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UserProfile } from '@/types/auth';
import { fetchUserProfile } from '@/utils/authUtils';

export const useAuthOperations = () => {
  const [loading, setLoading] = useState(false);

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

  const updateProfile = async (userId: string, profileData: Partial<UserProfile>) => {
    if (!userId) {
      toast.error('You must be logged in to update your profile');
      return;
    }

    try {
      setLoading(true);
      
      // Only include fields that are allowed to be updated
      const updates: Record<string, any> = {
        username: profileData.username,
        bio: profileData.bio,
        avatar_url: profileData.avatar_url,
      };

      // Add scholar fields if they exist in the profile data
      if (profileData.academic_title !== undefined) updates.academic_title = profileData.academic_title;
      if (profileData.institution !== undefined) updates.institution = profileData.institution;
      if (profileData.field_of_study !== undefined) updates.field_of_study = profileData.field_of_study;

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);

      if (error) throw error;
      
      toast.success('Profile updated successfully');
      return await fetchUserProfile(userId, profileData.email);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Error updating profile');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    signIn,
    signUp,
    signOut,
    updateProfile,
    loading,
  };
};
