
import React from 'react';
import { getTopic } from '@/data/topicsData';
import { Bot } from 'lucide-react';
import TopicPageLayout from '@/components/layout/TopicPageLayout';
import TopicHeroSection from '@/components/topics/TopicHeroSection';
import TopicDescriptionSection from '@/components/topics/TopicDescriptionSection';
import AISafetyRisksSection from '@/components/ai-safety/AISafetyRisksSection';
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
        keyPublications={[]} // AI safety publications would be imported from data file
      />
      <TopicDescriptionSection 
        title="Understanding AI Safety"
        description={aiSafetyTopic.description}
      />
      <AISafetyRisksSection />
      <AISafetyVisualizationsSection />
      <AISafetyInsightsContainer />
      <TopicCallToActionSection topicSlug={aiSafetyTopic.slug} />
    </TopicPageLayout>
  );
};

export default AISafety;
