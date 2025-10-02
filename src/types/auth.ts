
import { Session, User } from '@supabase/supabase-js';

export type UserProfile = {
  id: string;
  username: string | null;
  avatar_url: string | null;
  academic_title: string | null;
  institution: string | null;
  field_of_study: string | null;
  bio: string | null;
  is_scholar: boolean;
  verification_status: string | null;
};

export type AuthContextType = {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: Record<string, any>) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  isAdmin: boolean;
  userProfile: UserProfile | null;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  profileLoaded: boolean;
  isScholar: boolean; // Added this line
};
