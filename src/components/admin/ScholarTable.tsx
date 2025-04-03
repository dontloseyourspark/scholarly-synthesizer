
import React from 'react';
import { DataTable } from './scholars/data-table';
import { getColumns } from './scholars/columns';
import { ScholarUserData } from '@/hooks/useScholars';

interface ScholarTableProps {
  scholars: ScholarUserData[];
  showActions?: boolean;
  onVerify?: (userId: string, approved: boolean) => Promise<void>;
}

const ScholarTable: React.FC<ScholarTableProps> = ({ 
  scholars, 
  showActions = false,
  onVerify
}) => {
  // Ensure we have valid data before rendering
  const validScholars = Array.isArray(scholars) ? scholars : [];
  
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
