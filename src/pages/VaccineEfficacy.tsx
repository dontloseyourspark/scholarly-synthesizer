
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getTopic } from '@/data/topicsData';
import VaccineHeroSection from '@/components/vaccine/VaccineHeroSection';
import VaccineDescriptionSection from '@/components/vaccine/VaccineDescriptionSection';
import VaccineEvidenceSection from '@/components/vaccine/VaccineEvidenceSection';
import VaccineVisualizationsSection from '@/components/vaccine/VaccineVisualizationsSection';
import VaccineCallToActionSection from '@/components/vaccine/VaccineCallToActionSection';
import VaccineInsightsContainer from '@/components/vaccine/VaccineInsightsContainer';

const VaccineEfficacy = () => {
  const vaccineTopic = getTopic('vaccine-efficacy');
  
  if (!vaccineTopic) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-scholarly-lightGray py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">Topic data not found</h1>
            <p className="mb-6">We couldn't find information about the Vaccine Efficacy topic.</p>
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
        <VaccineHeroSection topic={vaccineTopic} />
        <VaccineDescriptionSection description={vaccineTopic.description} />
        <VaccineEvidenceSection />
        <VaccineVisualizationsSection />
        <VaccineInsightsContainer />
        <VaccineCallToActionSection topicSlug={vaccineTopic.slug} />
      </main>
      
      <Footer />
    </div>
  );
};

export default VaccineEfficacy;
