
-- Create a table for user notifications
CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  event_type text NOT NULL,         -- e.g., "reply", "comment_added", "insight_approved", "insight_rejected", "comment_removed", "scholar_approved"
  related_id uuid,                  -- Discussion/comment/insight/etc id, nullable
  message text NOT NULL,            -- Human-readable notification
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Only allow users to read their own notifications
CREATE POLICY "Users can read their notifications" ON public.notifications
  FOR SELECT
  USING (auth.uid() = user_id);

-- Only allow users to INSERT notifications for themselves
CREATE POLICY "Users can insert their own notifications" ON public.notifications
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update is_read (mark as read) only for their notifications
CREATE POLICY "Users can mark their notifications as read" ON public.notifications
  FOR UPDATE
  USING (auth.uid() = user_id);

-- (Optional) Allow users to delete their own notifications
CREATE POLICY "Users can delete their notifications" ON public.notifications
  FOR DELETE
  USING (auth.uid() = user_id);
