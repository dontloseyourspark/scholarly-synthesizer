
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, UserCheck, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type ScholarUserData = {
  id: string;
  email: string;
  academic_title: string;
  institution: string;
  field_of_study: string;
  verification_status: string;
  created_at: string;
};

const AdminPanel = () => {
  const { user } = useAuth();
  const [pendingScholars, setPendingScholars] = useState<ScholarUserData[]>([]);
  const [verifiedScholars, setVerifiedScholars] = useState<ScholarUserData[]>([]);
  const [rejectedScholars, setRejectedScholars] = useState<ScholarUserData[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'verified' | 'rejected'>('pending');

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      // In a real application, you'd check if the user has admin rights
      // For this example, we'll consider the first user as an admin
      // In production, use a proper role-based system
      setIsAdmin(true);
      setLoading(false);
      
      if (isAdmin) {
        fetchScholars();
      }
    };

    checkAdminStatus();
  }, [user, isAdmin]);

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
      fetchScholars(); // Refresh the list
    } catch (error: any) {
      console.error('Error updating user:', error.message);
      toast.error('Failed to update scholar verification status');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p>Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  // If not admin or not logged in, redirect to home
  if (!isAdmin || !user) {
    return <Navigate to="/" replace />;
  }

  const renderScholarTable = (scholars: ScholarUserData[], showActions = false) => (
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
              {showActions && (
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleVerify(scholar.id, true)}
                      className="text-green-600 border-green-600 hover:bg-green-50"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleVerify(scholar.id, false)}
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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-2xl flex items-center">
                <UserCheck className="h-6 w-6 mr-2 text-scholarly-blue" />
                Scholar Verification Admin Panel
              </CardTitle>
              <CardDescription>
                Review and verify academic scholars to grant them publishing privileges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex border-b mb-4">
                <button
                  className={`px-4 py-2 font-medium ${activeTab === 'pending' ? 'border-b-2 border-scholarly-blue text-scholarly-blue' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('pending')}
                >
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Pending ({pendingScholars.length})
                  </div>
                </button>
                <button
                  className={`px-4 py-2 font-medium ${activeTab === 'verified' ? 'border-b-2 border-scholarly-blue text-scholarly-blue' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('verified')}
                >
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Verified ({verifiedScholars.length})
                  </div>
                </button>
                <button
                  className={`px-4 py-2 font-medium ${activeTab === 'rejected' ? 'border-b-2 border-scholarly-blue text-scholarly-blue' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('rejected')}
                >
                  <div className="flex items-center">
                    <XCircle className="h-4 w-4 mr-1" />
                    Rejected ({rejectedScholars.length})
                  </div>
                </button>
              </div>
              
              {activeTab === 'pending' && renderScholarTable(pendingScholars, true)}
              {activeTab === 'verified' && renderScholarTable(verifiedScholars)}
              {activeTab === 'rejected' && renderScholarTable(rejectedScholars)}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPanel;
