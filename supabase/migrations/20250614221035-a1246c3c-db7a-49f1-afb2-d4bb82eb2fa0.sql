
-- First, let's add the vaccine efficacy topic to the database
INSERT INTO topics (id, name, description) VALUES 
(3, 'Vaccine Efficacy', 'Scientific evidence on vaccine effectiveness and safety')
ON CONFLICT (id) DO NOTHING;

-- Add some key vaccine efficacy publications to the database
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
  3,
  'Efficacy and Safety of the mRNA-1273 SARS-CoV-2 Vaccine',
  'Baden et al.',
  2021,
  'https://doi.org/10.1056/NEJMoa2035389',
  '10.1056/NEJMoa2035389',
  'New England Journal of Medicine, Vol. 384, pp. 403-416',
  true,
  1
),
(
  3,
  'Safety and Efficacy of the BNT162b2 mRNA Covid-19 Vaccine',
  'Polack et al.',
  2020,
  'https://doi.org/10.1056/NEJMoa2034577',
  '10.1056/NEJMoa2034577',
  'New England Journal of Medicine, Vol. 383, pp. 2603-2615',
  true,
  2
),
(
  3,
  'Efficacy of ChAdOx1 nCoV-19 (AZD1222) vaccine against SARS-CoV-2 variant of concern 202012/01 (B.1.1.7)',
  'Emary et al.',
  2021,
  'https://doi.org/10.1016/S0140-6736(21)00628-0',
  '10.1016/S0140-6736(21)00628-0',
  'The Lancet, Vol. 397, pp. 1351-1362',
  true,
  3
),
(
  3,
  'Measles vaccination and antibody response in autism spectrum disorders',
  'Jain et al.',
  2013,
  'https://doi.org/10.1001/jamapediatrics.2013.3334',
  '10.1001/jamapediatrics.2013.3334',
  'JAMA Pediatrics, Vol. 167, pp. 800-806',
  true,
  4
),
(
  3,
  'Vaccine effectiveness against SARS-CoV-2 infection with the Omicron or Delta variants',
  'Andrews et al.',
  2022,
  'https://doi.org/10.1056/NEJMoa2119451',
  '10.1056/NEJMoa2119451',
  'New England Journal of Medicine, Vol. 386, pp. 1532-1546',
  true,
  5
),
(
  3,
  'Influenza vaccine effectiveness in the United States during 2016-2017',
  'Flannery et al.',
  2017,
  'https://doi.org/10.1093/cid/cix669',
  '10.1093/cid/cix669',
  'Clinical Infectious Diseases, Vol. 66, pp. 1487-1494',
  true,
  6
),
(
  3,
  'Global impact of the first year of COVID-19 vaccination',
  'Watson et al.',
  2022,
  'https://doi.org/10.1016/S1473-3099(22)00320-6',
  '10.1016/S1473-3099(22)00320-6',
  'The Lancet Infectious Diseases, Vol. 22, pp. 1293-1302',
  true,
  7
),
(
  3,
  'Effectiveness of COVID-19 vaccines against the B.1.617.2 (Delta) variant',
  'Lopez Bernal et al.',
  2021,
  'https://doi.org/10.1056/NEJMoa2108891',
  '10.1056/NEJMoa2108891',
  'New England Journal of Medicine, Vol. 385, pp. 585-594',
  true,
  8
)
ON CONFLICT DO NOTHING;
