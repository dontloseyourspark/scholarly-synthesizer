
import React from 'react';
import TopicPageLayout from '@/components/layout/TopicPageLayout';
import TopicHeroSection from '@/components/topics/TopicHeroSection';
import TopicDescriptionSection from '@/components/topics/TopicDescriptionSection';
import TopicVisualizationsSection from '@/components/topics/TopicVisualizationsSection';
import TopicContentSection from '@/components/topics/TopicContentSection';
import TopicCallToActionSection from '@/components/topics/TopicCallToActionSection';
import { ThermometerSun, Cloud, Wind, Tree } from 'lucide-react';
import { getTopic } from '@/data/topicsData';
import { keyPublications } from '@/data/climateChangeData';
import { getTopicIdFromSlug } from '@/utils/topicMapping';
import DatabaseInsightsContainer from '@/components/database/DatabaseInsightsContainer';
import ConsensusTab from '@/components/climate/ConsensusTab';

const ClimateChange = () => {
  const topic = getTopic('climate-change')!;
  const topicId = getTopicIdFromSlug('climate-change');

  const description = "Climate change refers to long-term shifts in global temperatures and weather patterns. Scientific evidence overwhelmingly shows that human activities, particularly the emission of greenhouse gases, are the primary driver of climate change since the mid-20th century.";

  const climateCards = [
    {
      title: "Rising Temperatures",
      icon: <ThermometerSun className="h-8 w-8 text-orange-500" />,
      description: "Global average temperature has increased by about 1.1°C since pre-industrial times."
    },
    {
      title: "Changing Weather Patterns",
      icon: <Cloud className="h-8 w-8 text-blue-400" />,
      description: "Increased frequency and intensity of extreme weather events, including hurricanes, droughts, and floods."
    },
    {
      title: "Melting Ice Caps",
      icon: <Wind className="h-8 w-8 text-cyan-500" />,
      description: "Arctic sea ice is declining at a rate of 13.1% per decade, affecting global ocean currents and weather patterns."
    },
    {
      title: "Biodiversity Loss",
      icon: <Tree className="h-8 w-8 text-green-600" />,
      description: "An estimated one million plant and animal species are at risk of extinction due to climate change."
    }
  ];

  return (
    <TopicPageLayout>
      <TopicHeroSection
        topic={topic}
        title="Climate Change"
        categoryIcon={ThermometerSun}
        categoryLabel="Environmental Science"
        keyPublications={keyPublications}
      />
      
      <TopicDescriptionSection 
        title="Understanding Climate Change"
        description={description} 
      />
      
      <TopicContentSection 
        title="Key Evidence" 
        subtitle="The Scientific Foundation"
        description="Multiple lines of evidence support the reality of anthropogenic climate change, including rising global temperatures, melting ice sheets, rising sea levels, and changing precipitation patterns. The scientific consensus is based on data from thousands of research studies and observations from around the world."
        cards={climateCards}
      />
      
      <TopicVisualizationsSection>
        <ConsensusTab />
      </TopicVisualizationsSection>
      
      {topicId ? (
        <DatabaseInsightsContainer topicId={topicId} keyPublications={keyPublications} />
      ) : (
        <div className="container mx-auto px-4 mt-8">
          <div className="text-center text-red-600">
            Error: Could not map topic to database
          </div>
        </div>
      )}
      
      <TopicCallToActionSection topicSlug="climate-change" />
    </TopicPageLayout>
  );
};

export default ClimateChange;
