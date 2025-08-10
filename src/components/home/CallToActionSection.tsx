
import React from 'react';
import { Button } from '@/components/ui/button';

const CallToActionSection = () => {
  return (
    <section className="py-20 bg-scholarly-blue text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-serif font-bold mb-6">Are You a Scholar?</h2>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          Contribute your expertise to help build a clearer picture of scholarly consensus.
          Share insights backed by evidence and engage with other experts.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-white text-scholarly-blue hover:bg-scholarly-lightGray">
            Learn About Contributing
          </Button>
          <Button variant="outline" className="bg-transparent border border-white text-white hover:bg-white hover:text-scholarly-blue hover:border-white transition-colors">
            Sign In as Scholar
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
