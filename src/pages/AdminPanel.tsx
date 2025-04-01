
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCheck } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScholarTable from '@/components/admin/ScholarTable';
import TabNavigation from '@/components/admin/TabNavigation';
import { useScholars } from '@/hooks/useScholars';

const AdminPanel = () => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'pending' | 'verified' | 'rejected'>('pending');
  const { 
    pendingScholars, 
    verifiedScholars, 
    rejectedScholars, 
    loading, 
    fetchScholars,
    handleVerify 
  } = useScholars();

  useEffect(() => {
    const loadData = async () => {
      if (!user || !isAdmin) {
        return;
      }
      
      try {
        await fetchScholars();
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
        toast.error('Failed to load data');
      }
    };

    loadData();
  }, [user, isAdmin, fetchScholars]);

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

  // Redirect if not admin or not logged in
  if (!isAdmin || !user) {
    return <Navigate to="/" replace />;
  }

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
              <TabNavigation 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                pendingCount={pendingScholars.length}
                verifiedCount={verifiedScholars.length}
                rejectedCount={rejectedScholars.length}
              />
              
              {activeTab === 'pending' && (
                <ScholarTable 
                  scholars={pendingScholars} 
                  showActions={true}
                  onVerify={handleVerify}
                />
              )}
              {activeTab === 'verified' && (
                <ScholarTable scholars={verifiedScholars} />
              )}
              {activeTab === 'rejected' && (
                <ScholarTable scholars={rejectedScholars} />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPanel;
