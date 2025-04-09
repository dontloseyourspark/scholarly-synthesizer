
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Download } from 'lucide-react';
import { keyPublications } from '@/data/climateChangeData';

const PublicationsTab = () => {
  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Key Publications & Resources</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <p className="mb-6">
          The following publications represent major scientific contributions to our understanding of climate change.
          These reports are compiled by hundreds of leading scientists from around the world and undergo extensive 
          peer review before publication.
        </p>
        
        <div className="space-y-6">
          {keyPublications.map((pub) => (
            <div key={pub.id} className="border p-4 rounded-md hover:bg-gray-50 transition-colors">
              <h4 className="font-medium text-lg mb-1">{pub.title}</h4>
              <p className="text-muted-foreground mb-3">{pub.authors} ({pub.year})</p>
              <div className="flex justify-end">
                <Button variant="outline" asChild size="sm">
                  <a href={pub.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-1.5" />
                    View Resource
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button className="bg-scholarly-blue hover:bg-scholarly-accent">
            <Download className="h-4 w-4 mr-1.5" />
            Download Complete Bibliography
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PublicationsTab;
