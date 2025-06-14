
import React from 'react';
import { getTopic } from '@/data/topicsData';
import { Cpu, Zap, Lock, Atom } from 'lucide-react';
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

  const quantumCards = [
    {
      title: "Quantum Supremacy",
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      description: "Demonstrated ability to solve specific problems exponentially faster than classical computers."
    },
    {
      title: "Cryptography",
      icon: <Lock className="h-8 w-8 text-red-500" />,
      description: "Quantum computers could break current encryption methods while enabling quantum-safe cryptography."
    },
    {
      title: "Quantum Processors",
      icon: <Cpu className="h-8 w-8 text-blue-500" />,
      description: "Advanced quantum processors with increasing qubit counts and improved error correction."
    },
    {
      title: "Molecular Simulation",
      icon: <Atom className="h-8 w-8 text-purple-500" />,
      description: "Quantum computers excel at simulating quantum systems for drug discovery and materials science."
    }
  ];

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
        cards={quantumCards}
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
