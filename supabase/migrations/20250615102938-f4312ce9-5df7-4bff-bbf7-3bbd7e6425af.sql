
-- Add a user_profile column to discussions to store user info for display
ALTER TABLE public.discussions 
ADD COLUMN user_profile JSONB;

-- Update existing discussions to include user profile data
UPDATE public.discussions 
SET user_profile = (
  SELECT jsonb_build_object(
    'username', COALESCE(p.username, p.email, 'Anonymous'),
    'avatar_url', p.avatar_url
  )
  FROM public.profiles p 
  WHERE p.id = discussions.user_id
)
WHERE user_id IS NOT NULL;
