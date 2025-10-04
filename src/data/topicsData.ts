
import { Topic } from '../components/TopicCard';

// Mock topics data
export const topics: Topic[] = [
  {
    id: '1',
    title: 'Climate Change',
    slug: 'climate-change',
    description: 'The scientific consensus on anthropogenic climate change, its causes, effects, and potential mitigation strategies.',
    consensusLevel: 'high',
    consensusPercentage: 97,
    contributorsCount: 0,
    sourcesCount: 1243,
    updatedAt: '2025-06-14T14:22:30Z',
    tags: ['Climate', 'Environment', 'Earth Science']
  },
  {
    id: '2',
    title: 'Vaccine Efficacy',
    slug: 'vaccine-efficacy',
    description: 'The scientific consensus on the efficacy and safety of vaccines, including COVID-19 vaccines and traditional vaccines.',
    consensusLevel: 'high',
    consensusPercentage: 95,
    contributorsCount: 0,
    sourcesCount: 982,
    updatedAt: '2025-06-14T09:15:20Z',
    tags: ['Medicine', 'Public Health', 'Immunology']
  },
  {
    id: '3',
    title: 'Artificial Intelligence Safety',
    slug: 'artificial-intelligence-safety',
    description: 'The emerging consensus on AI safety, risks of advanced artificial intelligence, and regulatory approaches.',
    consensusLevel: 'medium',
    consensusPercentage: 78,
    contributorsCount: 0,
    sourcesCount: 615,
    updatedAt: '2025-06-14T16:45:10Z',
    tags: ['Technology', 'Computer Science', 'Ethics']
  },
  {
    id: '4',
    title: 'Nutrition Science',
    slug: 'nutrition-science',
    description: 'Scientific consensus on fundamental nutrition principles, dietary recommendations, and their evidence base.',
    consensusLevel: 'high',
    consensusPercentage: 85,
    contributorsCount: 0,
    sourcesCount: 721,
    updatedAt: '2025-06-14T11:30:45Z',
    tags: ['Health', 'Food Science', 'Medicine']
  },
  {
    id: '5',
    title: 'Quantum Computing',
    slug: 'quantum-computing',
    description: 'Current scientific understanding of quantum computing principles, potential applications, and timeline expectations.',
    consensusLevel: 'high',
    consensusPercentage: 90,
    contributorsCount: 0,
    sourcesCount: 432,
    updatedAt: '2025-06-14T13:20:15Z',
    tags: ['Physics', 'Computer Science', 'Technology']
  },
  {
    id: '6',
    title: 'Evolution of Humans',
    slug: 'evolution-of-humans',
    description: 'The scientific consensus on human evolution, genetic history, and relationship to other species.',
    consensusLevel: 'high',
    consensusPercentage: 99,
    contributorsCount: 0,
    sourcesCount: 876,
    updatedAt: '2025-06-14T10:15:30Z',
    tags: ['Biology', 'Anthropology', 'Genetics']
  },
  {
    id: '7',
    title: 'Economic Impacts of Immigration',
    slug: 'economic-impacts-immigration',
    description: 'Scholarly consensus on the economic impacts of immigration on host countries and regions.',
    consensusLevel: 'medium',
    consensusPercentage: 75,
    contributorsCount: 0,
    sourcesCount: 519,
    updatedAt: '2025-06-14T15:45:22Z',
    tags: ['Economics', 'Social Science', 'Policy']
  },
  {
    id: '8',
    title: 'Effectiveness of Psychotherapy',
    slug: 'effectiveness-psychotherapy',
    description: 'The scientific consensus on the effectiveness of different psychotherapy approaches for various mental health conditions.',
    consensusLevel: 'high',
    consensusPercentage: 92.5,
    contributorsCount: 0,
    sourcesCount: 684,
    updatedAt: '2025-06-14T14:10:05Z',
    tags: ['Psychology', 'Mental Health', 'Medicine']
  }
];

export const getTopic = (slug: string): Topic | undefined => {
  return topics.find(topic => topic.slug === slug);
};

export const searchTopics = (query: string): Topic[] => {
  if (!query) return topics;
  
  const lowercaseQuery = query.toLowerCase();
  return topics.filter(topic => 
    topic.title.toLowerCase().includes(lowercaseQuery) ||
    topic.description.toLowerCase().includes(lowercaseQuery) ||
    topic.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};
