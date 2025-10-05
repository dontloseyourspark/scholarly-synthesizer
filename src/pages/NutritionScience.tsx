
import React from 'react';
import { getTopicIdFromSlug } from '@/utils/topicMapping';
import { Apple, Heart, TrendingUp, Users } from 'lucide-react';
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

const NutritionScience = () => {
  const topicId = getTopicIdFromSlug('nutrition-science');
  
  if (!topicId) {
    return (
      <TopicPageLayout>
        <div className="container mx-auto px-4 text-center py-12">
          <h1 className="text-3xl font-serif font-bold mb-4">Topic not found</h1>
          <p className="mb-6">We couldn't find information about the Nutrition Science topic.</p>
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
  const nutritionCards = cards.map(card => {
    const getIcon = (iconName: string | null) => {
      switch (iconName) {
        case 'Apple': return <Apple className={`h-8 w-8 ${card.icon_color || 'text-green-500'}`} />;
        case 'Heart': return <Heart className={`h-8 w-8 ${card.icon_color || 'text-red-500'}`} />;
        case 'TrendingUp': return <TrendingUp className={`h-8 w-8 ${card.icon_color || 'text-blue-500'}`} />;
        case 'Users': return <Users className={`h-8 w-8 ${card.icon_color || 'text-purple-500'}`} />;
        default: return <Apple className={`h-8 w-8 ${card.icon_color || 'text-green-500'}`} />;
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
            id: 'nutrition-science',
            title: heroSection.title || 'Nutrition Science',
            slug: 'nutrition-science',
            description: heroSection.description || '',
            consensusLevel: 'high' as const,
            consensusPercentage: 75,
            contributorsCount: 210,
            sourcesCount: keyPublications.length,
            updatedAt: new Date().toISOString(),
            tags: ['Nutrition', 'Health', 'Medicine']
          }}
          title={heroSection.title || 'Nutrition Science'}
          categoryIcon={Apple}
          categoryLabel={heroSection.category_label || 'Health Sciences'}
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
          title={descriptionSection.title || 'Understanding Nutrition Science'}
          description={descriptionSection.description || ''}
          additionalContent={descriptionSection.additional_content ? (
            <p className="text-base text-muted-foreground leading-relaxed">
              {descriptionSection.additional_content}
            </p>
          ) : undefined}
        />
      )}
      
      {contentSection && nutritionCards.length > 0 && (
        <TopicContentSection 
          title={contentSection.title || 'Nutritional Research'}
          subtitle={contentSection.subtitle || 'Evidence-Based Guidelines'}
          description={contentSection.description || 'Research on nutrition and health outcomes.'}
          cards={nutritionCards}
        />
      )}
      
      <TopicVisualizationsSection>
        <DynamicVisualizationsSection topicId={topicId} />
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
          topicSlug="nutrition-science"
          title={callToActionSection.title || 'Advance Nutrition Research'}
          description={callToActionSection.description || 'Help improve global health through nutrition science.'}
        />
      )}
    </TopicPageLayout>
  );
};

export default NutritionScience;
