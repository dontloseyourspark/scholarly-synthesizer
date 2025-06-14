
import React from 'react';
import { getTopicIdFromSlug } from '@/utils/topicMapping';
import { Cpu, Zap, Lock } from 'lucide-react';
import TopicPageLayout from '@/components/layout/TopicPageLayout';
import TopicHeroSection from '@/components/topics/TopicHeroSection';
import TopicDescriptionSection from '@/components/topics/TopicDescriptionSection';
import TopicContentSection from '@/components/topics/TopicContentSection';
import TopicVisualizationsSection from '@/components/topics/TopicVisualizationsSection';
import DynamicVisualizationsSection from '@/components/topics/DynamicVisualizationsSection';
import TopicCallToActionSection from '@/components/topics/TopicCallToActionSection';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useTopicSections } from '@/hooks/useTopicSections';
import { useTopicPublications } from '@/hooks/useTopicPublications';
import { useTopicContentCards } from '@/hooks/useTopicContentCards';

const QuantumComputing = () => {
  const topicId = getTopicIdFromSlug('quantum-computing');
  
  if (!topicId) {
    return (
      <TopicPageLayout>
        <div className="container mx-auto px-4 text-center py-12">
          <h1 className="text-3xl font-serif font-bold mb-4">Topic not found</h1>
          <p className="mb-6">We couldn't find information about the Quantum Computing topic.</p>
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
  const quantumCards = cards.map(card => {
    // Map icon names to actual icon components
    const getIcon = (iconName: string | null) => {
      switch (iconName) {
        case 'Zap': return <Zap className={`h-8 w-8 ${card.icon_color || 'text-yellow-500'}`} />;
        case 'Lock': return <Lock className={`h-8 w-8 ${card.icon_color || 'text-red-500'}`} />;
        case 'Cpu': return <Cpu className={`h-8 w-8 ${card.icon_color || 'text-blue-500'}`} />;
        case 'Atom': return <div className={`h-8 w-8 ${card.icon_color || 'text-purple-500'} flex items-center justify-center font-bold text-lg`}>⚛️</div>;
        default: return <Cpu className={`h-8 w-8 ${card.icon_color || 'text-blue-500'}`} />;
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
            id: 'quantum-computing',
            title: heroSection.title || 'Quantum Computing',
            slug: 'quantum-computing',
            description: heroSection.description || '',
            consensusLevel: 'high' as const,
            consensusPercentage: 92,
            contributorsCount: 90,
            sourcesCount: keyPublications.length,
            updatedAt: new Date().toISOString(),
            tags: ['Physics', 'Computer Science', 'Technology']
          }}
          title={heroSection.title || 'Quantum Computing'}
          categoryIcon={Cpu}
          categoryLabel={heroSection.category_label || 'Technology Topics'}
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
          title={descriptionSection.title || 'Understanding Quantum Computing'}
          description={descriptionSection.description || ''}
          additionalContent={descriptionSection.additional_content ? (
            <p className="text-base text-muted-foreground leading-relaxed">
              {descriptionSection.additional_content}
            </p>
          ) : undefined}
        />
      )}
      
      {contentSection && quantumCards.length > 0 && (
        <TopicContentSection 
          title={contentSection.title || 'Quantum Applications'}
          subtitle={contentSection.subtitle || 'Potential Applications'}
          description={contentSection.description || 'Quantum computing applications and research.'}
          cards={quantumCards}
        />
      )}
      
      <TopicVisualizationsSection>
        <DynamicVisualizationsSection topicId={topicId} />
      </TopicVisualizationsSection>
      
      {callToActionSection && (
        <TopicCallToActionSection 
          topicSlug="quantum-computing"
          title={callToActionSection.title || 'Explore Quantum Future'}
          description={callToActionSection.description || 'Help advance quantum computing research.'}
        />
      )}
    </TopicPageLayout>
  );
};

export default QuantumComputing;
