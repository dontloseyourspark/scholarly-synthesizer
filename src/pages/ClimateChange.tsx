
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getTopic } from '@/data/topicsData';
import { Earth } from 'lucide-react';
import TopicPageLayout from '@/components/layout/TopicPageLayout';
import TopicHeroSection from '@/components/topics/TopicHeroSection';
import TopicDescriptionSection from '@/components/topics/TopicDescriptionSection';
import EffectsSection from '@/components/climate/EffectsSection';
import VisualizationsSection from '@/components/climate/VisualizationsSection';
import TopicCallToActionSection from '@/components/topics/TopicCallToActionSection';
import InsightsContainer from '@/components/climate/InsightsContainer';
import { keyPublications } from '@/data/climateChangeData';

const ClimateChange = () => {
  const climateChangeTopic = getTopic('climate-change');

  if (!climateChangeTopic) {
    return (
      <TopicPageLayout>
        <div className="container mx-auto px-4 text-center py-12">
          <h1 className="text-3xl font-serif font-bold mb-4">Topic data not found</h1>
          <p className="mb-6">
            We couldn't find information about the Climate Change topic.
          </p>
          <Button asChild>
            <Link to="/topics">Browse All Topics</Link>
          </Button>
        </div>
      </TopicPageLayout>
    );
  }

  const additionalContent = (
    <p className="text-base text-muted-foreground leading-relaxed">
      The scientific consensus on climate change is built on decades of research, observations, 
      and climate modeling. Multiple lines of evidence consistently point to human activities 
      as the primary driver of recent climate change.
    </p>
  );

  return (
    <TopicPageLayout>
      <TopicHeroSection 
        topic={climateChangeTopic}
        title="Climate Change"
        categoryIcon={Earth}
        categoryLabel="Climate Topics"
        keyPublications={keyPublications}
      />
      <TopicDescriptionSection 
        title="Understanding Climate Change"
        description={climateChangeTopic.description}
        additionalContent={additionalContent}
      />
      <EffectsSection />
      <VisualizationsSection />
      <InsightsContainer />
      <TopicCallToActionSection 
        topicSlug={climateChangeTopic.slug}
        title="Contribute to Climate Research"
        description="Help advance our understanding of climate change by contributing your expertise and research insights."
      />
    </TopicPageLayout>
  );
};

export default ClimateChange;
