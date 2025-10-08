
import React from 'react';
import { getTopicIdFromSlug } from '@/utils/topicMapping';
import { Brain, Heart, Users, TrendingUp } from 'lucide-react';
import TopicPageLayout from '@/components/layout/TopicPageLayout';
import TopicHeroSection from '@/components/topics/TopicHeroSection';
import TopicDescriptionSection from '@/components/topics/TopicDescriptionSection';
import TopicContentSection from '@/components/topics/TopicContentSection';
import TopicVisualizationsSection from '@/components/topics/TopicVisualizationsSection';
import DynamicVisualizationsSection from '@/components/topics/DynamicVisualizationsSection';
import PsychotherapyVisualizationsSection from '@/components/psychotherapy/PsychotherapyVisualizationsSection';
import TopicCallToActionSection from '@/components/topics/TopicCallToActionSection';
import DatabaseInsightsContainer from '@/components/database/DatabaseInsightsContainer';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useTopicSections } from '@/hooks/useTopicSections';
import { useTopicPublications } from '@/hooks/useTopicPublications';
import { useTopicContentCards } from '@/hooks/useTopicContentCards';

const EffectivenessPsychotherapy = () => {
  const topicId = getTopicIdFromSlug('effectiveness-psychotherapy');
  
  if (!topicId) {
    return (
      <TopicPageLayout>
        <div className="container mx-auto px-4 text-center py-12">
          <h1 className="text-3xl font-serif font-bold mb-4">Topic not found</h1>
          <p className="mb-6">We couldn't find information about the Effectiveness of Psychotherapy topic.</p>
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
  const psychotherapyCards = cards.map(card => {
    // Map icon names to actual icon components
    const getIcon = (iconName: string | null) => {
      switch (iconName) {
        case 'Brain': return <Brain className={`h-8 w-8 ${card.icon_color || 'text-blue-500'}`} />;
        case 'Heart': return <Heart className={`h-8 w-8 ${card.icon_color || 'text-red-500'}`} />;
        case 'Users': return <Users className={`h-8 w-8 ${card.icon_color || 'text-green-500'}`} />;
        case 'TrendingUp': return <TrendingUp className={`h-8 w-8 ${card.icon_color || 'text-purple-500'}`} />;
        default: return <Brain className={`h-8 w-8 ${card.icon_color || 'text-blue-500'}`} />;
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
            id: 'effectiveness-psychotherapy',
            title: heroSection.title || 'Effectiveness of Psychotherapy',
            slug: 'effectiveness-psychotherapy',
            description: heroSection.description || '',
            consensusLevel: 'high' as const,
            consensusPercentage: 92.5,
            contributorsCount: 160,
            sourcesCount: keyPublications.length,
            updatedAt: new Date().toISOString(),
            tags: ['Psychology', 'Mental Health', 'Medicine']
          }}
          title={heroSection.title || 'Effectiveness of Psychotherapy'}
          categoryIcon={Brain}
          categoryLabel={heroSection.category_label || 'Psychology'}
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
          title={descriptionSection.title || 'Understanding Psychotherapy Effectiveness'}
          description={descriptionSection.description || ''}
          additionalContent={descriptionSection.additional_content ? (
            <p className="text-base text-muted-foreground leading-relaxed">
              {descriptionSection.additional_content}
            </p>
          ) : undefined}
        />
      )}
      
      {contentSection && psychotherapyCards.length > 0 && (
        <TopicContentSection 
          title={contentSection.title || 'Therapeutic Methods'}
          subtitle={contentSection.subtitle || 'Evidence-Based Approaches'}
          description={contentSection.description || 'Research on psychotherapy effectiveness.'}
          cards={psychotherapyCards}
        />
      )}
      
<TopicVisualizationsSection>
        <DynamicVisualizationsSection topicId={topicId} />
        <PsychotherapyVisualizationsSection />
      </TopicVisualizationsSection>
      
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
          topicSlug="effectiveness-psychotherapy"
          title={callToActionSection.title || 'Support Mental Health Research'}
          description={callToActionSection.description || 'Help advance psychotherapy research.'}
        />
      )}
    </TopicPageLayout>
  );
};

export default EffectivenessPsychotherapy;
