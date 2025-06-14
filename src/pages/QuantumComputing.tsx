
import React from 'react';
import { getTopic } from '@/data/topicsData';
import { Cpu } from 'lucide-react';
import TopicPageLayout from '@/components/layout/TopicPageLayout';
import TopicHeroSection from '@/components/topics/TopicHeroSection';
import TopicDescriptionSection from '@/components/topics/TopicDescriptionSection';
import TopicContentSection from '@/components/topics/TopicContentSection';
import TopicVisualizationsSection from '@/components/topics/TopicVisualizationsSection';
import QuantumVisualizationsSection from '@/components/quantum/QuantumVisualizationsSection';
import TopicCallToActionSection from '@/components/topics/TopicCallToActionSection';
import QuantumInsightsContainer from '@/components/quantum/QuantumInsightsContainer';

const QuantumComputing = () => {
  const quantumTopic = getTopic('quantum-computing');
  
  if (!quantumTopic) {
    return (
      <TopicPageLayout>
        <div className="container mx-auto px-4 text-center py-12">
          <h1 className="text-3xl font-serif font-bold mb-4">Topic data not found</h1>
          <p className="mb-6">We couldn't find information about the Quantum Computing topic.</p>
        </div>
      </TopicPageLayout>
    );
  }

  return (
    <TopicPageLayout>
      <TopicHeroSection 
        topic={quantumTopic}
        title="Quantum Computing"
        categoryIcon={Cpu}
        categoryLabel="Technology Topics"
        keyPublications={[]}
      />
      <TopicDescriptionSection 
        title="Understanding Quantum Computing"
        description={quantumTopic.description}
      />
      <TopicContentSection 
        title="Quantum Applications"
        subtitle="Potential Applications"
        description="Quantum computing applications in cryptography, optimization, simulation, and machine learning."
      />
      <TopicVisualizationsSection>
        <QuantumVisualizationsSection />
      </TopicVisualizationsSection>
      <QuantumInsightsContainer />
      <TopicCallToActionSection topicSlug={quantumTopic.slug} />
    </TopicPageLayout>
  );
};

export default QuantumComputing;
