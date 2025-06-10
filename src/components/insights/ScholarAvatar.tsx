
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type ScholarAvatarProps = {
  name: string;
  avatarUrl?: string | null;
  size?: 'sm' | 'md' | 'lg';
};

const ScholarAvatar: React.FC<ScholarAvatarProps> = ({ 
  name, 
  avatarUrl, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={avatarUrl || ''} alt={name} />
      <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
    </Avatar>
  );
};

export default ScholarAvatar;
