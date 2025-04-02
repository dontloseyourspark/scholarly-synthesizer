
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
  const columns = getColumns(showActions, onVerify);
  
  return (
    <DataTable 
      columns={columns} 
      data={scholars} 
    />
  );
};

export default ScholarTable;
