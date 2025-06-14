
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

interface TopicsFiltersProps {
  consensusFilter: string;
  setConsensusFilter: (value: string) => void;
  selectedTags: string[];
  onTagChange: (tag: string) => void;
  allTags: string[];
}

const TopicsFilters = ({ 
  consensusFilter, 
  setConsensusFilter, 
  selectedTags, 
  onTagChange, 
  allTags 
}: TopicsFiltersProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
      <h3 className="font-medium text-lg mb-4">Filters</h3>
      
      <div className="space-y-6">
        <div>
          <Label className="text-base mb-2 block">Consensus Level</Label>
          <RadioGroup value={consensusFilter} onValueChange={setConsensusFilter}>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all" className="font-normal">All levels</Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="high" id="high" />
              <Label htmlFor="high" className="font-normal">High consensus</Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="medium" id="medium" />
              <Label htmlFor="medium" className="font-normal">Medium consensus</Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="low" id="low" />
              <Label htmlFor="low" className="font-normal">Low consensus</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="disputed" id="disputed" />
              <Label htmlFor="disputed" className="font-normal">Disputed</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <Label className="text-base mb-2 block">Tags</Label>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {allTags.map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox 
                  id={`tag-${tag}`} 
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={() => onTagChange(tag)}
                />
                <Label htmlFor={`tag-${tag}`} className="font-normal">{tag}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicsFilters;
