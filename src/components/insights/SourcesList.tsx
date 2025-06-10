
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
  if (sources.length === 0) return null;

  if (variant === 'compact') {
    return (
      <div className="bg-scholarly-lightGray p-4 rounded-md">
        <h4 className="font-medium mb-2">Sources:</h4>
        <ul className="space-y-1">
          {sources.map((source, index) => (
            <li key={`${source.id}-${index}`}>
              <a 
                href={source.url || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-scholarly-blue hover:underline flex items-center"
              >
                <ExternalLink className="h-3.5 w-3.5 mr-1.5 inline" />
                {source.title || 'Untitled'} ({source.year || 'N/A'})
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sources.map((source, index) => (
        <div key={`${source.id}-${index}`} className="border p-4 rounded-md">
          <h4 className="font-medium mb-1">{source.title || 'Untitled'}</h4>
          <p className="text-sm text-muted-foreground mb-2">{source.authors || 'Unknown authors'}</p>
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <span className="text-scholarly-gray">
                {source.publication || 'Unknown publication'}, {source.year || 'N/A'}
              </span>
              {source.doi && <span className="ml-2 text-scholarly-gray">DOI: {source.doi}</span>}
            </div>
            {source.url && (
              <a 
                href={source.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-scholarly-blue hover:underline text-sm flex items-center"
              >
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                View Source
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SourcesList;
