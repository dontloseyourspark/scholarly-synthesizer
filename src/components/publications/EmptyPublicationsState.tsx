
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

type EmptyPublicationsStateProps = {
  searchTerm: string;
  onClearSearch: () => void;
  topicTitle: string;
  backRoute: string;
};

const EmptyPublicationsState = ({ 
  searchTerm, 
  onClearSearch, 
  topicTitle, 
  backRoute 
}: EmptyPublicationsStateProps) => {
  return (
    <div className="text-center py-12">
      <h3 className="text-xl font-medium mb-4">
        {searchTerm ? 'No publications found' : 'Publications Coming Soon'}
      </h3>
      <p className="text-muted-foreground mb-6">
        {searchTerm ? 
          'Try adjusting your search terms or filters.' :
          'We\'re currently compiling peer-reviewed publications for this topic. Check back soon for a comprehensive list of sources.'
        }
      </p>
      {searchTerm && (
        <Button 
          variant="outline" 
          onClick={onClearSearch}
          className="mb-4"
        >
          Clear Search
        </Button>
      )}
      <Link 
        to={backRoute}
        className="text-scholarly-blue hover:underline block"
      >
        Return to {topicTitle}
      </Link>
    </div>
  );
};

export default EmptyPublicationsState;
