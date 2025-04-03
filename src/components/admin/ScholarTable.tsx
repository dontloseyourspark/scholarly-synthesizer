
import React from 'react';
import { DataTable } from './scholars/data-table';
import { getColumns } from './scholars/columns';
import { ScholarUserData } from '@/hooks/useScholars';
import { Skeleton } from '@/components/ui/skeleton';

interface ScholarTableProps {
  scholars: ScholarUserData[];
  loading?: boolean;
  showActions?: boolean;
  onVerify?: (userId: string, approved: boolean) => Promise<void>;
}

const ScholarTable: React.FC<ScholarTableProps> = ({ 
  scholars, 
  loading = false,
  showActions = false,
  onVerify
}) => {
  // Handle loading state with skeleton UI
  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }
  
  // Ensure we have valid data before rendering and filter scholars
  const validScholars = Array.isArray(scholars) ? scholars.filter(scholar => scholar.is_scholar === true) : [];
  
  // Ensure we have a valid onVerify function if showActions is true
  const columns = getColumns(
    showActions, 
    showActions && typeof onVerify === 'function' ? onVerify : undefined
  );
  
  return (
    <DataTable 
      columns={columns} 
      data={validScholars} 
    />
  );
};

export default ScholarTable;
