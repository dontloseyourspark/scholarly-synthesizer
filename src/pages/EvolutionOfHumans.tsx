
import React from 'react';
import { getTopicIdFromSlug } from '@/utils/topicMapping';
import { Skull, Dna, Users, Clock } from 'lucide-react';
import TopicPageLayout from '@/components/layout/TopicPageLayout';
import TopicHeroSection from '@/components/topics/TopicHeroSection';
import TopicDescriptionSection from '@/components/topics/TopicDescriptionSection';
import TopicContentSection from '@/components/topics/TopicContentSection';
import TopicVisualizationsSection from '@/components/topics/TopicVisualizationsSection';
import DynamicVisualizationsSection from '@/components/topics/DynamicVisualizationsSection';
import TopicCallToActionSection from '@/components/topics/TopicCallToActionSection';
import DatabaseInsightsContainer from '@/components/database/DatabaseInsightsContainer';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useTopicSections } from '@/hooks/useTopicSections';
import { useTopicPublications } from '@/hooks/useTopicPublications';
import { useTopicContentCards } from '@/hooks/useTopicContentCards';
import { Description } from '@radix-ui/react-toast';
import DescriptionSection from '@/components/evolution/DescriptionSection';
import VisualizationsSection from '@/components/evolution/VisualizationsSection';

const EvolutionOfHumans = () => {
  const topicId = getTopicIdFromSlug('evolution-of-humans');
  
  if (!topicId) {
    return (
      <TopicPageLayout>
        <div className="container mx-auto px-4 text-center py-12">
          <h1 className="text-3xl font-serif font-bold mb-4">Topic not found</h1>
          <p className="mb-6">We couldn't find information about the Evolution of Humans topic.</p>
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
  const evolutionCards = cards.map(card => {
    const getIcon = (iconName: string | null) => {
      switch (iconName) {
        case 'Skull': return <Skull className={`h-8 w-8 ${card.icon_color || 'text-brown-500'}`} />;
        case 'Dna': return <Dna className={`h-8 w-8 ${card.icon_color || 'text-blue-500'}`} />;
        case 'Users': return <Users className={`h-8 w-8 ${card.icon_color || 'text-green-500'}`} />;
        case 'Clock': return <Clock className={`h-8 w-8 ${card.icon_color || 'text-purple-500'}`} />;
        default: return <Skull className={`h-8 w-8 ${card.icon_color || 'text-brown-500'}`} />;
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
            id: 'evolution-of-humans',
            title: heroSection.title || 'Evolution of Humans',
            slug: 'evolution-of-humans',
            description: heroSection.description || '',
            consensusLevel: 'high' as const,
            consensusPercentage: 99,
            contributorsCount: 320,
            sourcesCount: keyPublications.length,
            updatedAt: new Date().toISOString(),
            tags: ['Evolution', 'Biology', 'Anthropology']
          }}
          title={heroSection.title || 'Evolution of Humans'}
          categoryIcon={Skull}
          categoryLabel={heroSection.category_label || 'Biology'}
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
          title={descriptionSection.title || 'Understanding Human Evolution'}
          description={descriptionSection.description || ''}
          additionalContent={descriptionSection.additional_content ? (
            <p className="text-base text-muted-foreground leading-relaxed">
              {descriptionSection.additional_content}
            </p>
          ) : undefined}
        />
      )}

      <DescriptionSection description={descriptionSection?.description || ''} />

      
      {contentSection && evolutionCards.length > 0 && (
        <TopicContentSection 
          title={contentSection.title || 'Evolutionary Evidence'}
          subtitle={contentSection.subtitle || 'Scientific Foundation'}
          description={contentSection.description || 'Evidence-based research on human evolution.'}
          cards={evolutionCards}
        />
      )}

      <VisualizationsSection>
        </VisualizationsSection>
      
     {/*  <TopicVisualizationsSection>
        <DynamicVisualizationsSection topicId={topicId} />
      </TopicVisualizationsSection> */}
      
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
          topicSlug="evolution-of-humans"
          title={callToActionSection.title || 'Advance Evolutionary Research'}
          description={callToActionSection.description || 'Help advance our understanding of human origins.'}
        />
      )}
    </TopicPageLayout>
  );
};

export default EvolutionOfHumans;
