
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { ScholarUserData } from '@/hooks/useScholars';

export const getColumns = (
  showActions: boolean = false,
  onVerify?: (userId: string, approved: boolean) => Promise<void>
): ColumnDef<ScholarUserData>[] => {
  const baseColumns: ColumnDef<ScholarUserData>[] = [
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => {
        const email = (row.getValue('email') as string) || 'No email';
        return <div>{email}</div>;
      }
    },
    {
      accessorKey: 'academic_title',
      header: 'Academic Title',
      cell: ({ row }) => {
        const title = (row.getValue('academic_title') as string) || 'Not specified';
        return <div>{title}</div>;
      }
    },
    {
      accessorKey: 'institution',
      header: 'Institution',
      cell: ({ row }) => {
        const institution = (row.getValue('institution') as string) || 'Not specified';
        return <div>{institution}</div>;
      }
    },
    {
      accessorKey: 'field_of_study',
      header: 'Field of Study',
      cell: ({ row }) => {
        const field = (row.getValue('field_of_study') as string) || 'Not specified';
        return <div>{field}</div>;
      }
    },
    {
      accessorKey: 'created_at',
      header: 'Created',
      cell: ({ row }) => {
        const date = (row.getValue('created_at') as string) || 'Unknown';
        return <div>{date}</div>;
      }
    },
  ];

  if (showActions && onVerify) {
    const actionsColumn: ColumnDef<ScholarUserData> = {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const scholar = row.original;
        return (
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => onVerify(scholar.id, true)}
              className="text-green-600 border-green-600 hover:bg-green-50"
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Approve
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => onVerify(scholar.id, false)}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              <XCircle className="h-4 w-4 mr-1" />
              Reject
            </Button>
          </div>
        );
      }
    };
    return [...baseColumns, actionsColumn];
  }

  return baseColumns;
};
