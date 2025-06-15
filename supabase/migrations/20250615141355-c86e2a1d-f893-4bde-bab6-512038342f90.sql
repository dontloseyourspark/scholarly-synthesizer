
-- Add a verification_status column to track status of each insight
ALTER TABLE public.insights
ADD COLUMN verification_status TEXT NOT NULL DEFAULT 'pending';

-- For auditability, optionally add a verified_at timestamp (optional, but common)
ALTER TABLE public.insights
ADD COLUMN verified_at TIMESTAMP WITH TIME ZONE NULL;

-- Index for quick queries (Admins will want to filter by status!)
CREATE INDEX IF NOT EXISTS idx_insights_verification_status
  ON public.insights(verification_status);

-- Backfill: Mark all existing insights as 'verified' (so current data appears as approved)
UPDATE public.insights SET verification_status = 'verified', verified_at = now() WHERE verification_status = 'pending';

