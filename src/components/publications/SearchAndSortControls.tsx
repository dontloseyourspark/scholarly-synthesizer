
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SearchAndSortControlsProps = {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  sortBy: 'year-desc' | 'year-asc' | 'title-asc' | 'title-desc';
  onSortByChange: (value: 'year-desc' | 'year-asc' | 'title-asc' | 'title-desc') => void;
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  totalCount: number;
  useStaticData: boolean;
  filteredCount: number;
};

const SearchAndSortControls = ({
  searchTerm,
  onSearchTermChange,
  sortBy,
  onSortByChange,
  itemsPerPage,
  onItemsPerPageChange,
  totalCount,
  useStaticData,
  filteredCount
}: SearchAndSortControlsProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search publications by title or author..."
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="md:w-48">
          <Select value={sortBy} onValueChange={onSortByChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="year-desc">Year (Newest)</SelectItem>
              <SelectItem value="year-asc">Year (Oldest)</SelectItem>
              <SelectItem value="title-asc">Title (A-Z)</SelectItem>
              <SelectItem value="title-desc">Title (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:w-32">
          <Select value={itemsPerPage.toString()} onValueChange={(value) => onItemsPerPageChange(Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 per page</SelectItem>
              <SelectItem value="10">10 per page</SelectItem>
              <SelectItem value="20">20 per page</SelectItem>
              <SelectItem value="50">50 per page</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {searchTerm && (
        <div className="mt-4 text-sm text-muted-foreground">
          {useStaticData ? 
            `Showing ${filteredCount} of ${totalCount} publications` :
            `Found ${totalCount} publications`
          }
        </div>
      )}
    </div>
  );
};

export default SearchAndSortControls;
