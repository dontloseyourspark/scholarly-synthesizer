
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getTopic } from '@/data/topicsData';
import QuantumHeroSection from '@/components/quantum/QuantumHeroSection';
import QuantumDescriptionSection from '@/components/quantum/QuantumDescriptionSection';
import QuantumApplicationsSection from '@/components/quantum/QuantumApplicationsSection';
import QuantumVisualizationsSection from '@/components/quantum/QuantumVisualizationsSection';
import QuantumCallToActionSection from '@/components/quantum/QuantumCallToActionSection';
import QuantumInsightsContainer from '@/components/quantum/QuantumInsightsContainer';

const QuantumComputing = () => {
  const quantumTopic = getTopic('quantum-computing');
  
  if (!quantumTopic) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-scholarly-lightGray py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">Topic data not found</h1>
            <p className="mb-6">We couldn't find information about the Quantum Computing topic.</p>
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
        <QuantumHeroSection topic={quantumTopic} />
        <QuantumDescriptionSection description={quantumTopic.description} />
        <QuantumApplicationsSection />
        <QuantumVisualizationsSection />
        <QuantumInsightsContainer />
        <QuantumCallToActionSection topicSlug={quantumTopic.slug} />
      </main>
      
      <Footer />
    </div>
  );
};

export default QuantumComputing;
