
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Shield, Target, Users } from 'lucide-react';

const AISafetyRisksSection = () => {
  const riskAreas = [
    {
      icon: AlertTriangle,
      title: "Alignment Problem",
      description: "Ensuring AI systems pursue intended goals without harmful side effects or misinterpretation."
    },
    {
      icon: Shield,
      title: "Robustness & Security",
      description: "Protecting AI systems from adversarial attacks and ensuring reliable performance."
    },
    {
      icon: Target,
      title: "Value Learning",
      description: "Teaching AI systems to understand and optimize for human values and preferences."
    },
    {
      icon: Users,
      title: "Societal Impact",
      description: "Managing the broader effects of AI on employment, privacy, and social structures."
    }
  ];

  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-serif font-bold text-center mb-8">Key Risk Areas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {riskAreas.map((risk, index) => (
          <Card key={index} className="text-center">
            <CardHeader className="pb-2">
              <div className="mx-auto w-12 h-12 bg-scholarly-blue/10 rounded-full flex items-center justify-center mb-2">
                <risk.icon className="h-6 w-6 text-scholarly-blue" />
              </div>
              <CardTitle className="text-lg">{risk.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{risk.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default AISafetyRisksSection;
