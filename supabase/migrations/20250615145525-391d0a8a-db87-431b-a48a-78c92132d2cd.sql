
-- Allow scholars (profiles with is_scholar = true) to insert insights
CREATE POLICY "Scholars can insert their own insights" ON public.insights
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
      AND is_scholar = true
  )
);

-- Allow scholars to update their own insights (optional but recommended)
CREATE POLICY "Scholars can update their own insights" ON public.insights
FOR UPDATE
USING (scholar_id = auth.uid());

-- Allow scholars to delete their own insights (optional)
CREATE POLICY "Scholars can delete their own insights" ON public.insights
FOR DELETE
USING (scholar_id = auth.uid());
