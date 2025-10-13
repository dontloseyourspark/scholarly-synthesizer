
import React from 'react';
import { getTopicIdFromSlug } from '@/utils/topicMapping';
import { TrendingUp, Users, DollarSign, BarChart } from 'lucide-react';
import TopicPageLayout from '@/components/layout/TopicPageLayout';
import TopicHeroSection from '@/components/topics/TopicHeroSection';
import TopicDescriptionSection from '@/components/topics/TopicDescriptionSection';
import TopicContentSection from '@/components/topics/TopicContentSection';
import TopicVisualizationsSection from '@/components/topics/TopicVisualizationsSection';
import DynamicVisualizationsSection from '@/components/topics/DynamicVisualizationsSection';
import EconomicVisualizationsSection from '@/components/economic/EconomicVisualizationsSection';
import TopicCallToActionSection from '@/components/topics/TopicCallToActionSection';
import DatabaseInsightsContainer from '@/components/database/DatabaseInsightsContainer';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useTopicSections } from '@/hooks/useTopicSections';
import { useTopicPublications } from '@/hooks/useTopicPublications';
import { useTopicContentCards } from '@/hooks/useTopicContentCards';

const EconomicImpactsImmigration = () => {
  const topicId = getTopicIdFromSlug('economic-impacts-immigration');
  
  if (!topicId) {
    return (
      <TopicPageLayout>
        <div className="container mx-auto px-4 text-center py-12">
          <h1 className="text-3xl font-serif font-bold mb-4">Topic not found</h1>
          <p className="mb-6">We couldn't find information about the Economic Impacts of Immigration topic.</p>
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
  const economicCards = cards.map(card => {
    const getIcon = (iconName: string | null) => {
      switch (iconName) {
        case 'TrendingUp': return <TrendingUp className={`h-8 w-8 ${card.icon_color || 'text-green-500'}`} />;
        case 'Users': return <Users className={`h-8 w-8 ${card.icon_color || 'text-blue-500'}`} />;
        case 'DollarSign': return <DollarSign className={`h-8 w-8 ${card.icon_color || 'text-green-600'}`} />;
        case 'BarChart': return <BarChart className={`h-8 w-8 ${card.icon_color || 'text-purple-500'}`} />;
        default: return <TrendingUp className={`h-8 w-8 ${card.icon_color || 'text-green-500'}`} />;
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
            id: 'economic-impacts-immigration',
            title: heroSection.title || 'Economic Impacts of Immigration',
            slug: 'economic-impacts-immigration',
            description: heroSection.description || '',
            consensusLevel: 'medium' as const,
            consensusPercentage: 75,
            contributorsCount: 195,
            sourcesCount: keyPublications.length,
            updatedAt: new Date().toISOString(),
            tags: ['Economics', 'Immigration', 'Policy']
          }}
          title={heroSection.title || 'Economic Impacts of Immigration'}
          categoryIcon={TrendingUp}
          categoryLabel={heroSection.category_label || 'Economics'}
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
          title={descriptionSection.title || 'Understanding Economic Impacts'}
          description={descriptionSection.description || ''}
          additionalContent={descriptionSection.additional_content ? (
            <p className="text-base text-muted-foreground leading-relaxed">
              {descriptionSection.additional_content}
            </p>
          ) : undefined}
        />
      )}
      
      {contentSection && economicCards.length > 0 && (
        <TopicContentSection 
          title={contentSection.title || 'Economic Research'}
          subtitle={contentSection.subtitle || 'Policy Analysis'}
          description={contentSection.description || 'Research on immigration and economic outcomes.'}
          cards={economicCards}
        />
      )}
      
      {/* <TopicVisualizationsSection>
        <DynamicVisualizationsSection topicId={topicId} />
      </TopicVisualizationsSection> */}
      
      <EconomicVisualizationsSection />
      
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
          topicSlug="economic-impacts-immigration"
          title={callToActionSection.title || 'Advance Economic Research'}
          description={callToActionSection.description || 'Help inform evidence-based immigration policy.'}
        />
      )}
    </TopicPageLayout>
  );
};

export default EconomicImpactsImmigration;
