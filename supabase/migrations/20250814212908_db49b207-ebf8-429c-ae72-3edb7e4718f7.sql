-- Fix function search path security issues
-- Update existing functions to have immutable search_path

-- Fix the handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = ''
AS $function$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$function$;

-- Fix the update_insight_vote_counts function  
CREATE OR REPLACE FUNCTION public.update_insight_vote_counts()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $function$
declare
  target_id uuid;
begin
  target_id := coalesce(new.insight_id, old.insight_id);

  update public.insights
  set
    upvotes = (
      select count(*) from public.votes
      where insight_id = target_id and vote_type = 'up'
    ),
    downvotes = (
      select count(*) from public.votes
      where insight_id = target_id and vote_type = 'down'
    )
  where id = target_id;

  return null;
end;
$function$;

-- Fix the update_insight_votes function
CREATE OR REPLACE FUNCTION public.update_insight_votes()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $function$
DECLARE
  updated_count INTEGER;
BEGIN
  RAISE NOTICE 'Trigger fired for insight_id: %', NEW.insight_id;

  IF (TG_OP = 'INSERT') OR (TG_OP = 'UPDATE') THEN
    RAISE NOTICE 'Updating insights for insight_id: %', NEW.insight_id;

    UPDATE public.insights
    SET
      upvotes = (SELECT COUNT(*) FROM public.votes WHERE insight_id = NEW.insight_id AND vote_type = 'up'),
      downvotes = (SELECT COUNT(*) FROM public.votes WHERE insight_id = NEW.insight_id AND vote_type = 'down')
    WHERE id = NEW.insight_id;

    GET DIAGNOSTICS updated_count = ROW_COUNT;
    RAISE NOTICE 'Update completed for insight_id: % with % rows affected', NEW.insight_id, updated_count;
  END IF;

  RETURN NEW;
END;
$function$;

-- Fix the get_public_profile_data function
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
SET search_path = ''
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