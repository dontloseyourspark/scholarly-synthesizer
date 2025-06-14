
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TopicPublication } from '@/hooks/useTopicPublications';

type PublicationCardProps = {
  publication: TopicPublication;
  topicTitle: string;
  index?: number;
};

const PublicationCard = ({ publication, topicTitle, index }: PublicationCardProps) => {
  return (
    <Card key={publication.id || index}>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">
          <a 
            href={publication.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-scholarly-blue hover:underline"
          >
            {publication.title}
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-2">
          {publication.authors}, {publication.year}
        </p>
        {publication.publication && (
          <p className="text-sm text-muted-foreground mb-2">
            Published in: {publication.publication}
          </p>
        )}
        {publication.doi && (
          <p className="text-sm text-muted-foreground mb-2">
            DOI: {publication.doi}
          </p>
        )}
        <p className="text-sm">
          This is a peer-reviewed publication related to {topicTitle.toLowerCase()}.
        </p>
      </CardContent>
    </Card>
  );
};

export default PublicationCard;
