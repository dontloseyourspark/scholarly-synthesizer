
import React from 'react';
import { getTopicIdFromSlug } from '@/utils/topicMapping';
import { Brain, Shield, AlertTriangle, Zap } from 'lucide-react';
import TopicPageLayout from '@/components/layout/TopicPageLayout';
import TopicHeroSection from '@/components/topics/TopicHeroSection';
import TopicDescriptionSection from '@/components/topics/TopicDescriptionSection';
import TopicContentSection from '@/components/topics/TopicContentSection';
import TopicVisualizationsSection from '@/components/topics/TopicVisualizationsSection';
import DynamicVisualizationsSection from '@/components/topics/DynamicVisualizationsSection';
import AISafetyVisualizationsSection from '@/components/ai-safety/AISafetyVisualizationsSection';
import TopicCallToActionSection from '@/components/topics/TopicCallToActionSection';
import DatabaseInsightsContainer from '@/components/database/DatabaseInsightsContainer';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useTopicSections } from '@/hooks/useTopicSections';
import { useTopicPublications } from '@/hooks/useTopicPublications';
import { useTopicContentCards } from '@/hooks/useTopicContentCards';

const AISafety = () => {
  const topicId = getTopicIdFromSlug('artificial-intelligence-safety');
  
  if (!topicId) {
    return (
      <TopicPageLayout>
        <div className="container mx-auto px-4 text-center py-12">
          <h1 className="text-3xl font-serif font-bold mb-4">Topic not found</h1>
          <p className="mb-6">We couldn't find information about the AI Safety topic.</p>
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
  const aiSafetyCards = cards.map(card => {
    const getIcon = (iconName: string | null) => {
      switch (iconName) {
        case 'Brain': return <Brain className={`h-8 w-8 ${card.icon_color || 'text-blue-500'}`} />;
        case 'Shield': return <Shield className={`h-8 w-8 ${card.icon_color || 'text-green-500'}`} />;
        case 'AlertTriangle': return <AlertTriangle className={`h-8 w-8 ${card.icon_color || 'text-yellow-500'}`} />;
        case 'Zap': return <Zap className={`h-8 w-8 ${card.icon_color || 'text-purple-500'}`} />;
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
            id: 'artificial-intelligence-safety',
            title: heroSection.title || 'Artificial Intelligence Safety',
            slug: 'artificial-intelligence-safety',
            description: heroSection.description || '',
            consensusLevel: 'medium' as const,
            consensusPercentage: 78,
            contributorsCount: 180,
            sourcesCount: keyPublications.length,
            updatedAt: new Date().toISOString(),
            tags: ['AI', 'Safety', 'Technology']
          }}
          title={heroSection.title || 'Artificial Intelligence Safety'}
          categoryIcon={Brain}
          categoryLabel={heroSection.category_label || 'AI Research'}
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
          title={descriptionSection.title || 'Understanding AI Safety'}
          description={descriptionSection.description || ''}
          additionalContent={descriptionSection.additional_content ? (
            <p className="text-base text-muted-foreground leading-relaxed">
              {descriptionSection.additional_content}
            </p>
          ) : undefined}
        />
      )}
      
      {contentSection && aiSafetyCards.length > 0 && (
        <TopicContentSection 
          title={contentSection.title || 'AI Safety Research'}
          subtitle={contentSection.subtitle || 'Key Research Areas'}
          description={contentSection.description || 'Research on AI safety and alignment.'}
          cards={aiSafetyCards}
        />
      )}
      
      <TopicVisualizationsSection>
        <DynamicVisualizationsSection topicId={topicId} />
        <AISafetyVisualizationsSection />
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
          topicSlug="artificial-intelligence-safety"
          title={callToActionSection.title || 'Advance AI Safety Research'}
          description={callToActionSection.description || 'Help ensure AI systems remain safe and beneficial.'}
        />
      )}
    </TopicPageLayout>
  );
};

export default AISafety;
