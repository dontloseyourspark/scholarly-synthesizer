
import React from 'react';
import { getTopic } from '@/data/topicsData';
import { TrendingUp } from 'lucide-react';
import TopicPageLayout from '@/components/layout/TopicPageLayout';
import TopicHeroSection from '@/components/topics/TopicHeroSection';
import TopicDescriptionSection from '@/components/topics/TopicDescriptionSection';
import TopicContentSection from '@/components/topics/TopicContentSection';
import TopicVisualizationsSection from '@/components/topics/TopicVisualizationsSection';
import EconomicVisualizationsSection from '@/components/economic/EconomicVisualizationsSection';
import TopicCallToActionSection from '@/components/topics/TopicCallToActionSection';
import EconomicInsightsContainer from '@/components/economic/EconomicInsightsContainer';

const EconomicImpactsImmigration = () => {
  const economicTopic = getTopic('economic-impacts-immigration');
  
  if (!economicTopic) {
    return (
      <TopicPageLayout>
        <div className="container mx-auto px-4 text-center py-12">
          <h1 className="text-3xl font-serif font-bold mb-4">Topic data not found</h1>
          <p className="mb-6">We couldn't find information about the Economic Impacts of Immigration topic.</p>
        </div>
      </TopicPageLayout>
    );
  }

  return (
    <TopicPageLayout>
      <TopicHeroSection 
        topic={economicTopic}
        title="Economic Impacts of Immigration"
        categoryIcon={TrendingUp}
        categoryLabel="Economic Studies"
        keyPublications={[]}
      />
      <TopicDescriptionSection 
        title="Understanding Economic Impacts of Immigration"
        description={economicTopic.description}
      />
      <TopicContentSection 
        title="Economic Impact Analysis"
        subtitle="Key Economic Effects"
        description="Research on labor market effects, fiscal impacts, and economic growth from immigration."
      />
      <TopicVisualizationsSection>
        <EconomicVisualizationsSection />
      </TopicVisualizationsSection>
      <EconomicInsightsContainer />
      <TopicCallToActionSection topicSlug={economicTopic.slug} />
    </TopicPageLayout>
  );
};

export default EconomicImpactsImmigration;
