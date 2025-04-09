
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ThermometerSun, Cloud, Wind, TreePine } from 'lucide-react';
import { climateEffects } from '@/data/climateChangeData';

const EffectsSection = () => {
  const getIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'ThermometerSun':
        return <ThermometerSun className={`h-8 w-8 ${className}`} />;
      case 'Cloud':
        return <Cloud className={`h-8 w-8 ${className}`} />;
      case 'Wind':
        return <Wind className={`h-8 w-8 ${className}`} />;
      case 'TreePine':
        return <TreePine className={`h-8 w-8 ${className}`} />;
      default:
        return null;
    }
  };

  return (
    <section className="container mx-auto px-4 py-6">
      <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">Key Effects of Climate Change</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {climateEffects.map((effect, index) => (
          <Card key={index} className="border-none shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="mb-4">
                {getIcon(effect.icon, effect.iconColor)}
              </div>
              <h3 className="text-xl font-medium mb-2">{effect.title}</h3>
              <p className="text-muted-foreground">{effect.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default EffectsSection;
