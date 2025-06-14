
import React from 'react';
import SearchBar from '@/components/SearchBar';

const HeroSection = () => {
  return (
    <section className="bg-scholarly-blue text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
          Discover Scholarly Consensus
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-scholarly-lightGray">
          Explore what experts agree on across important topics. 
          See the strength of consensus and dive into insights from leading scholars.
        </p>
        <SearchBar className="mx-auto" />
      </div>
    </section>
  );
};

export default HeroSection;
