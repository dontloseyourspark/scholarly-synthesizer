
-- Drop existing triggers if present to avoid duplicates:
DROP TRIGGER IF EXISTS trg_update_insight_vote_counts_insert ON public.votes;
DROP TRIGGER IF EXISTS trg_update_insight_vote_counts_update ON public.votes;
DROP TRIGGER IF EXISTS trg_update_insight_vote_counts_delete ON public.votes;

-- Create triggers for all relevant events on the votes table:
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
