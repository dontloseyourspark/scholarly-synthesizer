
DO $$ 
BEGIN
  -- Drop the existing function
  DROP FUNCTION IF EXISTS public.update_insight_vote_counts CASCADE;
END $$;

CREATE OR REPLACE FUNCTION public.update_insight_vote_counts()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
  IF TG_OP = 'INSERT' THEN
    RAISE NOTICE '[TRIGGER] INSERT: insight_id=%, vote_type=%', NEW.insight_id, NEW.vote_type;
    IF NEW.vote_type = 'up' THEN
      UPDATE public.insights SET upvotes = COALESCE(upvotes,0) + 1 WHERE id = NEW.insight_id;
      RAISE NOTICE '[TRIGGER] -> upvote increment for id: %', NEW.insight_id;
    ELSE
      UPDATE public.insights SET downvotes = COALESCE(downvotes,0) + 1 WHERE id = NEW.insight_id;
      RAISE NOTICE '[TRIGGER] -> downvote increment for id: %', NEW.insight_id;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    RAISE NOTICE '[TRIGGER] UPDATE: insight_id=%, from % to %', NEW.insight_id, OLD.vote_type, NEW.vote_type;
    IF OLD.vote_type = 'up' AND NEW.vote_type = 'down' THEN
      UPDATE public.insights 
      SET upvotes = COALESCE(upvotes,0) - 1, downvotes = COALESCE(downvotes,0) + 1 
      WHERE id = NEW.insight_id;
      RAISE NOTICE '[TRIGGER] -> upvote decrement, downvote increment for id: %', NEW.insight_id;
    ELSIF OLD.vote_type = 'down' AND NEW.vote_type = 'up' THEN
      UPDATE public.insights 
      SET downvotes = COALESCE(downvotes,0) - 1, upvotes = COALESCE(upvotes,0) + 1 
      WHERE id = NEW.insight_id;
      RAISE NOTICE '[TRIGGER] -> downvote decrement, upvote increment for id: %', NEW.insight_id;
    ELSE
      RAISE NOTICE '[TRIGGER] -> No vote-type change';
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    RAISE NOTICE '[TRIGGER] DELETE: insight_id=%, vote_type=%', OLD.insight_id, OLD.vote_type;
    IF OLD.vote_type = 'up' THEN
      UPDATE public.insights SET upvotes = COALESCE(upvotes,0) - 1 WHERE id = OLD.insight_id;
      RAISE NOTICE '[TRIGGER] -> upvote decrement for id: %', OLD.insight_id;
    ELSE
      UPDATE public.insights SET downvotes = COALESCE(downvotes,0) - 1 WHERE id = OLD.insight_id;
      RAISE NOTICE '[TRIGGER] -> downvote decrement for id: %', OLD.insight_id;
    END IF;
    RETURN OLD;
  END IF;
  RAISE NOTICE '[TRIGGER] -> no branch taken!';
  RETURN NULL;
END;
$function$;

-- Drop and recreate triggers to ensure they attach to the new function
DROP TRIGGER IF EXISTS trg_update_insight_vote_counts_insert ON public.votes;
DROP TRIGGER IF EXISTS trg_update_insight_vote_counts_update ON public.votes;
DROP TRIGGER IF EXISTS trg_update_insight_vote_counts_delete ON public.votes;

CREATE TRIGGER trg_update_insight_vote_counts_insert
  AFTER INSERT ON public.votes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_insight_vote_counts();

CREATE TRIGGER trg_update_insight_vote_counts_update
  AFTER UPDATE ON public.votes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_insight_vote_counts();

CREATE TRIGGER trg_update_insight_vote_counts_delete
  AFTER DELETE ON public.votes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_insight_vote_counts();
