import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Award, FileText, CheckCircle, AlertCircle, Mail, Github } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Link } from 'react-router-dom';

const Contribute = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-scholarly-blue to-scholarly-accent text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Contribute to ScholarSphere
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-scholarly-lightGray">
            Help build the world's most comprehensive database of scholarly consensus and expert insights. 
            Your contributions help advance evidence-based understanding across critical topics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-scholarly-blue" asChild>
              <Link to="/auth">
                <FileText className="h-5 w-5 mr-2" />
                Submit Research
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-scholarly-blue" asChild>
              <Link to="/auth">
                <Users className="h-5 w-5 mr-2" />
                Join Review Panel
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Ways to Contribute */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Ways to Contribute</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 text-scholarly-blue mb-4" />
                <CardTitle className="text-xl">Submit Research</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Share peer-reviewed publications, meta-analyses, and systematic reviews that contribute to scholarly consensus.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Peer-reviewed articles</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Meta-analyses</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Systematic reviews</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Conference proceedings</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-scholarly-blue mb-4" />
                <CardTitle className="text-xl">Expert Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Join our panel of expert reviewers to validate submissions and provide insights on research quality.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />PhD or equivalent expertise</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Publication history</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Research validation</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Quality assessment</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-scholarly-blue mb-4" />
                <CardTitle className="text-xl">Topic Curation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Help organize and categorize research by topic, ensuring comprehensive coverage of important issues.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Topic organization</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Research categorization</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Gap identification</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Content structuring</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Submission Guidelines */}
      <section className="bg-scholarly-lightGray py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Submission Guidelines</h2>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Research Quality Standards
                    </h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li>• <strong>Peer Review:</strong> All submissions must be peer-reviewed publications from reputable journals</li>
                      <li>• <strong>Methodology:</strong> Clear description of research methods and statistical approaches</li>
                      <li>• <strong>Sample Size:</strong> Adequate sample sizes for statistical significance</li>
                      <li>• <strong>Reproducibility:</strong> Sufficient detail for replication attempts</li>
                      <li>• <strong>Ethics:</strong> Evidence of ethical approval and informed consent where applicable</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <FileText className="h-5 w-5 text-blue-500 mr-2" />
                      Required Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Publication Details</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Full citation (APA format)</li>
                          <li>• DOI or URL</li>
                          <li>• Publication date</li>
                          <li>• Journal impact factor</li>
                          <li>• Open access status</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Research Summary</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Research question/hypothesis</li>
                          <li>• Key findings</li>
                          <li>• Methodology overview</li>
                          <li>• Statistical significance</li>
                          <li>• Limitations acknowledged</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                      Review Process
                    </h3>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <Badge variant="outline" className="mr-3">1</Badge>
                            <span className="text-sm">Initial screening for basic requirements</span>
                          </div>
                          <div className="flex items-center">
                            <Badge variant="outline" className="mr-3">2</Badge>
                            <span className="text-sm">Expert panel review for quality and relevance</span>
                          </div>
                          <div className="flex items-center">
                            <Badge variant="outline" className="mr-3">3</Badge>
                            <span className="text-sm">Community feedback and discussion period</span>
                          </div>
                          <div className="flex items-center">
                            <Badge variant="outline" className="mr-3">4</Badge>
                            <span className="text-sm">Final approval and database integration</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <Card className="bg-blue-50">
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-2">Review Timeline</h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>• Initial review: 3-5 business days</li>
                              <li>• Expert panel: 1-2 weeks</li>
                              <li>• Community feedback: 1 week</li>
                              <li>• Total process: 2-4 weeks</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recognition Program */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Contributor Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <Award className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                <CardTitle>Bronze Contributor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">5+ validated submissions</p>
                <ul className="space-y-2 text-sm">
                  <li>• Profile badge</li>
                  <li>• Contributor listing</li>
                  <li>• Early access features</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-scholarly-blue">
              <CardHeader>
                <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <CardTitle>Silver Contributor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">25+ validated submissions</p>
                <ul className="space-y-2 text-sm">
                  <li>• All Bronze benefits</li>
                  <li>• Review panel invitation</li>
                  <li>• Priority support</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle>Gold Contributor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">100+ validated submissions</p>
                <ul className="space-y-2 text-sm">
                  <li>• All Silver benefits</li>
                  <li>• Editorial board invitation</li>
                  <li>• Annual recognition</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-scholarly-blue text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">Ready to Contribute?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-scholarly-lightGray">
            Join our community of researchers, scholars, and experts working to advance evidence-based understanding.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-scholarly-blue">
              <Mail className="h-5 w-5 mr-2" />
              Contact Us
            </Button>
          </div>
          <div className="mt-8 text-sm text-scholarly-lightGray">
            <p>Questions? Email us at <a href="mailto:contribute@scholarsphere.com" className="underline hover:text-white">contribute@scholarsphere.com</a></p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contribute;
