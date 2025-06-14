
import React from 'react';
import { getTopic } from '@/data/topicsData';
import { Dna, Skull, Users, Clock } from 'lucide-react';
import TopicPageLayout from '@/components/layout/TopicPageLayout';
import TopicHeroSection from '@/components/topics/TopicHeroSection';
import TopicDescriptionSection from '@/components/topics/TopicDescriptionSection';
import TopicContentSection from '@/components/topics/TopicContentSection';
import TopicVisualizationsSection from '@/components/topics/TopicVisualizationsSection';
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

  const evolutionCards = [
    {
      title: "Fossil Evidence",
      icon: <Skull className="h-8 w-8 text-brown-500" />,
      description: "Extensive fossil record showing gradual changes in human ancestors over millions of years."
    },
    {
      title: "Genetic Analysis",
      icon: <Dna className="h-8 w-8 text-blue-500" />,
      description: "DNA evidence reveals evolutionary relationships and migration patterns of early humans."
    },
    {
      title: "Population Genetics",
      icon: <Users className="h-8 w-8 text-green-500" />,
      description: "Studies of genetic diversity provide insights into human evolutionary history and demographics."
    },
    {
      title: "Timeline",
      icon: <Clock className="h-8 w-8 text-purple-500" />,
      description: "Human evolution spans approximately 7 million years from early hominids to modern humans."
    }
  ];

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
      <TopicContentSection 
        title="Evolutionary Evidence"
        subtitle="Key Scientific Findings"
        description="Research on fossil records, genetic evidence, comparative anatomy, and molecular biology supporting human evolution."
        cards={evolutionCards}
      />
      <TopicVisualizationsSection>
        <VisualizationsSection />
      </TopicVisualizationsSection>
      <InsightsContainer />
      <TopicCallToActionSection topicSlug={evolutionTopic.slug} />
    </TopicPageLayout>
  );
};

export default EvolutionOfHumans;
