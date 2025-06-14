
import React from 'react';
import { getTopic } from '@/data/topicsData';
import { Bot, Shield, AlertTriangle, Cpu } from 'lucide-react';
import TopicPageLayout from '@/components/layout/TopicPageLayout';
import TopicHeroSection from '@/components/topics/TopicHeroSection';
import TopicDescriptionSection from '@/components/topics/TopicDescriptionSection';
import TopicContentSection from '@/components/topics/TopicContentSection';
import TopicVisualizationsSection from '@/components/topics/TopicVisualizationsSection';
import AISafetyVisualizationsSection from '@/components/ai-safety/AISafetyVisualizationsSection';
import TopicCallToActionSection from '@/components/topics/TopicCallToActionSection';
import AISafetyInsightsContainer from '@/components/ai-safety/AISafetyInsightsContainer';

const AISafety = () => {
  const aiSafetyTopic = getTopic('artificial-intelligence-safety');
  
  if (!aiSafetyTopic) {
    return (
      <TopicPageLayout>
        <div className="container mx-auto px-4 text-center py-12">
          <h1 className="text-3xl font-serif font-bold mb-4">Topic data not found</h1>
          <p className="mb-6">We couldn't find information about the AI Safety topic.</p>
        </div>
      </TopicPageLayout>
    );
  }

  const aiSafetyCards = [
    {
      title: "Risk Assessment",
      icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
      description: "Identifying potential risks from advanced AI systems including misalignment and unintended consequences."
    },
    {
      title: "Alignment Research",
      icon: <Shield className="h-8 w-8 text-green-500" />,
      description: "Ensuring AI systems remain aligned with human values and intentions as they become more capable."
    },
    {
      title: "Robustness Testing",
      icon: <Cpu className="h-8 w-8 text-blue-500" />,
      description: "Developing methods to test AI systems for safety and reliability under various conditions."
    },
    {
      title: "Governance Frameworks",
      icon: <Bot className="h-8 w-8 text-purple-500" />,
      description: "Creating policies and regulations to guide the safe development and deployment of AI systems."
    }
  ];

  return (
    <TopicPageLayout>
      <TopicHeroSection 
        topic={aiSafetyTopic}
        title="Artificial Intelligence Safety"
        categoryIcon={Bot}
        categoryLabel="Technology Topics"
        keyPublications={[]}
      />
      <TopicDescriptionSection 
        title="Understanding AI Safety"
        description={aiSafetyTopic.description}
      />
      <TopicContentSection 
        title="AI Safety Research"
        subtitle="Risk Assessment and Mitigation"
        description="Research on potential risks from advanced artificial intelligence systems and methods to ensure AI systems remain beneficial and aligned with human values."
        cards={aiSafetyCards}
      />
      <TopicVisualizationsSection>
        <AISafetyVisualizationsSection />
      </TopicVisualizationsSection>
      <AISafetyInsightsContainer />
      <TopicCallToActionSection topicSlug={aiSafetyTopic.slug} />
    </TopicPageLayout>
  );
};

export default AISafety;
