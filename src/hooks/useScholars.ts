
import { useState } from 'react';
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

export const useScholars = () => {
  const [pendingScholars, setPendingScholars] = useState<ScholarUserData[]>([]);
  const [verifiedScholars, setVerifiedScholars] = useState<ScholarUserData[]>([]);
  const [rejectedScholars, setRejectedScholars] = useState<ScholarUserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchScholars = async () => {
    try {
      setLoading(true);
      const { data: users, error } = await supabase.auth.admin.listUsers();
      
      if (error) throw error;
      
      // Process users to filter scholars and organize by verification status
      const scholarUsers: ScholarUserData[] = [];
      
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
      
      // Separate scholars by verification status
      setPendingScholars(scholarUsers.filter(scholar => scholar.verification_status === 'pending'));
      setVerifiedScholars(scholarUsers.filter(scholar => scholar.verification_status === 'verified'));
      setRejectedScholars(scholarUsers.filter(scholar => scholar.verification_status === 'rejected'));
    } catch (error: any) {
      console.error('Error fetching users:', error.message);
      toast.error('Failed to load scholar data');
    } finally {
      setLoading(false);
    }
  };

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
      await fetchScholars(); // Refresh the list
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
    handleVerify
  };
};
