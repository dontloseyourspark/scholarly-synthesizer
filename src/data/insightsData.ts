
export type Scholar = {
  id: string;
  name: string;
  title: string;
  institution: string;
  avatar: string;
  credentials: string[];
};

export type Insight = {
  verification_status: string;
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
  votes: number;
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
    votes: 231,
    verification_status: 'verified',
    createdAt: '2023-07-12T08:30:00Z'
  }
];

export const getInsightsForTopic = (topicId: string): Insight[] => {
  return insights.filter(insight => insight.topicId === topicId);
};
