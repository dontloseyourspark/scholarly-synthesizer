
import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

const SearchInput = ({ 
  value, 
  onChange, 
  onClear, 
  placeholder = "Search...", 
  className = "",
  style 
}: SearchInputProps) => {
  return (
    <div className={`flex-1 relative ${className}`} style={style}>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-8"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      {value && (
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={onClear}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};

export default SearchInput;
