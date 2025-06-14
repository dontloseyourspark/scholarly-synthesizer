
import React from 'react';
import SearchBar from '@/components/SearchBar';

const TopicsHeader = () => {
  return (
    <section className="bg-scholarly-blue py-12 mb-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-serif font-bold text-white mb-4">Browse Topics</h1>
        <p className="text-scholarly-lightGray max-w-3xl mb-6">
          Explore scholarly consensus across a wide range of fields, from climate science to medicine, 
          technology, and social sciences.
        </p>
        <SearchBar />
      </div>
    </section>
  );
};

export default TopicsHeader;
