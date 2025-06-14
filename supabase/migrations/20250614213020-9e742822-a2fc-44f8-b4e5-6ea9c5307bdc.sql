
-- Insert publications for Climate Change topic (topic_id = 1)
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
  1,
  'Quantifying the consensus on anthropogenic global warming in the scientific literature',
  'John Cook, Dana Nuccitelli, Sarah A. Green, Mark Richardson, Bärbel Winkler, Rob Painting, Robert Way, Peter Jacobs, Andrew Skuce',
  2013,
  'https://doi.org/10.1088/1748-9326/8/2/024024',
  '10.1088/1748-9326/8/2/024024',
  'Environmental Research Letters, Vol. 8, No. 2, 024024',
  true,
  1
),
(
  1,
  'Expert credibility in climate change',
  'William R.L. Anderegg, James W. Prall, Jacob Harold, Stephen H. Schneider',
  2010,
  'https://doi.org/10.1073/pnas.1003187107',
  '10.1073/pnas.1003187107',
  'Proceedings of the National Academy of Sciences of the USA (PNAS), Vol. 107, No. 27, pp. 12107–12109',
  true,
  2
),
(
  1,
  'Beyond the Ivory Tower: The Scientific Consensus on Climate Change',
  'Naomi Oreskes',
  2004,
  'https://doi.org/10.1126/science.1103618',
  '10.1126/science.1103618',
  'Science, Vol. 306, Issue 5702, p. 1686',
  true,
  3
),
(
  1,
  'Climate Scientists Virtually Unanimous: Anthropogenic Global Warming Is True',
  'James Lawrence Powell',
  2016,
  'https://doi.org/10.1177/0270467616634958',
  '10.1177/0270467616634958',
  'Bulletin of Science, Technology & Society, Vol. 35, No. 5–6, pp. 121–124',
  true,
  4
);
