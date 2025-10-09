
import React from 'react';
import { getTopicIdFromSlug } from '@/utils/topicMapping';
import { Thermometer, Wind, Droplets, TreePine } from 'lucide-react';
import TopicPageLayout from '@/components/layout/TopicPageLayout';
import TopicHeroSection from '@/components/topics/TopicHeroSection';
import TopicDescriptionSection from '@/components/topics/TopicDescriptionSection';
import TopicContentSection from '@/components/topics/TopicContentSection';
import TopicVisualizationsSection from '@/components/topics/TopicVisualizationsSection';
import DynamicVisualizationsSection from '@/components/topics/DynamicVisualizationsSection';
import VisualizationsSection from '@/components/climate/VisualizationsSection';
import TopicCallToActionSection from '@/components/topics/TopicCallToActionSection';
import DatabaseInsightsContainer from '@/components/database/DatabaseInsightsContainer';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useTopicSections } from '@/hooks/useTopicSections';
import { useTopicPublications } from '@/hooks/useTopicPublications';
import { useTopicContentCards } from '@/hooks/useTopicContentCards';

const ClimateChange = () => {
  const topicId = getTopicIdFromSlug('climate-change');
  
  if (!topicId) {
    return (
      <TopicPageLayout>
        <div className="container mx-auto px-4 text-center py-12">
          <h1 className="text-3xl font-serif font-bold mb-4">Topic not found</h1>
          <p className="mb-6">We couldn't find information about the Climate Change topic.</p>
        </div>
      </TopicPageLayout>
    );
  }

  const { sections, loading: sectionsLoading } = useTopicSections(topicId);
  const { keyPublications, loading: publicationsLoading } = useTopicPublications(topicId);
  const { cards, loading: cardsLoading } = useTopicContentCards(topicId);

  if (sectionsLoading || publicationsLoading || cardsLoading) {
    return (
      <TopicPageLayout>
        <LoadingSpinner message="Loading page content..." />
      </TopicPageLayout>
    );
  }

  // Get sections by type
  const heroSection = sections.find(s => s.section_type === 'hero');
  const descriptionSection = sections.find(s => s.section_type === 'description');
  const contentSection = sections.find(s => s.section_type === 'content');
  const callToActionSection = sections.find(s => s.section_type === 'call_to_action');

  // Convert database cards to component format
  const climateCards = cards.map(card => {
    const getIcon = (iconName: string | null) => {
      switch (iconName) {
        case 'Thermometer': return <Thermometer className={`h-8 w-8 ${card.icon_color || 'text-red-500'}`} />;
        case 'Wind': return <Wind className={`h-8 w-8 ${card.icon_color || 'text-blue-500'}`} />;
        case 'Droplets': return <Droplets className={`h-8 w-8 ${card.icon_color || 'text-blue-400'}`} />;
        case 'TreePine': return <TreePine className={`h-8 w-8 ${card.icon_color || 'text-green-500'}`} />;
        default: return <Thermometer className={`h-8 w-8 ${card.icon_color || 'text-red-500'}`} />;
      }
    };

    return {
      title: card.title,
      icon: getIcon(card.icon_name),
      description: card.description
    };
  });

  return (
    <TopicPageLayout>
      {heroSection && (
        <TopicHeroSection 
          topic={{
            id: 'climate-change',
            title: heroSection.title || 'Climate Change',
            slug: 'climate-change',
            description: heroSection.description || '',
            consensusLevel: 'high' as const,
            consensusPercentage: 97,
            contributorsCount: 240,
            sourcesCount: keyPublications.length,
            updatedAt: new Date().toISOString(),
            tags: ['Climate Science', 'Environment', 'Policy']
          }}
          title={heroSection.title || 'Climate Change'}
          categoryIcon={Thermometer}
          categoryLabel={heroSection.category_label || 'Climate Science'}
          keyPublications={keyPublications.map(pub => ({
            id: pub.id,
            title: pub.title,
            authors: pub.authors,
            year: pub.year,
            url: pub.url,
            doi: pub.doi || undefined,
            publication: pub.publication || undefined
          }))}
        />
      )}
      
      {descriptionSection && (
        <TopicDescriptionSection 
          title={descriptionSection.title || 'Understanding Climate Change'}
          description={descriptionSection.description || ''}
          additionalContent={descriptionSection.additional_content ? (
            <p className="text-base text-muted-foreground leading-relaxed">
              {descriptionSection.additional_content}
            </p>
          ) : undefined}
        />
      )}
      
      {contentSection && climateCards.length > 0 && (
        <TopicContentSection 
          title={contentSection.title || 'Climate Science Evidence'}
          subtitle={contentSection.subtitle || 'Scientific Foundation'}
          description={contentSection.description || 'Evidence-based research on climate change.'}
          cards={climateCards}
        />
      )}
      
      <TopicVisualizationsSection>
        <DynamicVisualizationsSection topicId={topicId} />
      </TopicVisualizationsSection>
      
      <VisualizationsSection />
      
      <DatabaseInsightsContainer topicId={topicId} keyPublications={keyPublications.map(pub => ({
        id: pub.id,
        title: pub.title,
        authors: pub.authors,
        year: pub.year,
        url: pub.url,
        doi: pub.doi || undefined,
        publication: pub.publication || undefined
      }))} />
      
      {callToActionSection && (
        <TopicCallToActionSection 
          topicSlug="climate-change"
          title={callToActionSection.title || 'Join the Climate Research Community'}
          description={callToActionSection.description || 'Help advance climate science research.'}
        />
      )}
    </TopicPageLayout>
  );
};

export default ClimateChange;
