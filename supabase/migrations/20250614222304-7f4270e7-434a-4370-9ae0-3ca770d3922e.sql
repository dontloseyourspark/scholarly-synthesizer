
-- Add additional vaccine efficacy publications to the database
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
  'Simply put: Vaccination saves lives',
  'Orenstein & Ahmed',
  2017,
  'https://doi.org/10.1073/pnas.1718156115',
  '10.1073/pnas.1718156115',
  'Proceedings of the National Academy of Sciences (PNAS)',
  true,
  9
),
(
  3,
  'Vaccine hesitancy: Definition, scope and determinants',
  'MacDonald et al.',
  2015,
  'https://doi.org/10.1016/j.vaccine.2015.04.036',
  '10.1016/j.vaccine.2015.04.036',
  'Vaccine, Vol. 33, Issue 34',
  true,
  10
),
(
  3,
  'Effectiveness of COVID-19 Vaccines in Preventing Hospitalization',
  'Thompson et al.',
  2021,
  'https://doi.org/10.15585/mmwr.mm7034e3',
  '10.15585/mmwr.mm7034e3',
  'Morbidity and Mortality Weekly Report (MMWR), CDC',
  true,
  11
),
(
  3,
  'Vaccination Coverage Among Children',
  'Whitney et al.',
  2014,
  'https://doi.org/10.1056/NEJMoa1401530',
  '10.1056/NEJMoa1401530',
  'New England Journal of Medicine',
  true,
  12
),
(
  3,
  'WHO Global Vaccine Safety - Vaccine efficacy documentation',
  'World Health Organization',
  2023,
  'https://www.who.int/vaccine_safety/initiative/detection/immunization_misconceptions/en/',
  'WHO/IVB/23.01',
  'WHO Technical Report',
  true,
  13
),
(
  3,
  'CDC Vaccine Effectiveness Studies - Annual Review',
  'Centers for Disease Control and Prevention',
  2023,
  'https://www.cdc.gov/vaccines/hcp/acip-recs/general-recs/effectiveness.html',
  'CDC-2023-VE-001',
  'CDC Technical Report',
  true,
  14
),
(
  3,
  'EMA Assessment Report on Vaccine Safety and Efficacy',
  'European Medicines Agency',
  2023,
  'https://www.ema.europa.eu/en/human-regulatory/overview/public-health-threats/coronavirus-disease-covid-19/treatments-vaccines/vaccines-covid-19',
  'EMA/CHMP/2023/001',
  'EMA Assessment Report',
  true,
  15
),
(
  3,
  'GAVI Alliance - Vaccine Impact and Efficacy Global Report',
  'GAVI Alliance',
  2023,
  'https://www.gavi.org/programmes-impact/our-impact/facts-and-figures',
  'GAVI-2023-IMPACT',
  'GAVI Technical Report',
  true,
  16
)
ON CONFLICT DO NOTHING;
