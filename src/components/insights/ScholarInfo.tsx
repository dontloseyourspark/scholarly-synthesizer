
import React from 'react';
import { CardTitle } from '@/components/ui/card';
import ScholarAvatar from './ScholarAvatar';

type ScholarInfoProps = {
  scholar: {
    name: string;
    title?: string | null;
    institution?: string | null;
    avatar_url?: string | null;
  };
  avatarSize?: 'sm' | 'md' | 'lg';
};

const ScholarInfo: React.FC<ScholarInfoProps> = ({ scholar, avatarSize = 'md' }) => {
  return (
    <div className="flex items-center">
      <ScholarAvatar 
        name={scholar.name} 
        avatarUrl={scholar.avatar_url} 
        size={avatarSize}
      />
      <div className={avatarSize === 'md' ? 'ml-4' : 'ml-3'}>
        <CardTitle className={avatarSize === 'md' ? 'text-lg' : 'text-base'}>
          {scholar.name}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {scholar.title}, {scholar.institution}
        </p>
      </div>
    </div>
  );
};

export default ScholarInfo;
