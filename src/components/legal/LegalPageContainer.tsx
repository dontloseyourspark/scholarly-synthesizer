
import React from 'react';

interface LegalPageContainerProps {
  title: string;
  children: React.ReactNode;
}

const LegalPageContainer = ({ title, children }: LegalPageContainerProps) => {
  return (
    <div className="bg-scholarly-lightGray py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-serif font-bold mb-8">{title}</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          {children}
          
          <div className="pt-6 border-t text-sm text-gray-500">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPageContainer;
