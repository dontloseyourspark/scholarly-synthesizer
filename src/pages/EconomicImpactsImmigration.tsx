
import React from 'react';
import { getTopic } from '@/data/topicsData';
import { TrendingUp, DollarSign, Users, BarChart } from 'lucide-react';
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

  const economicCards = [
    {
      title: "Labor Market Effects",
      icon: <Users className="h-8 w-8 text-blue-500" />,
      description: "Studies show immigration has minimal impact on native wages while filling labor shortages."
    },
    {
      title: "Fiscal Impact",
      icon: <DollarSign className="h-8 w-8 text-green-500" />,
      description: "Long-term fiscal contributions of immigrants typically exceed costs, especially for skilled migrants."
    },
    {
      title: "Economic Growth",
      icon: <TrendingUp className="h-8 w-8 text-purple-500" />,
      description: "Immigration contributes to GDP growth through increased consumption and entrepreneurship."
    },
    {
      title: "Data Analysis",
      icon: <BarChart className="h-8 w-8 text-orange-500" />,
      description: "Comprehensive economic data shows net positive effects of immigration on host economies."
    }
  ];

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
        cards={economicCards}
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
