
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const SearchBar = ({ className }: { className?: string }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get('q');
    if (q) {
      // Convert back from URL format to readable format
      const readableQuery = q.replace(/-/g, ' ');
      setQuery(readableQuery);
    } else {
      setQuery('');
    }
  }, [location.search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast({
        title: "Empty search",
        description: "Please enter a topic to search.",
        variant: "destructive",
      });
      return;
    }
    
    // Process query and navigate to topics page with query parameter
    const processedQuery = query.trim().toLowerCase().replace(/\s+/g, '-');
    navigate(`/topics?q=${encodeURIComponent(processedQuery)}`);
  };

  return (
    <form onSubmit={handleSearch} className={`flex w-full max-w-lg items-center space-x-2 ${className}`}>
      <div className="flex-1 relative">
        <Input
          type="text"
          placeholder="Search for scholarly consensus on a topic..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
      <Button type="submit" className="bg-scholarly-blue hover:bg-scholarly-accent">
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
