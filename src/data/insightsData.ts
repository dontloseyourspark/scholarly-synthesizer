
export type Scholar = {
  id: string;
  name: string;
  title: string;
  institution: string;
  avatar: string;
  credentials: string[];
};

export type Insight = {
  id: string;
  topicId: string;
  scholarId: string;
  scholar: Scholar;
  content: string;
  position: 'support' | 'neutral' | 'against';
  confidence: number;
  sources: Source[];
  upvotes: number;
  downvotes: number;
  createdAt: string;
};

export type Source = {
  id: string;
  title: string;
  authors: string;
  publication: string;
  year: number;
  url: string;
  doi?: string;
};

// Sample scholars
export const scholars: Scholar[] = [
  {
    id: '1',
    name: 'Dr. Emma Chen',
    title: 'Professor of Climate Science',
    institution: 'Stanford University',
    avatar: '/placeholder.svg',
    credentials: ['Ph.D. in Atmospheric Science', 'IPCC Lead Author', '150+ peer-reviewed publications']
  },
  {
    id: '2',
    name: 'Dr. Michael Rodriguez',
    title: 'Associate Professor of Immunology',
    institution: 'Johns Hopkins University',
    avatar: '/placeholder.svg',
    credentials: ['M.D./Ph.D. in Immunology', 'CDC Research Fellow', '87 peer-reviewed publications']
  },
  {
    id: '3',
    name: 'Dr. Sarah Johnson',
    title: 'Professor of AI Ethics',
    institution: 'MIT',
    avatar: '/placeholder.svg',
    credentials: ['Ph.D. in Computer Science', 'Former AI Safety Research Lead', '120+ peer-reviewed publications']
  },
  {
    id: '4',
    name: 'Dr. James Williams',
    title: 'Professor of Nutrition Science',
    institution: 'Harvard University',
    avatar: '/placeholder.svg',
    credentials: ['Ph.D. in Nutritional Biochemistry', 'NIH Research Grantee', '110+ peer-reviewed publications']
  },
  {
    id: '5',
    name: 'Dr. Aisha Patel',
    title: 'Associate Professor of Quantum Physics',
    institution: 'Caltech',
    avatar: '/placeholder.svg',
    credentials: ['Ph.D. in Quantum Physics', 'NSF CAREER Award Recipient', '65+ peer-reviewed publications']
  }
];

// Sample sources
export const sources: Source[] = [
  {
    id: 's1',
    title: 'Climate Change 2021: The Physical Science Basis',
    authors: 'IPCC Working Group I',
    publication: 'Intergovernmental Panel on Climate Change',
    year: 2021,
    url: 'https://www.ipcc.ch/report/ar6/wg1/',
    doi: '10.1017/9781009157896'
  },
  {
    id: 's2',
    title: 'Safety and Efficacy of the BNT162b2 mRNA Covid-19 Vaccine',
    authors: 'Polack, F.P., Thomas, S.J., Kitchin, N., et al.',
    publication: 'New England Journal of Medicine',
    year: 2020,
    url: 'https://www.nejm.org/doi/full/10.1056/nejmoa2034577',
    doi: '10.1056/NEJMoa2034577'
  },
  {
    id: 's3',
    title: 'On the Opportunities and Risks of Foundation Models',
    authors: 'Bommasani, R., Hudson, D.A., Adeli, E., et al.',
    publication: 'Center for Research on Foundation Models',
    year: 2022,
    url: 'https://arxiv.org/abs/2108.07258',
    doi: '10.48550/arXiv.2108.07258'
  },
  {
    id: 's4',
    title: 'Dietary patterns and health outcomes',
    authors: 'Hu, F.B.',
    publication: 'Journal of the American Medical Association',
    year: 2018,
    url: 'https://jamanetwork.com/journals/jama/article-abstract/2712722',
    doi: '10.1001/jama.2018.0323'
  },
  {
    id: 's5',
    title: 'Quantum Computing: Progress and Prospects',
    authors: 'National Academies of Sciences, Engineering, and Medicine',
    publication: 'The National Academies Press',
    year: 2019,
    url: 'https://www.nap.edu/catalog/25196/quantum-computing-progress-and-prospects',
    doi: '10.17226/25196'
  }
];

// Sample insights
export const insights: Insight[] = [
  {
    id: 'i1',
    topicId: '1', // Climate Change
    scholarId: '1',
    scholar: scholars[0],
    content: 'The evidence that human activities, particularly greenhouse gas emissions, are the dominant cause of observed warming since the mid-20th century is unequivocal. Multiple lines of independent evidence confirm this conclusion, including observed warming patterns, climate model simulations, and paleoclimate records.',
    position: 'support',
    confidence: 95,
    sources: [sources[0]],
    upvotes: 243,
    downvotes: 12,
    createdAt: '2023-07-12T08:30:00Z'
  },
  {
    id: 'i2',
    topicId: '2', // Vaccine Efficacy
    scholarId: '2',
    scholar: scholars[1],
    content: 'The safety and efficacy of vaccines are supported by extensive clinical trials and post-market surveillance. Modern vaccines have been shown to be highly effective at preventing serious illness while maintaining excellent safety profiles with very rare serious adverse events.',
    position: 'support',
    confidence: 92,
    sources: [sources[1]],
    upvotes: 187,
    downvotes: 23,
    createdAt: '2023-08-23T14:15:30Z'
  },
  {
    id: 'i3',
    topicId: '3', // AI Safety
    scholarId: '3',
    scholar: scholars[2],
    content: 'While there is strong evidence for the transformative potential of advanced AI systems, there remains significant uncertainty about the timeline and nature of potential risks. The field is still developing consensus on best practices for ensuring that advanced AI systems are aligned with human values and goals.',
    position: 'neutral',
    confidence: 70,
    sources: [sources[2]],
    upvotes: 132,
    downvotes: 45,
    createdAt: '2023-09-18T11:45:00Z'
  },
  {
    id: 'i4',
    topicId: '4', // Nutrition Science
    scholarId: '4',
    scholar: scholars[3],
    content: 'There is strong evidence that dietary patterns rich in vegetables, fruits, whole grains, legumes, nuts, and unsaturated oils are associated with better health outcomes across populations. However, individual responses to specific diets can vary based on genetic, metabolic, and lifestyle factors.',
    position: 'support',
    confidence: 75,
    sources: [sources[3]],
    upvotes: 165,
    downvotes: 38,
    createdAt: '2023-06-30T09:20:15Z'
  },
  {
    id: 'i5',
    topicId: '5', // Quantum Computing
    scholarId: '5',
    scholar: scholars[4],
    content: 'Current quantum computing research has demonstrated significant progress in developing quantum processors with increasing numbers of qubits and improving error correction. However, practical quantum advantage for important problems remains a future goal rather than a current reality.',
    position: 'neutral',
    confidence: 88,
    sources: [sources[4]],
    upvotes: 120,
    downvotes: 15,
    createdAt: '2023-09-05T16:30:45Z'
  }
];

export const getInsightsForTopic = (topicId: string): Insight[] => {
  return insights.filter(insight => insight.topicId === topicId);
};
