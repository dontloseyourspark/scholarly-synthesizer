
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getTopic } from '@/data/topicsData';
import EconomicHeroSection from '@/components/economic/EconomicHeroSection';
import EconomicDescriptionSection from '@/components/economic/EconomicDescriptionSection';
import EconomicImpactsSection from '@/components/economic/EconomicImpactsSection';
import EconomicVisualizationsSection from '@/components/economic/EconomicVisualizationsSection';
import EconomicCallToActionSection from '@/components/economic/EconomicCallToActionSection';
import EconomicInsightsContainer from '@/components/economic/EconomicInsightsContainer';

const EconomicImpactsImmigration = () => {
  const economicTopic = getTopic('economic-impacts-immigration');
  
  if (!economicTopic) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-scholarly-lightGray py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">Topic data not found</h1>
            <p className="mb-6">We couldn't find information about the Economic Impacts of Immigration topic.</p>
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
        <EconomicHeroSection topic={economicTopic} />
        <EconomicDescriptionSection description={economicTopic.description} />
        <EconomicImpactsSection />
        <EconomicVisualizationsSection />
        <EconomicInsightsContainer />
        <EconomicCallToActionSection topicSlug={economicTopic.slug} />
      </main>
      
      <Footer />
    </div>
  );
};

export default EconomicImpactsImmigration;
