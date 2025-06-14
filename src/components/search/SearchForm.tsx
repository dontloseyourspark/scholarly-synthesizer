
import React from 'react';
import { Button } from '@/components/ui/button';
import SearchInput from './SearchInput';

interface SearchFormProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClear: () => void;
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

const SearchForm = ({ 
  query, 
  onQueryChange, 
  onSubmit, 
  onClear, 
  placeholder = "Search...", 
  buttonText = "Search",
  className = "" 
}: SearchFormProps) => {
  return (
    <form onSubmit={onSubmit} className={`flex w-full max-w-lg items-center space-x-2 ${className}`}>
      <SearchInput
        value={query}
        onChange={onQueryChange}
        onClear={onClear}
        placeholder={placeholder}
      />
      <Button type="submit" className="bg-scholarly-blue hover:bg-scholarly-accent">
        {buttonText}
      </Button>
    </form>
  );
};

export default SearchForm;
