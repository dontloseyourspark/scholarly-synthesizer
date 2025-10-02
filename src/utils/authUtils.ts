
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/auth';

// Define admin email
export const ADMIN_EMAIL = 'dontloseyourspark8@gmail.com';

export const checkAdminStatus = (user: User): boolean => {
  // Only the specified email is admin
  const userEmail = user.email?.toLowerCase() || '';
  return userEmail === ADMIN_EMAIL;
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
    await supabase.from('profiles').insert({
      id: userId,
      username: metadata?.username || email?.split('@')[0],
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
