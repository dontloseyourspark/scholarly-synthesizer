
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { toast } from 'sonner';

export type ScholarUserData = {
  id: string;
  email: string;
  academic_title: string;
  institution: string;
  field_of_study: string;
  verification_status: string;
  created_at: string;
};

export type SortField = 'email' | 'academic_title' | 'institution' | 'field_of_study' | 'created_at';
export type SortDirection = 'asc' | 'desc';

export const useScholars = () => {
  const [pendingScholars, setPendingScholars] = useState<ScholarUserData[]>([]);
  const [verifiedScholars, setVerifiedScholars] = useState<ScholarUserData[]>([]);
  const [rejectedScholars, setRejectedScholars] = useState<ScholarUserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Add state for filters and sorting
  const [filter, setFilter] = useState<string>('');
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const fetchScholars = useCallback(async (
    filterValue: string = filter,
    sortBy: SortField = sortField,
    sortDir: SortDirection = sortDirection
  ) => {
    try {
      setLoading(true);
      const { data: users, error } = await supabase.auth.admin.listUsers();
      
      if (error) throw error;
      
      // Process users to filter scholars and organize by verification status
      let scholarUsers: ScholarUserData[] = [];
      
      users.users.forEach((user: User) => {
        const userData = user.user_metadata;
        if (userData && userData.is_scholar) {
          scholarUsers.push({
            id: user.id,
            email: user.email || '',
            academic_title: userData.academic_title || '',
            institution: userData.institution || '',
            field_of_study: userData.field_of_study || '',
            verification_status: userData.verification_status || 'pending',
            created_at: new Date(user.created_at).toLocaleDateString(),
          });
        }
      });
      
      // Apply filtering if filter value is provided
      if (filterValue) {
        const lowercaseFilter = filterValue.toLowerCase();
        scholarUsers = scholarUsers.filter(scholar => 
          scholar.email.toLowerCase().includes(lowercaseFilter) ||
          scholar.academic_title.toLowerCase().includes(lowercaseFilter) ||
          scholar.institution.toLowerCase().includes(lowercaseFilter) ||
          scholar.field_of_study.toLowerCase().includes(lowercaseFilter)
        );
      }
      
      // Apply sorting
      scholarUsers.sort((a, b) => {
        const valueA = a[sortBy].toLowerCase();
        const valueB = b[sortBy].toLowerCase();
        
        if (sortDir === 'asc') {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      });
      
      // Separate scholars by verification status
      setPendingScholars(scholarUsers.filter(scholar => scholar.verification_status === 'pending'));
      setVerifiedScholars(scholarUsers.filter(scholar => scholar.verification_status === 'verified'));
      setRejectedScholars(scholarUsers.filter(scholar => scholar.verification_status === 'rejected'));
      
      // Update state for filters and sorting
      setFilter(filterValue);
      setSortField(sortBy);
      setSortDirection(sortDir);
    } catch (error: any) {
      console.error('Error fetching users:', error.message);
      toast.error('Failed to load scholar data');
    } finally {
      setLoading(false);
    }
  }, [filter, sortField, sortDirection]);

  const handleVerify = async (userId: string, approved: boolean) => {
    try {
      const status = approved ? 'verified' : 'rejected';
      
      const { data, error } = await supabase.auth.admin.updateUserById(
        userId,
        { 
          user_metadata: { 
            verification_status: status,
            verified_at: approved ? new Date().toISOString() : null
          } 
        }
      );
      
      if (error) throw error;
      
      toast.success(`Scholar ${approved ? 'verified' : 'rejected'} successfully`);
      await fetchScholars(); // Refresh the list with current filters and sorting
    } catch (error: any) {
      console.error('Error updating user:', error.message);
      toast.error('Failed to update scholar verification status');
    }
  };

  return {
    pendingScholars,
    verifiedScholars,
    rejectedScholars,
    loading,
    fetchScholars,
    handleVerify,
    // Expose filtering and sorting methods
    filter,
    sortField,
    sortDirection,
    setFilter: (value: string) => fetchScholars(value, sortField, sortDirection),
    setSorting: (field: SortField, direction: SortDirection) => fetchScholars(filter, field, direction)
  };
};
