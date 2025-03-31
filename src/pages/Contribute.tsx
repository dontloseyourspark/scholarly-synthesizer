
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCheck, BookOpen, Shield, Award, ArrowRight } from 'lucide-react';

const Contribute = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-scholarly-blue text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Contribute Your Expertise
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-scholarly-lightGray">
              Help build a clearer picture of scholarly consensus by sharing insights
              from your research and expertise.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-scholarly-blue hover:bg-scholarly-lightGray">
                Apply as a Scholar
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-scholarly-accent">
                Sign In to Contribute
              </Button>
            </div>
          </div>
        </section>
        
        {/* Process Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">How to Contribute</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-scholarly-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileCheck className="h-8 w-8 text-scholarly-blue" />
                  </div>
                  <CardTitle className="text-xl">1. Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Complete the scholar verification process by providing your credentials,
                    institutional affiliation, and research background.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-scholarly-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-scholarly-blue" />
                  </div>
                  <CardTitle className="text-xl">2. Contribute</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Share insights on topics within your expertise, backed by peer-reviewed
                    sources and clear reasoning.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-scholarly-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-scholarly-blue" />
                  </div>
                  <CardTitle className="text-xl">3. Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Participate in peer review by evaluating contributions from other
                    scholars and providing constructive feedback.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Scholar Benefits */}
        <section className="py-16 bg-scholarly-lightGray">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">Benefits for Scholars</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Award className="h-5 w-5 mr-2 text-scholarly-blue" />
                    Build Your Academic Reputation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Gain recognition for your expertise and contributions to scholarly consensus.
                    Your profile showcases your credentials and impact on the platform.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Award className="h-5 w-5 mr-2 text-scholarly-blue" />
                    Expand Public Understanding
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Help bridge the gap between academic research and public knowledge by
                    communicating complex topics in accessible ways.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Award className="h-5 w-5 mr-2 text-scholarly-blue" />
                    Connect with Other Experts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Engage with scholars across disciplines, fostering interdisciplinary
                    connections and potential collaborations.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Award className="h-5 w-5 mr-2 text-scholarly-blue" />
                    Counteract Misinformation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Contribute to a reliable source of expert knowledge that helps combat
                    misinformation and clarifies complex topics for the public.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Guidelines */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-center mb-8">Contribution Guidelines</h2>
            
            <Card className="max-w-3xl mx-auto">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <p>
                    All contributions to ScholarSphere should adhere to the following guidelines:
                  </p>
                  
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Insights must be supported by credible, peer-reviewed sources</li>
                    <li>Maintain objectivity and avoid advocacy for specific policy positions</li>
                    <li>Clearly state your level of confidence and any uncertainties</li>
                    <li>Use accessible language while maintaining scientific accuracy</li>
                    <li>Respect diverse viewpoints within scholarly discourse</li>
                    <li>Disclose any potential conflicts of interest</li>
                  </ul>
                  
                  <p>
                    For a complete set of guidelines and our code of conduct, please refer to our
                    <Link to="/guidelines" className="text-scholarly-blue hover:underline ml-1">
                      detailed contribution guidelines
                    </Link>.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-scholarly-blue text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">Ready to Contribute?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Join our community of scholars working to illuminate consensus on important topics.
            </p>
            <Button className="bg-white text-scholarly-blue hover:bg-scholarly-lightGray">
              Apply Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contribute;
