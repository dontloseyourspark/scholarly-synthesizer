
-- First, let's add some sample scholars
INSERT INTO public.scholars (id, name, title, institution, avatar_url, credentials) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Dr. Sarah Chen', 'Professor of Climate Science', 'Stanford University', null, ARRAY['Ph.D. in Atmospheric Science', 'IPCC Lead Author', '150+ peer-reviewed publications']),
('550e8400-e29b-41d4-a716-446655440002', 'Dr. Michael Rodriguez', 'Professor of Evolutionary Biology', 'Harvard University', null, ARRAY['Ph.D. in Evolutionary Biology', 'National Academy of Sciences Member', '200+ publications']),
('550e8400-e29b-41d4-a716-446655440003', 'Dr. Lisa Thompson', 'Immunology Researcher', 'Johns Hopkins University', null, ARRAY['Ph.D. in Immunology', 'NIH Research Fellow', 'Vaccine Development Expert']),
('550e8400-e29b-41d4-a716-446655440004', 'Dr. James Park', 'Nutritional Epidemiologist', 'UC Berkeley', null, ARRAY['Ph.D. in Epidemiology', 'WHO Advisor', 'Nutrition Research Specialist']),
('550e8400-e29b-41d4-a716-446655440005', 'Dr. Emma Wilson', 'AI Safety Researcher', 'MIT', null, ARRAY['Ph.D. in Computer Science', 'AI Ethics Board Member', 'Machine Learning Expert'])
ON CONFLICT (id) DO NOTHING;

-- Add some sample sources
INSERT INTO public.sources (id, title, authors, publication, year, url, doi) VALUES
(1, 'Climate Change 2021: The Physical Science Basis', 'IPCC Working Group I', 'Intergovernmental Panel on Climate Change', 2021, 'https://www.ipcc.ch/report/ar6/wg1/', '10.1017/9781009157896'),
(2, 'Human Evolution and the Origin of Modern Humans', 'Stringer, C.B.', 'Nature', 2016, 'https://nature.com/articles/nature16990', '10.1038/nature16990'),
(3, 'mRNA Vaccine Effectiveness Against COVID-19', 'Baden, L.R. et al.', 'New England Journal of Medicine', 2021, 'https://nejm.org/doi/full/10.1056/NEJMoa2035389', '10.1056/NEJMoa2035389'),
(4, 'Dietary Guidelines and Health Outcomes', 'Willett, W.C. et al.', 'The Lancet', 2019, 'https://thelancet.com/journals/lancet/article/PIIS0140-6736(18)31788-4/fulltext', '10.1016/S0140-6736(18)31788-4'),
(5, 'AI Safety via Debate', 'Irving, G. et al.', 'Nature Machine Intelligence', 2018, 'https://nature.com/articles/s42256-018-0001-y', '10.1038/s42256-018-0001-y')
ON CONFLICT (id) DO NOTHING;

-- Add sample insights for different topics
INSERT INTO public.insights (id, topic_id, scholar_id, content, position, confidence, upvotes, downvotes) VALUES
-- Climate Change insights (topic_id = 1)
('550e8400-e29b-41d4-a716-446655440101', 1, '550e8400-e29b-41d4-a716-446655440001', 'The evidence that human activities are the dominant cause of observed warming since the mid-20th century is unequivocal. Multiple lines of independent evidence confirm this conclusion, including observed warming patterns, climate model simulations, and paleoclimate records.', 'support', 95, 156, 8),

-- Evolution insights (topic_id = 2)
('550e8400-e29b-41d4-a716-446655440102', 2, '550e8400-e29b-41d4-a716-446655440002', 'The fossil record provides compelling evidence for human evolution, with clear transitional forms showing the gradual development from early hominids to modern humans. Genetic evidence further supports this evolutionary timeline.', 'support', 98, 203, 5),

-- Vaccine Efficacy insights (topic_id = 3)
('550e8400-e29b-41d4-a716-446655440103', 3, '550e8400-e29b-41d4-a716-446655440003', 'Clinical trials consistently demonstrate that vaccines are highly effective at preventing serious illness and death. The mRNA vaccines showed 95% efficacy in preventing symptomatic COVID-19 in large-scale randomized controlled trials.', 'support', 92, 187, 12),

-- Nutrition Science insights (topic_id = 5)
('550e8400-e29b-41d4-a716-446655440104', 5, '550e8400-e29b-41d4-a716-446655440004', 'Large-scale epidemiological studies consistently show that diets rich in fruits, vegetables, whole grains, and lean proteins are associated with reduced risk of chronic diseases including heart disease, diabetes, and certain cancers.', 'support', 88, 142, 18),

-- AI Safety insights (topic_id = 4)
('550e8400-e29b-41d4-a716-446655440105', 4, '550e8400-e29b-41d4-a716-446655440005', 'As AI systems become more powerful, ensuring their alignment with human values becomes increasingly critical. Current research focuses on interpretability, robustness, and value alignment to prevent potential negative outcomes.', 'support', 85, 98, 22)
ON CONFLICT (id) DO NOTHING;

-- Link insights to sources
INSERT INTO public.insight_sources (insight_id, source_id) VALUES
('550e8400-e29b-41d4-a716-446655440101', 1),
('550e8400-e29b-41d4-a716-446655440102', 2),
('550e8400-e29b-41d4-a716-446655440103', 3),
('550e8400-e29b-41d4-a716-446655440104', 4),
('550e8400-e29b-41d4-a716-446655440105', 5)
ON CONFLICT DO NOTHING;

-- Add some sample discussions
INSERT INTO public.discussions (id, topic_id, content, user_id) VALUES
('550e8400-e29b-41d4-a716-446655440201', 1, 'This is fascinating research. The data clearly shows the human impact on climate systems. What are the most effective mitigation strategies being discussed?', null),
('550e8400-e29b-41d4-a716-446655440202', 2, 'The genetic evidence for human evolution is particularly compelling. Are there any recent discoveries that have changed our understanding of the timeline?', null),
('550e8400-e29b-41d4-a716-446655440203', 3, 'The vaccine efficacy data is impressive. How do these results translate to real-world effectiveness outside of controlled trials?', null),
('550e8400-e29b-41d4-a716-446655440204', 5, 'The relationship between diet and health outcomes seems complex. How do researchers account for confounding variables in these studies?', null),
('550e8400-e29b-41d4-a716-446655440205', 4, 'AI safety is crucial as these systems become more prevalent. What are the main challenges in implementing these safety measures?', null)
ON CONFLICT (id) DO NOTHING;
