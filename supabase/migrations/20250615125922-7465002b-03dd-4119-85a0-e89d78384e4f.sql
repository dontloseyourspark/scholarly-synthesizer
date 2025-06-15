
-- Ensure upvotes/downvotes are always initialized to 0 (if NULL)
UPDATE public.insights SET upvotes = 0 WHERE upvotes IS NULL;
UPDATE public.insights SET downvotes = 0 WHERE downvotes IS NULL;

-- Alter the trigger function to always coalesce
CREATE OR REPLACE FUNCTION public.update_insight_vote_counts()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.vote_type = 'up' THEN
      UPDATE public.insights SET upvotes = COALESCE(upvotes,0) + 1 WHERE id = NEW.insight_id;
    ELSE
      UPDATE public.insights SET downvotes = COALESCE(downvotes,0) + 1 WHERE id = NEW.insight_id;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.vote_type = 'up' AND NEW.vote_type = 'down' THEN
      UPDATE public.insights 
      SET upvotes = COALESCE(upvotes,0) - 1, downvotes = COALESCE(downvotes,0) + 1 
      WHERE id = NEW.insight_id;
    ELSIF OLD.vote_type = 'down' AND NEW.vote_type = 'up' THEN
      UPDATE public.insights 
      SET downvotes = COALESCE(downvotes,0) - 1, upvotes = COALESCE(upvotes,0) + 1 
      WHERE id = NEW.insight_id;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.vote_type = 'up' THEN
      UPDATE public.insights SET upvotes = COALESCE(upvotes,0) - 1 WHERE id = OLD.insight_id;
    ELSE
      UPDATE public.insights SET downvotes = COALESCE(downvotes,0) - 1 WHERE id = OLD.insight_id;
    END IF;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$function$;

-- (No need to update the triggers, just the function and initialize the values.)
