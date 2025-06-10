
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getTopic } from '@/data/topicsData';

// Import components for the Evolution of Humans page
import HeroSection from '@/components/evolution/HeroSection';
import DescriptionSection from '@/components/evolution/DescriptionSection';
import EvidenceSection from '@/components/evolution/EvidenceSection';
import VisualizationsSection from '@/components/evolution/VisualizationsSection';
import CallToActionSection from '@/components/evolution/CallToActionSection';
import InsightsContainer from '@/components/evolution/InsightsContainer';

const EvolutionOfHumans = () => {
  // Get the evolution of humans topic data - use the exact slug from the topicsData
  const evolutionTopic = getTopic('evolution-of-humans');
  
  if (!evolutionTopic) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-scholarly-lightGray py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">Topic data not found</h1>
            <p className="mb-6">We couldn't find information about the Evolution of Humans topic.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-scholarly-lightGray pb-16">
        <HeroSection topic={evolutionTopic} />
        <DescriptionSection description={evolutionTopic.description} />
        <EvidenceSection />
        <VisualizationsSection />
        <InsightsContainer />
        <CallToActionSection topicSlug={evolutionTopic.slug} />
      </main>
      
      <Footer />
    </div>
  );
};

export default EvolutionOfHumans;
