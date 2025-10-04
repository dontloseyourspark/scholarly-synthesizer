-- Update economic impact immigration chart to show 75% positive impact
UPDATE public.topic_visualizations
SET chart_data = jsonb_build_array(
  jsonb_build_object('name', 'Positive Impact', 'value', 75, 'color', '#4CAF50'),
  jsonb_build_object('name', 'Mixed/Negative', 'value', 25, 'color', '#FF9800')
)
WHERE id = '929c0e6a-36fe-4b9a-b1b7-c554c4124bbe';