
-- First, let's check if we need to create the vaccine efficacy topic
INSERT INTO public.topics (id, name, description) VALUES 
(3, 'Vaccine Efficacy', 'Scientific research and clinical evidence on the effectiveness and safety of vaccines in preventing infectious diseases.')
ON CONFLICT (id) DO NOTHING;

-- Create table for topic page sections
CREATE TABLE public.topic_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id BIGINT REFERENCES public.topics(id) ON DELETE CASCADE,
  section_type TEXT NOT NULL CHECK (section_type IN ('hero', 'description', 'content', 'visualizations', 'call_to_action')),
  title TEXT,
  subtitle TEXT,
  description TEXT,
  additional_content TEXT,
  category_label TEXT,
  category_icon TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for topic publications
CREATE TABLE public.topic_publications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id BIGINT REFERENCES public.topics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  authors TEXT NOT NULL,
  year INTEGER NOT NULL,
  url TEXT NOT NULL,
  doi TEXT,
  publication TEXT,
  is_key_publication BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for topic content cards
CREATE TABLE public.topic_content_cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id BIGINT REFERENCES public.topics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT, -- Lucide icon name
  icon_color TEXT, -- CSS color class
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for topic visualizations/charts
CREATE TABLE public.topic_visualizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id BIGINT REFERENCES public.topics(id) ON DELETE CASCADE,
  tab_key TEXT NOT NULL,
  tab_label TEXT NOT NULL,
  chart_type TEXT NOT NULL CHECK (chart_type IN ('consensus', 'bar', 'line', 'pie', 'custom')),
  chart_data JSONB,
  chart_config JSONB,
  content_title TEXT,
  content_description TEXT,
  source_citation TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.topic_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_content_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_visualizations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public read access
CREATE POLICY "Anyone can view topic sections" ON public.topic_sections FOR SELECT USING (true);
CREATE POLICY "Anyone can view topic publications" ON public.topic_publications FOR SELECT USING (true);
CREATE POLICY "Anyone can view topic content cards" ON public.topic_content_cards FOR SELECT USING (true);
CREATE POLICY "Anyone can view topic visualizations" ON public.topic_visualizations FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX idx_topic_sections_topic_id ON public.topic_sections(topic_id);
CREATE INDEX idx_topic_sections_type ON public.topic_sections(section_type);
CREATE INDEX idx_topic_publications_topic_id ON public.topic_publications(topic_id);
CREATE INDEX idx_topic_content_cards_topic_id ON public.topic_content_cards(topic_id);
CREATE INDEX idx_topic_visualizations_topic_id ON public.topic_visualizations(topic_id);

-- Insert sample data for vaccine efficacy topic (topic_id = 3)
INSERT INTO public.topic_sections (topic_id, section_type, title, subtitle, description, additional_content, category_label, category_icon, sort_order) VALUES
(3, 'hero', 'Vaccine Efficacy', null, 'The scientific consensus on vaccine efficacy is built on decades of rigorous clinical trials, real-world effectiveness studies, and comprehensive safety monitoring systems.', null, 'Medical Topics', 'Shield', 1),
(3, 'description', 'Understanding Vaccine Efficacy', null, 'Modern vaccines undergo extensive testing phases before approval and continue to be monitored throughout their use. The evidence demonstrates their crucial role in preventing infectious diseases and protecting public health.', 'The scientific consensus on vaccine efficacy is built on decades of rigorous clinical trials, real-world effectiveness studies, and comprehensive safety monitoring systems. Modern vaccines undergo extensive testing phases before approval and continue to be monitored throughout their use.', null, null, 2),
(3, 'content', 'Vaccine Evidence', 'Clinical Research Findings', 'Evidence-based research on vaccine effectiveness, safety profiles, and immunization outcomes from clinical trials and real-world studies.', null, null, null, 3),
(3, 'call_to_action', 'Contribute to Vaccine Research', null, 'Help advance our understanding of vaccine efficacy by contributing your expertise and insights.', null, null, null, 5);

INSERT INTO public.topic_content_cards (topic_id, title, description, icon_name, icon_color, sort_order) VALUES
(3, 'Clinical Trials', 'Rigorous phase I, II, and III trials involving thousands of participants demonstrate vaccine safety and efficacy.', 'BarChart', 'text-blue-500', 1),
(3, 'Herd Immunity', 'Vaccines protect communities by reducing disease transmission when vaccination coverage reaches sufficient levels.', 'Users', 'text-green-600', 2),
(3, 'Vaccine Development', 'Modern vaccine platforms including mRNA, viral vector, and protein subunit technologies offer improved efficacy.', 'Syringe', 'text-purple-500', 3),
(3, 'Safety Monitoring', 'Continuous post-market surveillance systems monitor vaccine safety and effectiveness in real-world populations.', 'Shield', 'text-orange-500', 4);

INSERT INTO public.topic_publications (topic_id, title, authors, year, url, is_key_publication, sort_order) VALUES
(3, 'Efficacy and safety of COVID-19 vaccines: a systematic review', 'Graña C, Ghosn L, Evrenoglou T, et al.', 2022, 'https://www.cochrane.org/CD015477/INFECTN_how-effective-are-covid-19-vaccines', true, 1),
(3, 'Vaccine effectiveness: how well do vaccines work?', 'World Health Organization', 2023, 'https://www.who.int/news-room/feature-stories/detail/vaccine-efficacy-effectiveness-and-protection', true, 2),
(3, 'The history and impact of vaccination', 'Greenwood B', 2014, 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4024226/', true, 3);

INSERT INTO public.topic_visualizations (topic_id, tab_key, tab_label, chart_type, chart_data, chart_config, content_title, content_description, source_citation, sort_order) VALUES
(3, 'consensus', 'Scientific Consensus', 'consensus', 
'[{"name": "Support", "value": 97, "color": "#4CAF50"}, {"name": "Against", "value": 3, "color": "#F44336"}]',
'{"title": "Scientific Consensus on Vaccine Efficacy", "description": ["Extensive research and clinical trials consistently demonstrate that vaccines are highly effective at preventing infectious diseases. The scientific consensus is overwhelming, with studies showing vaccines have prevented millions of deaths and cases of serious illness.", "Multiple meta-analyses and systematic reviews confirm the safety and efficacy of vaccines across different populations and age groups."]}',
'Scientific Consensus on Vaccine Efficacy',
'Scientific consensus data on vaccine effectiveness',
'Clinical trials and medical research studies',
1),
(3, 'efficacy', 'Vaccine Efficacy', 'custom', '{}', '{}', 'Vaccine Efficacy Rates', 'Clinical trial data showing efficacy rates across different vaccine types and populations.', null, 2),
(3, 'safety', 'Safety Data', 'custom', '{}', '{}', 'Safety Monitoring Data', 'Comprehensive safety data from clinical trials and post-market surveillance systems.', null, 3),
(3, 'coverage', 'Coverage Rates', 'custom', '{}', '{}', 'Vaccination Coverage', 'Global and regional vaccination coverage rates and their impact on disease prevention.', null, 4);
