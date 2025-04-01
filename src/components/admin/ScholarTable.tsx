
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';

type ScholarUserData = {
  id: string;
  email: string;
  academic_title: string;
  institution: string;
  field_of_study: string;
  verification_status: string;
  created_at: string;
};

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
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Academic Title</TableHead>
          <TableHead>Institution</TableHead>
          <TableHead>Field of Study</TableHead>
          <TableHead>Created</TableHead>
          {showActions && <TableHead>Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {scholars.length === 0 ? (
          <TableRow>
            <TableCell colSpan={showActions ? 6 : 5} className="text-center">
              No scholars found
            </TableCell>
          </TableRow>
        ) : (
          scholars.map((scholar) => (
            <TableRow key={scholar.id}>
              <TableCell>{scholar.email}</TableCell>
              <TableCell>{scholar.academic_title}</TableCell>
              <TableCell>{scholar.institution}</TableCell>
              <TableCell>{scholar.field_of_study}</TableCell>
              <TableCell>{scholar.created_at}</TableCell>
              {showActions && onVerify && (
                <TableCell>
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
                </TableCell>
              )}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ScholarTable;
