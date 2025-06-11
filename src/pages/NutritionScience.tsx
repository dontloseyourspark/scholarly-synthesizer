
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getTopic } from '@/data/topicsData';
import NutritionHeroSection from '@/components/nutrition/NutritionHeroSection';
import NutritionDescriptionSection from '@/components/nutrition/NutritionDescriptionSection';
import NutritionEvidenceSection from '@/components/nutrition/NutritionEvidenceSection';
import NutritionVisualizationsSection from '@/components/nutrition/NutritionVisualizationsSection';
import NutritionCallToActionSection from '@/components/nutrition/NutritionCallToActionSection';
import NutritionInsightsContainer from '@/components/nutrition/NutritionInsightsContainer';

const NutritionScience = () => {
  const nutritionTopic = getTopic('nutrition-science');
  
  if (!nutritionTopic) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-scholarly-lightGray py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">Topic data not found</h1>
            <p className="mb-6">We couldn't find information about the Nutrition Science topic.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-scholarly-lightGray pb-16">
        <NutritionHeroSection topic={nutritionTopic} />
        <NutritionDescriptionSection description={nutritionTopic.description} />
        <NutritionEvidenceSection />
        <NutritionVisualizationsSection />
        <NutritionInsightsContainer />
        <NutritionCallToActionSection topicSlug={nutritionTopic.slug} />
      </main>
      
      <Footer />
    </div>
  );
};

export default NutritionScience;
