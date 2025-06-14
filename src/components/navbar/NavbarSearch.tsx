
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

const NavbarSearch = () => {
  const navigate = useNavigate();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const processedQuery = searchQuery.trim().toLowerCase().replace(/\s+/g, '-');
      navigate(`/topics?q=${encodeURIComponent(processedQuery)}`);
      setIsSearchExpanded(false);
      setSearchQuery('');
    }
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      setSearchQuery('');
    }
  };

  return (
    <>
      {isSearchExpanded ? (
        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 animate-in slide-in-from-right-2 duration-200">
          <Input
            type="text"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 cursor-text"
            autoFocus
          />
          <Button type="button" variant="ghost" size="sm" onClick={toggleSearch}>
            <X className="h-4 w-4" />
          </Button>
        </form>
      ) : (
        <Button variant="outline" size="sm" className="flex items-center hover:bg-transparent hover:border-border" onClick={toggleSearch}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      )}
    </>
  );
};

export default NavbarSearch;
