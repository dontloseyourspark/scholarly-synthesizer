
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

const NavbarSearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const processedQuery = searchQuery.trim().toLowerCase().replace(/\s+/g, '-');
      navigate(`/topics?q=${encodeURIComponent(processedQuery)}`);
      setSearchQuery('');
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const inputWidth = searchQuery ? `${Math.max(200, searchQuery.length * 8 + 100)}px` : '200px';

  return (
    <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder="Search topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-8 transition-all duration-200 cursor-text hover:border-border"
          style={{ width: inputWidth }}
        />
        {searchQuery && (
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={clearSearch}
            className="absolute right-1 h-6 w-6 p-0 hover:bg-muted"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    </form>
  );
};

export default NavbarSearch;
