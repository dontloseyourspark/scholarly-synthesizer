
import React from 'react';
import { BookOpen, Users, TrendingUp, FileText } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: "Expert Insights",
    description: "Contributions from verified scholars with relevant expertise."
  },
  {
    icon: TrendingUp,
    title: "Consensus Visualization",
    description: "Clear indicators of agreement levels on key claims within topics."
  },
  {
    icon: FileText,
    title: "Source Verification",
    description: "All insights backed by peer-reviewed sources and quality evidence."
  },
  {
    icon: Users,
    title: "Community Feedback",
    description: "Scholars and readers can vote on and discuss contributions."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-scholarly-lightGray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-center mb-12">How ScholarSphere Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-scholarly-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-scholarly-blue" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
