
import React from 'react';
import { Clock } from 'lucide-react';

const DescriptionSection = ({ description }: { description: string }) => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-serif font-bold mb-6">Understanding Human Evolution</h2>
        
        <p className="text-lg mb-8">{description}</p>
        
        <div className="bg-scholarly-lightGray p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Clock className="h-5 w-5 mr-2 text-scholarly-blue" />
            <h3 className="text-xl font-medium">Timeline of Human Evolution</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex">
              <div className="w-24 font-bold">7-6 MYA</div>
              <div>
                <span className="font-medium">Human-Chimp Divergence</span>
                <p className="text-sm text-gray-600">Molecular evidence indicates humans and chimpanzees diverged from a common ancestor</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-24 font-bold">4-2 MYA</div>
              <div>
                <span className="font-medium">Early Australopithecines</span>
                <p className="text-sm text-gray-600">Bipedal hominins like A. afarensis ("Lucy") emerge in Africa</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-24 font-bold">2.8 MYA</div>
              <div>
                <span className="font-medium">Earliest Homo</span>
                <p className="text-sm text-gray-600">First evidence of the genus Homo appears</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-24 font-bold">1.9 MYA</div>
              <div>
                <span className="font-medium">Homo erectus</span>
                <p className="text-sm text-gray-600">First human species to migrate out of Africa</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-24 font-bold">500-30 KYA</div>
              <div>
                <span className="font-medium">Neanderthals</span>
                <p className="text-sm text-gray-600">Thrived in Europe and Western Asia, eventually overlapping with Homo sapiens</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-24 font-bold">300 KYA</div>
              <div>
                <span className="font-medium">Homo sapiens emerge</span>
                <p className="text-sm text-gray-600">First anatomically modern humans appear in Africa</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="w-24 font-bold">70-50 KYA</div>
              <div>
                <span className="font-medium">Out of Africa migration</span>
                <p className="text-sm text-gray-600">Modern humans disperse from Africa to other continents</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DescriptionSection;
