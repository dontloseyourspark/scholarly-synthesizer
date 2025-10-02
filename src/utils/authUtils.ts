
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/auth';

// Check admin status using database roles (secure server-side validation)
export const checkAdminStatus = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();
    
    if (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
    
    return !!data;
  } catch (error) {
    console.error('Error in checkAdminStatus:', error);
    return false;
  }
};

export const fetchUserProfile = async (userId: string, userEmail: string | null): Promise<UserProfile | null> => {
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
        username: data.username,
        avatar_url: data.avatar_url,
        academic_title: data.academic_title,
        institution: data.institution,
        field_of_study: data.field_of_study,
        bio: data.bio,
        is_scholar: !!data.is_scholar || !!data.academic_title, // Determine scholar status based on is_scholar field or academic title
        verification_status: data.verification_status
      };
      
      return profile;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

export const createUserProfile = async (userId: string, email: string | undefined, metadata: any): Promise<void> => {
  try {
    // Generate a safe username that doesn't expose email
    let username = metadata?.username;
    if (!username && email) {
      // Use only the local part before @ and add random suffix for uniqueness
      const localPart = email.split('@')[0];
      const randomSuffix = Math.floor(Math.random() * 10000);
      username = `${localPart}_${randomSuffix}`;
    }
    
    await supabase.from('profiles').insert({
      id: userId,
      username: username || 'user_' + userId.substring(0, 8),
      is_scholar: metadata?.is_scholar || false,
      academic_title: metadata?.academic_title || null,
      institution: metadata?.institution || null,
      field_of_study: metadata?.field_of_study || null,
      verification_status: metadata?.is_scholar ? 'pending' : null
    });
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};
