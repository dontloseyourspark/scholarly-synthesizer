
import React from 'react';
import { DNA, Bone, Brain, ScrollText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EvidenceSection = () => {
  return (
    <section className="py-16 px-4 bg-scholarly-lightGray">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-serif font-bold mb-2 text-center">Lines of Evidence</h2>
        <p className="text-center text-muted-foreground mb-12">Multiple scientific disciplines provide evidence supporting human evolution</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Bone className="h-6 w-6 mr-2 text-scholarly-blue" />
                Fossil Evidence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Thousands of fossil specimens document gradual changes in hominid anatomy over millions of years, including:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Progressive increase in cranial capacity</li>
                <li>Changes in dental features and jaw structure</li>
                <li>Evolution of bipedal locomotion</li>
                <li>Transitional forms showing intermediate characteristics</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <DNA className="h-6 w-6 mr-2 text-scholarly-blue" />
                Genetic Evidence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Modern genomic analysis provides strong support for human evolution:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>98.8% DNA similarity between humans and chimpanzees</li>
                <li>Shared genetic mutations with other primates</li>
                <li>Ancient DNA analysis from Neanderthals and other hominins</li>
                <li>Molecular clock dating consistent with fossil evidence</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Brain className="h-6 w-6 mr-2 text-scholarly-blue" />
                Comparative Anatomy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Anatomical comparisons between humans and other primates reveal:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Homologous bone structures across primate species</li>
                <li>Vestigial structures with no current function</li>
                <li>Shared embryonic development patterns</li>
                <li>Gradual skeletal adaptations for bipedalism</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <ScrollText className="h-6 w-6 mr-2 text-scholarly-blue" />
                Biogeographical Evidence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                The distribution of hominid fossils and archaeological findings shows:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>African origin of earliest hominins and Homo sapiens</li>
                <li>Migration patterns consistent with genetic evidence</li>
                <li>Chronological progression of tool technologies</li>
                <li>Correlation between environmental changes and evolutionary adaptations</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EvidenceSection;
