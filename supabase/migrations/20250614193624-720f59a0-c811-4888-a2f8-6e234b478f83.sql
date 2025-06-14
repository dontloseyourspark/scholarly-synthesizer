
-- Insert data for Climate Change topic (topic_id = 1)
INSERT INTO public.topics (id, name, description) VALUES 
(1, 'Climate Change', 'Scientific research on long-term shifts in global temperatures and weather patterns, with overwhelming evidence showing human activities as the primary driver since the mid-20th century.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.topic_sections (topic_id, section_type, title, subtitle, description, additional_content, category_label, category_icon, sort_order) VALUES
(1, 'hero', 'Climate Change', null, 'Scientific evidence overwhelmingly shows that human activities, particularly the emission of greenhouse gases, are the primary driver of climate change since the mid-20th century.', null, 'Environmental Science', 'ThermometerSun', 1),
(1, 'description', 'Understanding Climate Change', null, 'Climate change refers to long-term shifts in global temperatures and weather patterns. Scientific evidence overwhelmingly shows that human activities, particularly the emission of greenhouse gases, are the primary driver of climate change since the mid-20th century.', null, null, null, 2),
(1, 'content', 'Key Evidence', 'The Scientific Foundation', 'Multiple lines of evidence support the reality of anthropogenic climate change, including rising global temperatures, melting ice sheets, rising sea levels, and changing precipitation patterns.', null, null, null, 3),
(1, 'call_to_action', 'Join the Climate Action', null, 'Help advance our understanding of climate science and contribute to evidence-based climate solutions.', null, null, null, 5);

INSERT INTO public.topic_content_cards (topic_id, title, description, icon_name, icon_color, sort_order) VALUES
(1, 'Rising Temperatures', 'Global average temperature has increased by about 1.1°C since pre-industrial times.', 'ThermometerSun', 'text-orange-500', 1),
(1, 'Changing Weather Patterns', 'Increased frequency and intensity of extreme weather events, including hurricanes, droughts, and floods.', 'Cloud', 'text-blue-400', 2),
(1, 'Melting Ice Caps', 'Arctic sea ice is declining at a rate of 13.1% per decade, affecting global ocean currents and weather patterns.', 'Wind', 'text-cyan-500', 3),
(1, 'Biodiversity Loss', 'An estimated one million plant and animal species are at risk of extinction due to climate change.', 'Trees', 'text-green-600', 4);

-- Insert data for Evolution of Humans topic (topic_id = 2)
INSERT INTO public.topics (id, name, description) VALUES 
(2, 'Evolution of Humans', 'Scientific evidence from fossil records, genetic analysis, and comparative anatomy supporting human evolution over millions of years.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.topic_sections (topic_id, section_type, title, subtitle, description, additional_content, category_label, category_icon, sort_order) VALUES
(2, 'hero', 'Evolution of Humans', null, 'Scientific evidence from fossil records, genetic analysis, and comparative anatomy provides comprehensive support for human evolution over millions of years.', null, 'Biological Sciences', 'Dna', 1),
(2, 'description', 'Understanding Human Evolution', null, 'Human evolution is supported by extensive fossil evidence, genetic analysis, and comparative studies showing gradual changes in human ancestors over approximately 7 million years.', null, null, null, 2),
(2, 'content', 'Evolutionary Evidence', 'Key Scientific Findings', 'Research on fossil records, genetic evidence, comparative anatomy, and molecular biology supporting human evolution.', null, null, null, 3),
(2, 'call_to_action', 'Contribute to Evolutionary Research', null, 'Help advance our understanding of human evolution through scientific research and evidence.', null, null, null, 5);

INSERT INTO public.topic_content_cards (topic_id, title, description, icon_name, icon_color, sort_order) VALUES
(2, 'Fossil Evidence', 'Extensive fossil record showing gradual changes in human ancestors over millions of years.', 'Skull', 'text-brown-500', 1),
(2, 'Genetic Analysis', 'DNA evidence reveals evolutionary relationships and migration patterns of early humans.', 'Dna', 'text-blue-500', 2),
(2, 'Population Genetics', 'Studies of genetic diversity provide insights into human evolutionary history and demographics.', 'Users', 'text-green-500', 3),
(2, 'Timeline', 'Human evolution spans approximately 7 million years from early hominids to modern humans.', 'Clock', 'text-purple-500', 4);

-- Insert data for AI Safety topic (topic_id = 4)
INSERT INTO public.topics (id, name, description) VALUES 
(4, 'Artificial Intelligence Safety', 'Research on potential risks from advanced AI systems and methods to ensure AI remains beneficial and aligned with human values.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.topic_sections (topic_id, section_type, title, subtitle, description, additional_content, category_label, category_icon, sort_order) VALUES
(4, 'hero', 'Artificial Intelligence Safety', null, 'Research on potential risks from advanced artificial intelligence systems and methods to ensure AI systems remain beneficial and aligned with human values.', null, 'Technology Topics', 'Bot', 1),
(4, 'description', 'Understanding AI Safety', null, 'AI Safety research focuses on identifying and mitigating potential risks from advanced AI systems while ensuring they remain aligned with human values and beneficial outcomes.', null, null, null, 2),
(4, 'content', 'AI Safety Research', 'Risk Assessment and Mitigation', 'Research on potential risks from advanced artificial intelligence systems and methods to ensure AI systems remain beneficial and aligned with human values.', null, null, null, 3),
(4, 'call_to_action', 'Contribute to AI Safety', null, 'Help advance AI safety research and ensure the beneficial development of artificial intelligence.', null, null, null, 5);

INSERT INTO public.topic_content_cards (topic_id, title, description, icon_name, icon_color, sort_order) VALUES
(4, 'Risk Assessment', 'Identifying potential risks from advanced AI systems including misalignment and unintended consequences.', 'AlertTriangle', 'text-red-500', 1),
(4, 'Alignment Research', 'Ensuring AI systems remain aligned with human values and intentions as they become more capable.', 'Shield', 'text-green-500', 2),
(4, 'Robustness Testing', 'Developing methods to test AI systems for safety and reliability under various conditions.', 'Cpu', 'text-blue-500', 3),
(4, 'Governance Frameworks', 'Creating policies and regulations to guide the safe development and deployment of AI systems.', 'Bot', 'text-purple-500', 4);

-- Insert data for Nutrition Science topic (topic_id = 5)
INSERT INTO public.topics (id, name, description) VALUES 
(5, 'Nutrition Science', 'Evidence-based research on nutrition, dietary patterns, and their effects on human health and disease prevention.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.topic_sections (topic_id, section_type, title, subtitle, description, additional_content, category_label, category_icon, sort_order) VALUES
(5, 'hero', 'Nutrition Science', null, 'Evidence-based research on nutrition, dietary patterns, and their effects on human health and disease prevention.', null, 'Health Sciences', 'Apple', 1),
(5, 'description', 'Understanding Nutrition Science', null, 'Nutrition science provides evidence-based recommendations for optimal health through research on dietary patterns, nutrient density, and disease prevention.', null, null, null, 2),
(5, 'content', 'Nutritional Evidence', 'Key Findings', 'Evidence-based nutrition recommendations from clinical studies and population research.', null, null, null, 3),
(5, 'call_to_action', 'Contribute to Nutrition Research', null, 'Help advance our understanding of nutrition science and evidence-based dietary recommendations.', null, null, null, 5);

INSERT INTO public.topic_content_cards (topic_id, title, description, icon_name, icon_color, sort_order) VALUES
(5, 'Dietary Guidelines', 'Evidence-based recommendations for balanced nutrition and healthy eating patterns.', 'Utensils', 'text-orange-500', 1),
(5, 'Cardiovascular Health', 'Research shows Mediterranean and plant-based diets reduce cardiovascular disease risk.', 'Heart', 'text-red-500', 2),
(5, 'Weight Management', 'Scientific evidence on effective strategies for healthy weight maintenance and obesity prevention.', 'Scale', 'text-blue-500', 3),
(5, 'Nutrient Density', 'Focus on foods high in essential nutrients relative to caloric content for optimal health.', 'Apple', 'text-green-500', 4);

-- Insert data for Quantum Computing topic (topic_id = 6)
INSERT INTO public.topics (id, name, description) VALUES 
(6, 'Quantum Computing', 'Advanced computing technology using quantum mechanical phenomena to process information exponentially faster than classical computers.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.topic_sections (topic_id, section_type, title, subtitle, description, additional_content, category_label, category_icon, sort_order) VALUES
(6, 'hero', 'Quantum Computing', null, 'Advanced computing technology using quantum mechanical phenomena to process information exponentially faster than classical computers for specific problems.', null, 'Technology Topics', 'Cpu', 1),
(6, 'description', 'Understanding Quantum Computing', null, 'Quantum computing leverages quantum mechanical properties like superposition and entanglement to solve complex problems that are intractable for classical computers.', null, null, null, 2),
(6, 'content', 'Quantum Applications', 'Potential Applications', 'Quantum computing applications in cryptography, optimization, simulation, and machine learning.', null, null, null, 3),
(6, 'call_to_action', 'Explore Quantum Future', null, 'Help advance quantum computing research and explore its transformative potential.', null, null, null, 5);

INSERT INTO public.topic_content_cards (topic_id, title, description, icon_name, icon_color, sort_order) VALUES
(6, 'Quantum Supremacy', 'Demonstrated ability to solve specific problems exponentially faster than classical computers.', 'Zap', 'text-yellow-500', 1),
(6, 'Cryptography', 'Quantum computers could break current encryption methods while enabling quantum-safe cryptography.', 'Lock', 'text-red-500', 2),
(6, 'Quantum Processors', 'Advanced quantum processors with increasing qubit counts and improved error correction.', 'Cpu', 'text-blue-500', 3),
(6, 'Molecular Simulation', 'Quantum computers excel at simulating quantum systems for drug discovery and materials science.', 'Atom', 'text-purple-500', 4);

-- Insert data for Economic Impacts of Immigration topic (topic_id = 7)
INSERT INTO public.topics (id, name, description) VALUES 
(7, 'Economic Impacts of Immigration', 'Research on the economic effects of immigration on host countries, including labor markets, fiscal impacts, and economic growth.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.topic_sections (topic_id, section_type, title, subtitle, description, additional_content, category_label, category_icon, sort_order) VALUES
(7, 'hero', 'Economic Impacts of Immigration', null, 'Research demonstrates that immigration generally has positive economic effects on host countries through labor market contributions and economic growth.', null, 'Economic Studies', 'TrendingUp', 1),
(7, 'description', 'Understanding Economic Impacts of Immigration', null, 'Economic research shows that immigration contributes positively to host economies through labor market effects, fiscal contributions, and economic growth.', null, null, null, 2),
(7, 'content', 'Economic Impact Analysis', 'Key Economic Effects', 'Research on labor market effects, fiscal impacts, and economic growth from immigration.', null, null, null, 3),
(7, 'call_to_action', 'Support Immigration Research', null, 'Help advance evidence-based understanding of immigration economics and policy.', null, null, null, 5);

INSERT INTO public.topic_content_cards (topic_id, title, description, icon_name, icon_color, sort_order) VALUES
(7, 'Labor Market Effects', 'Studies show immigration has minimal impact on native wages while filling labor shortages.', 'Users', 'text-blue-500', 1),
(7, 'Fiscal Impact', 'Long-term fiscal contributions of immigrants typically exceed costs, especially for skilled migrants.', 'DollarSign', 'text-green-500', 2),
(7, 'Economic Growth', 'Immigration contributes to GDP growth through increased consumption and entrepreneurship.', 'TrendingUp', 'text-purple-500', 3),
(7, 'Data Analysis', 'Comprehensive economic data shows net positive effects of immigration on host economies.', 'BarChart', 'text-orange-500', 4);

-- Insert data for Effectiveness of Psychotherapy topic (topic_id = 8)
INSERT INTO public.topics (id, name, description) VALUES 
(8, 'Effectiveness of Psychotherapy', 'Clinical research demonstrating the efficacy of psychotherapy for treating mental health conditions and improving psychological well-being.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.topic_sections (topic_id, section_type, title, subtitle, description, additional_content, category_label, category_icon, sort_order) VALUES
(8, 'hero', 'Effectiveness of Psychotherapy', null, 'Clinical research consistently demonstrates the effectiveness of psychotherapy for treating various mental health conditions and improving psychological well-being.', null, 'Psychology', 'Brain', 1),
(8, 'description', 'Understanding Psychotherapy Effectiveness', null, 'Meta-analyses and clinical studies show that psychotherapy produces significant improvements in mental health outcomes across various conditions and therapeutic modalities.', null, null, null, 2),
(8, 'content', 'Therapeutic Methods', 'Evidence-Based Approaches', 'Research on different psychotherapy modalities and their effectiveness for various conditions.', null, null, null, 3),
(8, 'call_to_action', 'Support Mental Health Research', null, 'Help advance psychotherapy research and evidence-based mental health treatment.', null, null, null, 5);

INSERT INTO public.topic_content_cards (topic_id, title, description, icon_name, icon_color, sort_order) VALUES
(8, 'Evidence-Based Practice', 'Cognitive-behavioral therapy and other evidence-based approaches show consistent positive outcomes.', 'Brain', 'text-blue-500', 1),
(8, 'Mental Health Outcomes', 'Meta-analyses demonstrate significant improvements in depression, anxiety, and other conditions.', 'Heart', 'text-red-500', 2),
(8, 'Therapeutic Relationship', 'Strong therapeutic alliance is a key predictor of successful treatment outcomes across modalities.', 'Users', 'text-green-500', 3),
(8, 'Treatment Efficacy', 'Psychotherapy shows effect sizes comparable to many medical treatments for psychological disorders.', 'TrendingUp', 'text-purple-500', 4);

-- Add some basic visualizations for all topics
INSERT INTO public.topic_visualizations (topic_id, tab_key, tab_label, chart_type, chart_data, chart_config, content_title, content_description, source_citation, sort_order) VALUES
-- Climate Change visualizations
(1, 'consensus', 'Scientific Consensus', 'consensus', 
'[{"name": "Support", "value": 97, "color": "#4CAF50"}, {"name": "Against", "value": 3, "color": "#F44336"}]',
'{"title": "Scientific Consensus on Climate Change", "description": ["Over 97% of actively publishing climate scientists agree that human activities are the primary cause of recent climate change.", "This consensus is based on multiple lines of evidence including temperature records, ice core data, and atmospheric measurements."]}',
'Scientific Consensus on Climate Change', 'Climate science consensus data', 'Multiple peer-reviewed studies', 1),

-- Evolution visualizations
(2, 'consensus', 'Scientific Consensus', 'consensus', 
'[{"name": "Support", "value": 99, "color": "#4CAF50"}, {"name": "Against", "value": 1, "color": "#F44336"}]',
'{"title": "Scientific Consensus on Human Evolution", "description": ["Nearly all biologists and anthropologists accept the evidence for human evolution.", "The fossil record, genetic evidence, and comparative anatomy provide overwhelming support for evolutionary theory."]}',
'Scientific Consensus on Human Evolution', 'Evolution science consensus', 'Peer-reviewed biological research', 1),

-- AI Safety visualizations
(4, 'consensus', 'Expert Views', 'consensus', 
'[{"name": "Concerned", "value": 78, "color": "#FF9800"}, {"name": "Not Concerned", "value": 22, "color": "#4CAF50"}]',
'{"title": "AI Safety Expert Concerns", "description": ["Majority of AI researchers express concern about long-term AI safety risks.", "Research focuses on alignment, robustness, and governance frameworks."]}',
'AI Safety Expert Survey', 'AI safety research concerns', 'AI researcher surveys', 1),

-- Nutrition Science visualizations
(5, 'consensus', 'Dietary Guidelines', 'consensus', 
'[{"name": "Evidence-Based", "value": 85, "color": "#4CAF50"}, {"name": "Limited Evidence", "value": 15, "color": "#FF9800"}]',
'{"title": "Evidence Base for Dietary Guidelines", "description": ["Most dietary recommendations are supported by substantial scientific evidence.", "Mediterranean and plant-based diets show consistent health benefits."]}',
'Nutrition Science Evidence', 'Dietary research evidence', 'Clinical nutrition studies', 1),

-- Quantum Computing visualizations
(6, 'consensus', 'Technical Progress', 'consensus', 
'[{"name": "Promising", "value": 92, "color": "#4CAF50"}, {"name": "Uncertain", "value": 8, "color": "#FF9800"}]',
'{"title": "Quantum Computing Progress", "description": ["Scientific consensus supports quantum computing potential for specific applications.", "Recent demonstrations show quantum advantage for certain computational problems."]}',
'Quantum Computing Assessment', 'Technical progress evaluation', 'Quantum computing research', 1),

-- Economic Immigration visualizations
(7, 'consensus', 'Economic Impact', 'consensus', 
'[{"name": "Positive Impact", "value": 76, "color": "#4CAF50"}, {"name": "Mixed/Negative", "value": 24, "color": "#FF9800"}]',
'{"title": "Economic Impact of Immigration", "description": ["Majority of economic studies find positive net effects of immigration.", "Long-term fiscal benefits typically outweigh short-term costs."]}',
'Immigration Economics Research', 'Economic impact studies', 'Peer-reviewed economic research', 1),

-- Psychotherapy visualizations
(8, 'consensus', 'Treatment Efficacy', 'consensus', 
'[{"name": "Effective", "value": 88, "color": "#4CAF50"}, {"name": "Limited Evidence", "value": 12, "color": "#FF9800"}]',
'{"title": "Psychotherapy Effectiveness", "description": ["Meta-analyses consistently show psychotherapy effectiveness for mental health conditions.", "Effect sizes are comparable to many medical treatments."]}',
'Psychotherapy Research', 'Clinical effectiveness data', 'Meta-analyses and clinical trials', 1);
