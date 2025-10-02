-- Fix privacy issue: Restrict votes table to only show user's own votes
-- This prevents profiling user voting behavior while maintaining functionality

-- Drop the overly permissive public read policy
DROP POLICY IF EXISTS "Enable read access for all users" ON public.votes;

-- Create a restricted policy that only allows users to see their own votes
CREATE POLICY "Users can read their own votes"
ON public.votes
FOR SELECT
USING (auth.uid() = user_id);

-- Note: Vote counts remain visible through the insights table's upvotes/downvotes columns
-- which show aggregated data without exposing individual voter identities