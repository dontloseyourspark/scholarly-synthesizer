
import React from 'react';
import TopicPageLayout from '@/components/layout/TopicPageLayout';
import TopicHeroSection from '@/components/topics/TopicHeroSection';
import TopicDescriptionSection from '@/components/topics/TopicDescriptionSection';
import TopicVisualizationsSection from '@/components/topics/TopicVisualizationsSection';
import TopicContentSection from '@/components/topics/TopicContentSection';
import TopicCallToActionSection from '@/components/topics/TopicCallToActionSection';
import { Thermometer } from 'lucide-react';
import { getTopic } from '@/data/topicsData';
import { keyPublications } from '@/data/climateChangeData';
import { getTopicIdFromSlug } from '@/utils/topicMapping';
import DatabaseInsightsContainer from '@/components/database/DatabaseInsightsContainer';

const ClimateChange = () => {
  const topic = getTopic('climate-change')!;
  const topicId = getTopicIdFromSlug('climate-change');

  const description = "Climate change refers to long-term shifts in global temperatures and weather patterns. Scientific evidence overwhelmingly shows that human activities, particularly the emission of greenhouse gases, are the primary driver of climate change since the mid-20th century.";

  const content = {
    sections: [
      {
        title: "The Scientific Evidence",
        content: "Multiple lines of evidence support the reality of anthropogenic climate change, including rising global temperatures, melting ice sheets, rising sea levels, and changing precipitation patterns. The scientific consensus is based on data from thousands of research studies and observations from around the world."
      },
      {
        title: "Greenhouse Gas Effects",
        content: "Carbon dioxide levels have increased by over 40% since pre-industrial times, primarily due to fossil fuel combustion and deforestation. Other greenhouse gases like methane and nitrous oxide have also increased significantly, contributing to the enhanced greenhouse effect."
      }
    ]
  };

  return (
    <TopicPageLayout>
      <TopicHeroSection
        topic={topic}
        title="Climate Change"
        categoryIcon={Thermometer}
        categoryLabel="Environmental Science"
        keyPublications={keyPublications}
      />
      
      <TopicDescriptionSection description={description} />
      
      <TopicContentSection content={content} />
      
      <TopicVisualizationsSection />
      
      {topicId ? (
        <DatabaseInsightsContainer topicId={topicId} keyPublications={keyPublications} />
      ) : (
        <div className="container mx-auto px-4 mt-8">
          <div className="text-center text-red-600">
            Error: Could not map topic to database
          </div>
        </div>
      )}
      
      <TopicCallToActionSection />
    </TopicPageLayout>
  );
};

export default ClimateChange;
