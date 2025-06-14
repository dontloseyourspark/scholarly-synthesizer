
import React from 'react';
import { getTopic } from '@/data/topicsData';
import { Brain } from 'lucide-react';
import TopicPageLayout from '@/components/layout/TopicPageLayout';
import TopicHeroSection from '@/components/topics/TopicHeroSection';
import TopicDescriptionSection from '@/components/topics/TopicDescriptionSection';
import PsychotherapyMethodsSection from '@/components/psychotherapy/PsychotherapyMethodsSection';
import PsychotherapyVisualizationsSection from '@/components/psychotherapy/PsychotherapyVisualizationsSection';
import TopicCallToActionSection from '@/components/topics/TopicCallToActionSection';
import PsychotherapyInsightsContainer from '@/components/psychotherapy/PsychotherapyInsightsContainer';

const EffectivenessPsychotherapy = () => {
  const psychotherapyTopic = getTopic('effectiveness-psychotherapy');
  
  if (!psychotherapyTopic) {
    return (
      <TopicPageLayout>
        <div className="container mx-auto px-4 text-center py-12">
          <h1 className="text-3xl font-serif font-bold mb-4">Topic data not found</h1>
          <p className="mb-6">We couldn't find information about the Effectiveness of Psychotherapy topic.</p>
        </div>
      </TopicPageLayout>
    );
  }

  return (
    <TopicPageLayout>
      <TopicHeroSection 
        topic={psychotherapyTopic}
        title="Effectiveness of Psychotherapy"
        categoryIcon={Brain}
        categoryLabel="Psychology"
        keyPublications={[]}
      />
      <TopicDescriptionSection 
        title="Understanding Psychotherapy Effectiveness"
        description={psychotherapyTopic.description}
      />
      <PsychotherapyMethodsSection />
      <PsychotherapyVisualizationsSection />
      <PsychotherapyInsightsContainer />
      <TopicCallToActionSection topicSlug={psychotherapyTopic.slug} />
    </TopicPageLayout>
  );
};

export default EffectivenessPsychotherapy;
