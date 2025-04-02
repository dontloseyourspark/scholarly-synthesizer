import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type ScholarUserData = {
  id: string;
  email: string;
  username: string | null;
  academic_title: string | null;
  institution: string | null;
  field_of_study: string | null;
  verification_status: string | null;
  created_at: string;
};

export type SortField = 'email' | 'username' | 'academic_title' | 'institution' | 'field_of_study' | 'created_at';
export type SortDirection = 'asc' | 'desc';

export const useScholars = () => {
  const [pendingScholars, setPendingScholars] = useState<ScholarUserData[]>([]);
  const [verifiedScholars, setVerifiedScholars] = useState<ScholarUserData[]>([]);
  const [rejectedScholars, setRejectedScholars] = useState<ScholarUserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
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
      
      let query = supabase
        .from('profiles')
        .select('*')
        .not('verification_status', 'is', null);
      
      if (filterValue) {
        const lowercaseFilter = filterValue.toLowerCase();
        query.or(`username.ilike.%${lowercaseFilter}%,academic_title.ilike.%${lowercaseFilter}%,institution.ilike.%${lowercaseFilter}%,field_of_study.ilike.%${lowercaseFilter}%`);
      }
      
      query.order(sortBy, { ascending: sortDir === 'asc' });
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      const scholarUsers: ScholarUserData[] = (data || []).map(profile => ({
        id: profile.id,
        email: profile.email || '',
        username: profile.username,
        academic_title: profile.academic_title || '',
        institution: profile.institution || '',
        field_of_study: profile.field_of_study || '',
        verification_status: profile.verification_status || 'pending',
        created_at: new Date(profile.created_at).toLocaleDateString(),
      }));
      
      setPendingScholars(scholarUsers.filter(scholar => scholar.verification_status === 'pending'));
      setVerifiedScholars(scholarUsers.filter(scholar => scholar.verification_status === 'verified'));
      setRejectedScholars(scholarUsers.filter(scholar => scholar.verification_status === 'rejected'));
      
      setFilter(filterValue);
      setSortField(sortBy);
      setSortDirection(sortDir);
    } catch (error: any) {
      console.error('Error fetching scholars:', error.message);
      toast.error('Failed to load scholar data');
    } finally {
      setLoading(false);
    }
  }, [filter, sortField, sortDirection]);

  const handleVerify = async (userId: string, approved: boolean) => {
    try {
      const status = approved ? 'verified' : 'rejected';
      
      const { error } = await supabase
        .from('profiles')
        .update({ 
          verification_status: status,
          verified_at: approved ? new Date().toISOString() : null
        })
        .eq('id', userId);
      
      if (error) throw error;
      
      toast.success(`Scholar ${approved ? 'verified' : 'rejected'} successfully`);
      await fetchScholars();
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
    filter,
    sortField,
    sortDirection,
    setFilter: (value: string) => fetchScholars(value, sortField, sortDirection),
    setSorting: (field: SortField, direction: SortDirection) => fetchScholars(filter, field, direction)
  };
};
