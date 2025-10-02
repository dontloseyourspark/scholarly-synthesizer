-- Drop the RLS policy first that depends on the email column
DROP POLICY IF EXISTS "Public profile data is viewable by everyone" ON public.profiles;

-- Remove email column from profiles table as it's redundant and creates security risk
-- Email is already stored securely in auth.users
ALTER TABLE public.profiles DROP COLUMN IF EXISTS email CASCADE;

-- Create a cleaner RLS policy
-- All profiles are publicly viewable (no sensitive data like email anymore)
CREATE POLICY "Users can view all profiles"
ON public.profiles
FOR SELECT
USING (true);

-- Update the get_public_profile_data function to not return email
CREATE OR REPLACE FUNCTION public.get_public_profile_data(profile_id uuid)
RETURNS TABLE(
  id uuid,
  username text,
  avatar_url text,
  bio text,
  academic_title text,
  institution text,
  field_of_study text,
  is_scholar boolean,
  verified_at timestamp with time zone,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO ''
AS $$
  SELECT 
    p.id,
    p.username,
    p.avatar_url,
    p.bio,
    p.academic_title,
    p.institution,
    p.field_of_study,
    p.is_scholar,
    p.verified_at,
    p.created_at,
    p.updated_at
  FROM public.profiles p
  WHERE p.id = profile_id;
$$;