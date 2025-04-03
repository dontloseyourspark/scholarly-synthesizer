
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

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
  const { user, isAdmin } = useAuth();
  const [pendingScholars, setPendingScholars] = useState<ScholarUserData[]>([]);
  const [verifiedScholars, setVerifiedScholars] = useState<ScholarUserData[]>([]);
  const [rejectedScholars, setRejectedScholars] = useState<ScholarUserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filter, setFilter] = useState<string>('');
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const fetchScholars = useCallback(async (
    filterValue: string = filter,
    sortBy: SortField = sortField,
    sortDir: SortDirection = sortDirection
  ) => {
    // Reset error state
    setError(null);
    
    // Don't attempt to fetch if user is not admin
    if (!user || !isAdmin) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      let query = supabase
      .from('profiles')
      .select('*')
      .eq('is_scholar', true); // Filter only scholars with is_scholar = true
  
      if (error) throw error;
      
      if (filterValue) {
        // Use .ilike with string concatenation for improved text search
        const lowercaseFilter = filterValue.toLowerCase();
        query = query.or(`email.ilike.%${lowercaseFilter}%,username.ilike.%${lowercaseFilter}%,academic_title.ilike.%${lowercaseFilter}%,institution.ilike.%${lowercaseFilter}%,field_of_study.ilike.%${lowercaseFilter}%`);
      }
      
      query = query.order(sortBy, { ascending: sortDir === 'asc' });
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Supabase query error:', error);
        throw error;
      }

      if (!data) {
        throw new Error('No data returned from query');
      }

      // Transform data for display
      const scholarUsers: ScholarUserData[] = data.map(profile => ({
        id: profile.id,
        email: profile.email || '',
        username: profile.username || '',
        academic_title: profile.academic_title || '',
        institution: profile.institution || '',
        field_of_study: profile.field_of_study || '',
        verification_status: profile.verification_status || 'pending',
        created_at: profile.created_at ? new Date(profile.created_at).toLocaleDateString() : 'Unknown',
      }));
      
      // Categorize scholars by verification status
      setPendingScholars(scholarUsers.filter(scholar => scholar.verification_status === 'pending'));
      setVerifiedScholars(scholarUsers.filter(scholar => scholar.verification_status === 'verified'));
      setRejectedScholars(scholarUsers.filter(scholar => scholar.verification_status === 'rejected'));
      
      // Update filter and sort state
      setFilter(filterValue);
      setSortField(sortBy);
      setSortDirection(sortDir);
    } catch (error: any) {
      console.error('Error fetching scholars:', error);
      setError(error.message || 'Failed to load scholar data');
    } finally {
      setLoading(false);
    }
  }, [filter, sortField, sortDirection, user, isAdmin]);

  const handleVerify = async (userId: string, approved: boolean) => {
    if (!user || !isAdmin) {
      toast.error('You must be an admin to perform this action');
      return;
    }

    try {
      const status = approved ? 'verified' : 'rejected';
      const timestamp = approved ? new Date().toISOString() : null;
      
      const { error } = await supabase
        .from('profiles')
        .update({ 
          verification_status: status,
          verified_at: timestamp
        })
        .eq('id', userId);
      
      if (error) {
        console.error('Supabase update error:', error);
        throw error;
      }
      
      toast.success(`Scholar ${approved ? 'verified' : 'rejected'} successfully`);
      
      // Refresh scholar data
      await fetchScholars();
    } catch (error: any) {
      console.error('Error updating user:', error.message);
      toast.error('Failed to update verification status: ' + (error.message || 'Unknown error'));
    }
  };

  return {
    pendingScholars,
    verifiedScholars,
    rejectedScholars,
    loading,
    error,
    fetchScholars,
    handleVerify,
    filter,
    sortField,
    sortDirection,
    setFilter: (value: string) => fetchScholars(value, sortField, sortDirection),
    setSorting: (field: SortField, direction: SortDirection) => fetchScholars(filter, field, direction)
  };
};
