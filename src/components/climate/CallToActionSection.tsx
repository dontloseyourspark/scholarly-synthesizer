import React, { useState } from 'react';

import CallToActionCard from './CallToActionCard';
import InsightsSection from './InsightsSection';

const CallToActionSection = ({ topicSlug }: { topicSlug: string }) => {


  return (
    
      <section className="container mx-auto px-4 py-10">
        <CallToActionCard />
      </section>
    
  );
};

export default CallToActionSection;
