
import React from 'react';
import { getTopic } from '@/data/topicsData';
import { Dna } from 'lucide-react';
import TopicPageLayout from '@/components/layout/TopicPageLayout';
import TopicHeroSection from '@/components/topics/TopicHeroSection';
import TopicDescriptionSection from '@/components/topics/TopicDescriptionSection';
import EvidenceSection from '@/components/evolution/EvidenceSection';
import VisualizationsSection from '@/components/evolution/VisualizationsSection';
import TopicCallToActionSection from '@/components/topics/TopicCallToActionSection';
import InsightsContainer from '@/components/evolution/InsightsContainer';

const EvolutionOfHumans = () => {
  const evolutionTopic = getTopic('evolution-of-humans');
  
  if (!evolutionTopic) {
    return (
      <TopicPageLayout>
        <div className="container mx-auto px-4 text-center py-12">
          <h1 className="text-3xl font-serif font-bold mb-4">Topic data not found</h1>
          <p className="mb-6">We couldn't find information about the Evolution of Humans topic.</p>
        </div>
      </TopicPageLayout>
    );
  }

  return (
    <TopicPageLayout>
      <TopicHeroSection 
        topic={evolutionTopic}
        title="Evolution of Humans"
        categoryIcon={Dna}
        categoryLabel="Biological Sciences"
        keyPublications={[]}
      />
      <TopicDescriptionSection 
        title="Understanding Human Evolution"
        description={evolutionTopic.description}
      />
      <EvidenceSection />
      <VisualizationsSection />
      <InsightsContainer />
      <TopicCallToActionSection topicSlug={evolutionTopic.slug} />
    </TopicPageLayout>
  );
};

export default EvolutionOfHumans;
