
import React from 'react';
import { getTopic } from '@/data/topicsData';
import { Apple } from 'lucide-react';
import TopicPageLayout from '@/components/layout/TopicPageLayout';
import TopicHeroSection from '@/components/topics/TopicHeroSection';
import TopicDescriptionSection from '@/components/topics/TopicDescriptionSection';
import TopicContentSection from '@/components/topics/TopicContentSection';
import TopicVisualizationsSection from '@/components/topics/TopicVisualizationsSection';
import NutritionVisualizationsSection from '@/components/nutrition/NutritionVisualizationsSection';
import TopicCallToActionSection from '@/components/topics/TopicCallToActionSection';
import NutritionInsightsContainer from '@/components/nutrition/NutritionInsightsContainer';

const NutritionScience = () => {
  const nutritionTopic = getTopic('nutrition-science');
  
  if (!nutritionTopic) {
    return (
      <TopicPageLayout>
        <div className="container mx-auto px-4 text-center py-12">
          <h1 className="text-3xl font-serif font-bold mb-4">Topic data not found</h1>
          <p className="mb-6">We couldn't find information about the Nutrition Science topic.</p>
        </div>
      </TopicPageLayout>
    );
  }

  return (
    <TopicPageLayout>
      <TopicHeroSection 
        topic={nutritionTopic}
        title="Nutrition Science"
        categoryIcon={Apple}
        categoryLabel="Health Sciences"
        keyPublications={[]}
      />
      <TopicDescriptionSection 
        title="Understanding Nutrition Science"
        description={nutritionTopic.description}
      />
      <TopicContentSection 
        title="Nutritional Evidence"
        subtitle="Key Findings"
        description="Evidence-based nutrition recommendations from clinical studies and population research."
      />
      <TopicVisualizationsSection>
        <NutritionVisualizationsSection />
      </TopicVisualizationsSection>
      <NutritionInsightsContainer />
      <TopicCallToActionSection topicSlug={nutritionTopic.slug} />
    </TopicPageLayout>
  );
};

export default NutritionScience;
