
import React from 'react';
import { getTopic } from '@/data/topicsData';
import { Brain, Heart, Users, TrendingUp } from 'lucide-react';
import TopicPageLayout from '@/components/layout/TopicPageLayout';
import TopicHeroSection from '@/components/topics/TopicHeroSection';
import TopicDescriptionSection from '@/components/topics/TopicDescriptionSection';
import TopicContentSection from '@/components/topics/TopicContentSection';
import TopicVisualizationsSection from '@/components/topics/TopicVisualizationsSection';
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

  const psychotherapyCards = [
    {
      title: "Evidence-Based Practice",
      icon: <Brain className="h-8 w-8 text-blue-500" />,
      description: "Cognitive-behavioral therapy and other evidence-based approaches show consistent positive outcomes."
    },
    {
      title: "Mental Health Outcomes",
      icon: <Heart className="h-8 w-8 text-red-500" />,
      description: "Meta-analyses demonstrate significant improvements in depression, anxiety, and other conditions."
    },
    {
      title: "Therapeutic Relationship",
      icon: <Users className="h-8 w-8 text-green-500" />,
      description: "Strong therapeutic alliance is a key predictor of successful treatment outcomes across modalities."
    },
    {
      title: "Treatment Efficacy",
      icon: <TrendingUp className="h-8 w-8 text-purple-500" />,
      description: "Psychotherapy shows effect sizes comparable to many medical treatments for psychological disorders."
    }
  ];

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
      <TopicContentSection 
        title="Therapeutic Methods"
        subtitle="Evidence-Based Approaches"
        description="Research on different psychotherapy modalities and their effectiveness for various conditions."
        cards={psychotherapyCards}
      />
      <TopicVisualizationsSection>
        <PsychotherapyVisualizationsSection />
      </TopicVisualizationsSection>
      <PsychotherapyInsightsContainer />
      <TopicCallToActionSection topicSlug={psychotherapyTopic.slug} />
    </TopicPageLayout>
  );
};

export default EffectivenessPsychotherapy;
