
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchForm from '@/components/search/SearchForm';
import { useSearchNavigation } from '@/hooks/useSearchNavigation';

const SearchBar = ({ className }: { className?: string }) => {
  const [query, setQuery] = useState('');
  const location = useLocation();
  const { navigateToSearch, clearSearch } = useSearchNavigation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get('q');
    if (q) {
      const readableQuery = q.replace(/-/g, ' ');
      setQuery(readableQuery);
    } else {
      setQuery('');
    }
  }, [location.search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigateToSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    clearSearch();
  };

  return (
    <SearchForm
      query={query}
      onQueryChange={setQuery}
      onSubmit={handleSearch}
      onClear={handleClear}
      placeholder="Search for scholarly consensus on a topic..."
      className={className}
    />
  );
};

export default SearchBar;
