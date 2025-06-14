
import React from 'react';
import StaticPageLayout from '@/components/layout/StaticPageLayout';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import PopularTopicsSection from '@/components/home/PopularTopicsSection';
import CallToActionSection from '@/components/home/CallToActionSection';

const Index = () => {
  return (
    <StaticPageLayout>
      <HeroSection />
      <FeaturesSection />
      <PopularTopicsSection />
      <CallToActionSection />
    </StaticPageLayout>
  );
};

export default Index;
