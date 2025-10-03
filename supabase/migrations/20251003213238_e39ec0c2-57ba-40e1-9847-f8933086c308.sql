-- Update psychotherapy effectiveness chart to show 92.5% Effective
UPDATE public.topic_visualizations
SET chart_data = jsonb_build_array(
  jsonb_build_object('name', 'Effective', 'value', 92.5, 'color', '#4CAF50'),
  jsonb_build_object('name', 'Limited Evidence', 'value', 7.5, 'color', '#FF9800')
)
WHERE id = '678f23ae-61b6-4986-af3a-b88f1c3ba958';