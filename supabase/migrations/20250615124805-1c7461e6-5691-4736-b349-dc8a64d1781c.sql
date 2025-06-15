
-- Create TRIGGER to update counts on INSERT, UPDATE, DELETE on votes

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
