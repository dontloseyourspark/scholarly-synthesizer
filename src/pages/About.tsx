
import React from 'react';
import StaticPageLayout from '@/components/layout/StaticPageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <StaticPageLayout>
      {/* Header */}
      <section className="bg-scholarly-blue text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              About ScholarSphere
            </h1>
            <p className="text-lg text-scholarly-lightGray mb-6">
              We're building a platform to help people understand the state of scholarly 
              consensus across important topics, combating misinformation and bridging 
              the gap between academic research and public knowledge.
            </p>
          </div>
        </div>
      </section>
      
      {/* Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">Our Mission</h2>
              <p className="mb-4">
                ScholarSphere was founded with a clear mission: to make scholarly consensus 
                accessible to everyone. In a world where misinformation spreads rapidly, 
                we believe in the importance of providing clear, accurate information about 
                what experts actually agree on.
              </p>
              <p className="mb-4">
                We're building a platform where verified scholars can contribute their expertise, 
                helping to clarify the state of consensus across a wide range of topics. By 
                visualizing agreement and disagreement, we aim to help the public better 
                understand complex issues.
              </p>
              <p>
                Our goal is not to present a single "truth," but rather to accurately represent 
                the distribution of expert views, highlighting where consensus exists and where 
                legitimate scientific debate continues.
              </p>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-scholarly-blue mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-lg mb-2">Represent Scholarly Consensus</h3>
                      <p className="text-muted-foreground">
                        Provide an accurate picture of where experts agree, disagree, 
                        and where questions remain open.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-scholarly-blue mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-lg mb-2">Bridge the Knowledge Gap</h3>
                      <p className="text-muted-foreground">
                        Make scholarly understanding accessible to non-specialists and 
                        the general public.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-scholarly-blue mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-lg mb-2">Combat Misinformation</h3>
                      <p className="text-muted-foreground">
                        Provide a reliable resource to counter misleading claims about 
                        what the science says.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-scholarly-blue mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-lg mb-2">Foster Interdisciplinary Dialogue</h3>
                      <p className="text-muted-foreground">
                        Create spaces for scholars across fields to engage on complex topics 
                        that span multiple disciplines.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="bg-scholarly-blue text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Whether you're a scholar who wants to contribute expertise or simply 
            someone passionate about promoting evidence-based understanding,
            there are many ways to get involved.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-scholarly-blue hover:bg-scholarly-lightGray">
              Contribute as a Scholar
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-scholarly-accent">
              Support Our Work
            </Button>
          </div>
        </div>
      </section>
    </StaticPageLayout>
  );
};

export default About;
