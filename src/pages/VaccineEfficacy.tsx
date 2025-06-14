
import React from 'react';
import { getTopic } from '@/data/topicsData';
import { Shield } from 'lucide-react';
import TopicPageLayout from '@/components/layout/TopicPageLayout';
import TopicHeroSection from '@/components/topics/TopicHeroSection';
import TopicDescriptionSection from '@/components/topics/TopicDescriptionSection';
import VaccineEvidenceSection from '@/components/vaccine/VaccineEvidenceSection';
import VaccineVisualizationsSection from '@/components/vaccine/VaccineVisualizationsSection';
import TopicCallToActionSection from '@/components/topics/TopicCallToActionSection';
import VaccineInsightsContainer from '@/components/vaccine/VaccineInsightsContainer';
import { vaccinePublications } from '@/data/vaccineData';

const VaccineEfficacy = () => {
  const vaccineTopic = getTopic('vaccine-efficacy');
  
  if (!vaccineTopic) {
    return (
      <TopicPageLayout>
        <div className="container mx-auto px-4 text-center py-12">
          <h1 className="text-3xl font-serif font-bold mb-4">Topic data not found</h1>
          <p className="mb-6">We couldn't find information about the Vaccine Efficacy topic.</p>
        </div>
      </TopicPageLayout>
    );
  }

  const additionalContent = (
    <p className="text-base text-muted-foreground leading-relaxed">
      The scientific consensus on vaccine efficacy is built on decades of rigorous clinical trials, 
      real-world effectiveness studies, and comprehensive safety monitoring systems. Modern vaccines 
      undergo extensive testing phases before approval and continue to be monitored throughout their use.
    </p>
  );

  return (
    <TopicPageLayout>
      <TopicHeroSection 
        topic={vaccineTopic}
        title="Vaccine Efficacy"
        categoryIcon={Shield}
        categoryLabel="Medical Topics"
        keyPublications={vaccinePublications}
      />
      <TopicDescriptionSection 
        title="Understanding Vaccine Efficacy"
        description={vaccineTopic.description}
        additionalContent={additionalContent}
      />
      <VaccineEvidenceSection />
      <VaccineVisualizationsSection />
      <VaccineInsightsContainer />
      <TopicCallToActionSection 
        topicSlug={vaccineTopic.slug}
        title="Contribute to Vaccine Research"
        description="Help advance our understanding of vaccine efficacy by contributing your expertise and insights."
      />
    </TopicPageLayout>
  );
};

export default VaccineEfficacy;
