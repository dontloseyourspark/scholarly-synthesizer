
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { getTopic } from '@/data/topicsData';

// Import refactored components
import HeroSection from '@/components/climate/HeroSection';
import DescriptionSection from '@/components/climate/DescriptionSection';
import EffectsSection from '@/components/climate/EffectsSection';
import VisualizationsSection from '@/components/climate/VisualizationsSection';
import CallToActionSection from '@/components/climate/CallToActionSection';

const ClimateChange = () => {
  // Get the climate change topic data
  const climateChangeTopic = getTopic('climate-change');
  
  if (!climateChangeTopic) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-scholarly-lightGray py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">Topic data not found</h1>
            <p className="mb-6">We couldn't find information about the Climate Change topic.</p>
            <Button asChild>
              <Link to="/topics">Browse All Topics</Link>
            </Button>
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
        <HeroSection topic={climateChangeTopic} />
        <DescriptionSection description={climateChangeTopic.description} />
        <EffectsSection />
        <VisualizationsSection />
        <CallToActionSection topicSlug={climateChangeTopic.slug} />
      </main>
      
      <Footer />
    </div>
  );
};

export default ClimateChange;
