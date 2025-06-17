import React from 'react';
import { ExternalLink } from 'lucide-react';

type Source = {
  id: number;
  title?: string | null;
  authors?: string | null;
  publication?: string | null;
  year?: number | null;
  url?: string | null;
  doi?: string | null;
};

type SourcesListProps = {
  sources: Source[];
  variant?: 'compact' | 'detailed';
};

const SourcesList: React.FC<SourcesListProps> = ({ sources, variant = 'compact' }) => {
  if (!sources || sources.length === 0) {
    return (
      <div className="text-sm text-muted-foreground italic">
        No sources available.
      </div>
    );
  }

  const safeSources = sources.filter((s): s is Source => s !== null && typeof s === 'object');

  if (variant === 'compact') {
    return (
      <div className="bg-scholarly-lightGray p-4 rounded-md">
        <h4 className="font-medium mb-2">Sources:</h4>
        <ul className="space-y-1">
          {safeSources.map((source, index) => {
            if (!source.url) return null;

            return (
              <li key={`${source.id}-${index}`}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open source: ${source.title || 'Untitled'}`}
                  className="text-scholarly-blue hover:underline flex items-center"
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5 inline" aria-hidden="true" />
                  {source.title || 'Untitled'} ({source.year || 'N/A'})
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {safeSources?.filter(Boolean).map((source, index) => {
        return (
          <div key={`${source.id ?? 'unknown'}-${index}`} className="border p-4 rounded-md">
            <h4 className="font-medium mb-1">{source.title || 'Untitled'}</h4>
            <p className="text-sm text-muted-foreground mb-2">{source.authors || 'Unknown authors'}</p>
            <div className="flex justify-between items-center">
              <div className="text-sm text-scholarly-gray">
                {source.publication || 'Unknown publication'}, {source.year || 'N/A'}
                {source.doi && (
                  <a
                    href={`https://doi.org/${source.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-scholarly-blue hover:underline"
                  >
                    DOI: {source.doi}
                  </a>
                )}
              </div>
              {source.url && (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open source: ${source.title || 'Untitled'}`}
                  className="text-scholarly-blue hover:underline text-sm flex items-center"
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" />
                  View Source
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
  
};

export default SourcesList;
