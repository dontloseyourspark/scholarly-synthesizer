
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getTopic } from '@/data/topicsData';
import PsychotherapyHeroSection from '@/components/psychotherapy/PsychotherapyHeroSection';
import PsychotherapyDescriptionSection from '@/components/psychotherapy/PsychotherapyDescriptionSection';
import PsychotherapyMethodsSection from '@/components/psychotherapy/PsychotherapyMethodsSection';
import PsychotherapyVisualizationsSection from '@/components/psychotherapy/PsychotherapyVisualizationsSection';
import PsychotherapyCallToActionSection from '@/components/psychotherapy/PsychotherapyCallToActionSection';
import PsychotherapyInsightsContainer from '@/components/psychotherapy/PsychotherapyInsightsContainer';

const EffectivenessPsychotherapy = () => {
  const psychotherapyTopic = getTopic('effectiveness-psychotherapy');
  
  if (!psychotherapyTopic) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-scholarly-lightGray py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">Topic data not found</h1>
            <p className="mb-6">We couldn't find information about the Effectiveness of Psychotherapy topic.</p>
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
        <PsychotherapyHeroSection topic={psychotherapyTopic} />
        <PsychotherapyDescriptionSection description={psychotherapyTopic.description} />
        <PsychotherapyMethodsSection />
        <PsychotherapyVisualizationsSection />
        <PsychotherapyInsightsContainer />
        <PsychotherapyCallToActionSection topicSlug={psychotherapyTopic.slug} />
      </main>
      
      <Footer />
    </div>
  );
};

export default EffectivenessPsychotherapy;
