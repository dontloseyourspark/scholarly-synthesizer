
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const DescriptionSection = ({ description }: { description: string }) => {
  return (
    <section className="container mx-auto px-4 py-10">
      <Card className="border-none shadow-lg">
        <CardContent className="p-6 md:p-8">
          <p className="text-lg mb-6">
            {description}
          </p>
          <p className="text-lg mb-4">
            Climate change refers to long-term shifts in temperatures and weather patterns. These shifts may be natural, 
            such as through variations in the solar cycle. However, since the 1800s, human activities have been the main driver of climate change, 
            primarily due to burning fossil fuels like coal, oil and gas, which produces heat-trapping gases.
          </p>
          <p className="text-lg">
            The scientific consensus on climate change is clear: it is real, it is caused by humans, and its impacts are already being felt 
            worldwide. The Intergovernmental Panel on Climate Change (IPCC) has concluded with over 95% certainty that human influence 
            has been the dominant cause of observed warming since the mid-20th century.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default DescriptionSection;
