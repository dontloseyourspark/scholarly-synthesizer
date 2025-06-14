
-- Add missing content sections for topics that don't have them
INSERT INTO public.topic_sections (topic_id, section_type, title, subtitle, description, additional_content, category_label, category_icon, sort_order) VALUES
-- Vaccine Efficacy content section (topic_id = 3)
(3, 'content', 'Vaccine Evidence', 'Clinical Research Findings', 'Evidence-based research on vaccine effectiveness, safety profiles, and immunization outcomes from clinical trials and real-world studies.', null, null, null, 3)
ON CONFLICT DO NOTHING;

-- Add content cards for Vaccine Efficacy topic (topic_id = 3) - these seem to be missing
INSERT INTO public.topic_content_cards (topic_id, title, description, icon_name, icon_color, sort_order) VALUES
(3, 'Clinical Trials', 'Rigorous phase I, II, and III trials involving thousands of participants demonstrate vaccine safety and efficacy.', 'BarChart', 'text-blue-500', 1),
(3, 'Herd Immunity', 'Vaccines protect communities by reducing disease transmission when vaccination coverage reaches sufficient levels.', 'Users', 'text-green-600', 2),
(3, 'Vaccine Development', 'Modern vaccine platforms including mRNA, viral vector, and protein subunit technologies offer improved efficacy.', 'Syringe', 'text-purple-500', 3),
(3, 'Safety Monitoring', 'Continuous post-market surveillance systems monitor vaccine safety and effectiveness in real-world populations.', 'Shield', 'text-orange-500', 4)
ON CONFLICT DO NOTHING;

-- Verify all other topics have content cards - let's check if any are missing and add them
-- Climate Change should have content cards already
-- Evolution should have content cards already  
-- AI Safety should have content cards already
-- Nutrition should have content cards already
-- Quantum should have content cards already
-- Economic Immigration should have content cards already
-- Psychotherapy should have content cards already

-- Let's make sure Evolution topic has proper content cards since it might be missing them
INSERT INTO public.topic_content_cards (topic_id, title, description, icon_name, icon_color, sort_order) VALUES
(2, 'Fossil Evidence', 'Extensive fossil record showing gradual changes in human ancestors over millions of years.', 'Skull', 'text-brown-500', 1),
(2, 'Genetic Analysis', 'DNA evidence reveals evolutionary relationships and migration patterns of early humans.', 'Dna', 'text-blue-500', 2),
(2, 'Population Genetics', 'Studies of genetic diversity provide insights into human evolutionary history and demographics.', 'Users', 'text-green-500', 3),
(2, 'Timeline', 'Human evolution spans approximately 7 million years from early hominids to modern humans.', 'Clock', 'text-purple-500', 4)
ON CONFLICT DO NOTHING;
