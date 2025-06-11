
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getTopic } from '@/data/topicsData';
import AISafetyHeroSection from '@/components/ai-safety/AISafetyHeroSection';
import AISafetyDescriptionSection from '@/components/ai-safety/AISafetyDescriptionSection';
import AISafetyRisksSection from '@/components/ai-safety/AISafetyRisksSection';
import AISafetyVisualizationsSection from '@/components/ai-safety/AISafetyVisualizationsSection';
import AISafetyCallToActionSection from '@/components/ai-safety/AISafetyCallToActionSection';
import AISafetyInsightsContainer from '@/components/ai-safety/AISafetyInsightsContainer';

const AISafety = () => {
  const aiSafetyTopic = getTopic('artificial-intelligence-safety');
  
  if (!aiSafetyTopic) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-scholarly-lightGray py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">Topic data not found</h1>
            <p className="mb-6">We couldn't find information about the AI Safety topic.</p>
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
        <AISafetyHeroSection topic={aiSafetyTopic} />
        <AISafetyDescriptionSection description={aiSafetyTopic.description} />
        <AISafetyRisksSection />
        <AISafetyVisualizationsSection />
        <AISafetyInsightsContainer />
        <AISafetyCallToActionSection topicSlug={aiSafetyTopic.slug} />
      </main>
      
      <Footer />
    </div>
  );
};

export default AISafety;
