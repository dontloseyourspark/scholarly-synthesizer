
-- Add AI safety publications to the database
INSERT INTO topic_publications (
  topic_id,
  title,
  authors,
  year,
  url,
  doi,
  publication,
  is_key_publication,
  sort_order
) VALUES
(
  4,
  'The AI Alignment Problem: A Survey of Recent Work',
  'Zhang et al.',
  2022,
  'https://doi.org/10.1561/2200000083',
  '10.1561/2200000083',
  'Foundations and Trends® in Machine Learning',
  true,
  1
),
(
  4,
  'When Will AI Exceed Human Performance? Evidence from AI Experts',
  'Grace et al.',
  2018,
  'https://doi.org/10.1613/jair.1.11222',
  '10.1613/jair.1.11222',
  'Journal of Artificial Intelligence Research (JAIR)',
  true,
  2
),
(
  4,
  'Is Power-Seeking AI an Existential Risk?',
  'Carlsmith',
  2022,
  'https://www.openphilanthropy.org/research/power-seeking-ai-risk/',
  null,
  'Open Philanthropy',
  true,
  3
),
(
  4,
  'Ethically Aligned Design: A Vision for Prioritizing Human Well-being with Autonomous and Intelligent Systems',
  'IEEE Global Initiative',
  2019,
  'https://ethicsinaction.ieee.org/',
  null,
  'IEEE Global Initiative',
  true,
  4
),
(
  4,
  'Superintelligence: Paths, Dangers, Strategies',
  'Bostrom',
  2014,
  'https://global.oup.com/academic/product/superintelligence-9780199678112',
  null,
  'Oxford University Press',
  true,
  5
)
ON CONFLICT DO NOTHING;
