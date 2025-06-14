
-- Insert additional climate change publications
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
-- Scientific Basis Publications
(
  1,
  'Climate Change 2021: The Physical Science Basis',
  'IPCC Working Group I',
  2021,
  'https://doi.org/10.1017/9781009157896',
  '10.1017/9781009157896',
  'Cambridge University Press',
  true,
  5
),
(
  1,
  'Climate Impact of Increasing Atmospheric Carbon Dioxide',
  'James Hansen et al.',
  1981,
  'https://doi.org/10.1126/science.213.4511.957',
  '10.1126/science.213.4511.957',
  'Science, Vol. 213, Issue 4511, pp. 957–966',
  true,
  6
),
(
  1,
  'Combinations of natural and anthropogenic forcings in twentieth-century climate',
  'Meehl et al.',
  2004,
  'https://doi.org/10.1175/1520-0442(2004)017<3721:CONAAF>2.0.CO;2',
  '10.1175/1520-0442(2004)017<3721:CONAAF>2.0.CO;2',
  'Journal of Climate, Vol. 17, pp. 3721–3727',
  true,
  7
),
-- Climate Change Impacts Publications
(
  1,
  'A globally coherent fingerprint of climate change impacts across natural systems',
  'Parmesan & Yohe',
  2003,
  'https://doi.org/10.1038/nature01286',
  '10.1038/nature01286',
  'Nature, Vol. 421, pp. 37–42',
  true,
  8
),
(
  1,
  'Global warming has increased global economic inequality',
  'Diffenbaugh & Burke',
  2019,
  'https://doi.org/10.1073/pnas.1816020116',
  '10.1073/pnas.1816020116',
  'PNAS, Vol. 116, No. 20, pp. 9808–9813',
  true,
  9
),
-- Mitigation & Policy Publications
(
  1,
  'Stabilization wedges: Solving the climate problem for the next 50 years with current technologies',
  'Pacala & Socolow',
  2004,
  'https://doi.org/10.1126/science.1100103',
  '10.1126/science.1100103',
  'Science, Vol. 305, Issue 5686, pp. 968–972',
  true,
  10
),
(
  1,
  'The Economics of Climate Change: The Stern Review',
  'Stern',
  2007,
  'https://www.cambridge.org/core/books/economics-of-climate-change/A1E0BBF2F0ED8E2E4142A9C878052204',
  '',
  'Cambridge University Press',
  true,
  11
),
-- Public Perception and Consensus Publications
(
  1,
  'The scientific consensus on climate change as a gateway belief',
  'van der Linden et al.',
  2015,
  'https://doi.org/10.1371/journal.pone.0118489',
  '10.1371/journal.pone.0118489',
  'PLoS ONE, Vol. 10, Issue 2, e0118489',
  true,
  12
);
