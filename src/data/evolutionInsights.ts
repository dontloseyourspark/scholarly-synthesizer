
import { Insight, Scholar, Source } from './insightsData';

// Sample scholars for evolution topic
export const evolutionScholars: Scholar[] = [
  {
    id: 'evo1',
    name: 'Dr. Sarah Mitchell',
    title: 'Professor of Evolutionary Biology',
    institution: 'Harvard University',
    avatar: '/placeholder.svg',
    credentials: ['Ph.D. in Evolutionary Biology', 'Author of "Human Origins Revealed"', '200+ peer-reviewed publications']
  },
  {
    id: 'evo2',
    name: 'Dr. James Rodriguez',
    title: 'Professor of Paleoanthropology',
    institution: 'University of Cambridge',
    avatar: '/placeholder.svg',
    credentials: ['Ph.D. in Paleoanthropology', 'Lead researcher on African fossil sites', '150+ peer-reviewed publications']
  }
];

// Sample sources for evolution topic
export const evolutionSources: Source[] = [
  {
    id: 'evs1',
    title: 'The Complete World of Human Evolution',
    authors: 'Stringer, C. & Andrews, P.',
    publication: 'Thames & Hudson',
    year: 2012,
    url: 'https://example.com/human-evolution-complete',
    doi: '10.1038/nature12961'
  },
  {
    id: 'evs2',
    title: 'Ancient DNA and human evolution',
    authors: 'Slatkin, M., & Racimo, F.',
    publication: 'Proceedings of the National Academy of Sciences',
    year: 2016,
    url: 'https://www.pnas.org/doi/10.1073/pnas.1524306113',
    doi: '10.1073/pnas.1524306113'
  }
];

// Sample insights for evolution topic
export const evolutionInsights: Insight[] = [
  {
    id: 'evi1',
    topicId: '2', // Evolution of Humans
    scholarId: 'evo1',
    scholar: evolutionScholars[0],
    content: 'The fossil record provides compelling evidence for human evolution from earlier hominid ancestors. Key transitional fossils like Australopithecus afarensis (Lucy) and Homo erectus demonstrate gradual morphological changes over millions of years, including brain size increases, bipedalism development, and tool use sophistication.',
    position: 'support',
    confidence: 98,
    sources: [evolutionSources[0]],
    upvotes: 187,
    downvotes: 8,
    votes: 179,
    verification_status: 'verified',
    createdAt: '2023-08-15T10:20:00Z'
  },
  {
    id: 'evi2',
    topicId: '2',
    scholarId: 'evo2',
    scholar: evolutionScholars[1],
    content: 'Recent advances in ancient DNA analysis have revolutionized our understanding of human evolution. Genetic evidence from Neanderthal and Denisovan genomes shows clear evolutionary relationships and interbreeding events that support common ancestry theories. The molecular clock data aligns remarkably well with fossil evidence.',
    position: 'support',
    confidence: 96,
    sources: [evolutionSources[1]],
    upvotes: 156,
    downvotes: 5,
    votes: 151,
    verification_status: 'verified',
    createdAt: '2023-09-02T14:45:00Z'
  }
];
