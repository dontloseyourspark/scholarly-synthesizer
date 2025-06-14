
import React from 'react';
import { getTopic } from '@/data/topicsData';
import { Bot } from 'lucide-react';
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
