
import React, { useState } from 'react';
import SearchInput from '@/components/search/SearchInput';
import { useSearchNavigation } from '@/hooks/useSearchNavigation';

const NavbarSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { navigateToSearch } = useSearchNavigation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateToSearch(searchQuery);
      setSearchQuery('');
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const inputWidth = searchQuery ? `${Math.max(200, searchQuery.length * 8 + 100)}px` : '200px';

  return (
    <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        onClear={clearSearch}
        placeholder="Search topics..."
        className="transition-all duration-200 cursor-text hover:border-border"
        style={{ width: inputWidth }}
      />
    </form>
  );
};

export default NavbarSearch;
