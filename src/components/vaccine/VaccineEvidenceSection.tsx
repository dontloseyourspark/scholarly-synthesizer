
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, TrendingDown, Users, Award } from 'lucide-react';

const VaccineEvidenceSection = () => {
  const evidencePoints = [
    {
      icon: Shield,
      title: "Clinical Trial Efficacy",
      description: "Large-scale randomized controlled trials demonstrate vaccine effectiveness rates of 70-95% for most vaccines."
    },
    {
      icon: TrendingDown,
      title: "Disease Reduction",
      description: "Historical data shows dramatic reductions in vaccine-preventable diseases following vaccination programs."
    },
    {
      icon: Users,
      title: "Population Protection",
      description: "Herd immunity effects protect vulnerable populations who cannot be vaccinated due to medical conditions."
    },
    {
      icon: Award,
      title: "Safety Profile",
      description: "Comprehensive safety monitoring shows vaccines have excellent safety profiles with rare serious adverse events."
    }
  ];

  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-serif font-bold text-center mb-8">Key Evidence</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {evidencePoints.map((point, index) => (
          <Card key={index} className="text-center">
            <CardHeader className="pb-2">
              <div className="mx-auto w-12 h-12 bg-scholarly-blue/10 rounded-full flex items-center justify-center mb-2">
                <point.icon className="h-6 w-6 text-scholarly-blue" />
              </div>
              <CardTitle className="text-lg">{point.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{point.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default VaccineEvidenceSection;
