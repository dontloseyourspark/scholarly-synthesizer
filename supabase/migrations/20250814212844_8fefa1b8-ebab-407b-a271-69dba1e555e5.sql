-- Fix security issue: Restrict email access in profiles table
-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- Create a new policy that allows public access to non-sensitive profile data
-- but restricts email access to the profile owner only
CREATE POLICY "Public profile data is viewable by everyone" 
ON public.profiles 
FOR SELECT 
USING (
  CASE 
    WHEN auth.uid() = id THEN true  -- Users can see all their own data including email
    ELSE email IS NULL OR email = ''  -- Others can only see profiles without email exposure
  END
);

-- Alternative approach: Create a security definer function to safely expose public profile data
CREATE OR REPLACE FUNCTION public.get_public_profile_data(profile_id uuid)
RETURNS TABLE (
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
SECURITY DEFINER
STABLE
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

-- Grant execute permission on the function to authenticated and anonymous users
GRANT EXECUTE ON FUNCTION public.get_public_profile_data(uuid) TO authenticated, anon;