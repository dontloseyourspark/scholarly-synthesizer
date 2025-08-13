-- Add a new visualization tab for ice core reconstruction data to climate change topic
-- First, let's get the climate change topic ID (assuming it's topic_id 1 based on typical setup)
INSERT INTO public.topic_visualizations (
  topic_id,
  tab_key,
  tab_label,
  chart_type,
  content_title,
  content_description,
  sort_order
) VALUES (
  1, -- Assuming climate change is topic_id 1
  'ice_cores',
  'Reconstruction from Ice Cores',
  'custom',
  'Ice Core Climate Reconstruction',
  'Historical climate data reconstructed from ice core analysis provides evidence of past climate changes over thousands of years.',
  4 -- Add it as the 4th tab
);