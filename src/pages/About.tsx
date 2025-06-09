
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Users, BookOpen, Globe, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
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
              </p> {/* 
              <Button className="bg-white text-scholarly-blue hover:bg-scholarly-lightGray">
                Learn More About Our Mission <ArrowRight className="ml-2 h-4 w-4" />
              </Button>*/}
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
        
        {/* Stats 
        <section className="py-16 bg-scholarly-lightGray">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif font-bold mb-12">ScholarSphere by the Numbers</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-scholarly-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-scholarly-blue" />
                </div>
                <div className="text-4xl font-bold mb-2 text-scholarly-blue">500+</div>
                <div className="text-lg font-medium mb-2">Verified Scholars</div>
                <p className="text-muted-foreground">
                  Experts from leading institutions contributing their knowledge
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-scholarly-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-scholarly-blue" />
                </div>
                <div className="text-4xl font-bold mb-2 text-scholarly-blue">75+</div>
                <div className="text-lg font-medium mb-2">Topics Covered</div>
                <p className="text-muted-foreground">
                  From climate science to medicine, technology, and social sciences
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-scholarly-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-scholarly-blue" />
                </div>
                <div className="text-4xl font-bold mb-2 text-scholarly-blue">2,500+</div>
                <div className="text-lg font-medium mb-2">Insights Contributed</div>
                <p className="text-muted-foreground">
                  Evidence-based perspectives on important questions
                </p>
              </div>
            </div>
          </div>
        </section> */}
        
        {/* Team 
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">Our Team</h2>
            
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p>
                ScholarSphere was founded by a team of researchers, technologists, and science 
                communicators who saw the need for better ways to communicate scholarly consensus 
                to the public.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="text-center overflow-hidden">
                  <div className="h-48 bg-scholarly-blue bg-opacity-10 flex items-center justify-center">
                    <Users className="h-16 w-16 text-scholarly-blue opacity-30" />
                  </div>
                  <CardContent className="pt-6">
                    <h3 className="font-medium text-lg mb-1">Team Member {i}</h3>
                    <p className="text-scholarly-gray mb-4">Co-Founder & Role</p>
                    <p className="text-sm text-muted-foreground">
                      Brief biography of the team member, their background, expertise and 
                      motivation for working on ScholarSphere.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button variant="outline">
                View Full Team
              </Button>
            </div>
          </div>
        </section> */}
        
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
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
