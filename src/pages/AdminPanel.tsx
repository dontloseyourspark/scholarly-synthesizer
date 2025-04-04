import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCheck, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScholarTable from '@/components/admin/ScholarTable';
import TabNavigation from '@/components/admin/TabNavigation';
import { useScholars } from '@/hooks/useScholars';
import { Button } from '@/components/ui/button';

const AdminPanel = () => {
  const { user, isAdmin, loading: authLoading, profileLoaded } = useAuth();
  const [activeTab, setActiveTab] = useState<'pending' | 'verified' | 'rejected'>('pending');
  const { 
    pendingScholars, 
    verifiedScholars, 
    rejectedScholars, 
    loading: scholarsLoading, 
    error: scholarsError,
    fetchScholars,
    handleVerify 
  } = useScholars();

  // Load data when component mounts and auth is ready
  useEffect(() => {
    if (!authLoading && profileLoaded && user && isAdmin) {
      fetchScholars().catch(err => {
        console.error('Error fetching data:', err);
        toast.error('Failed to load scholar data');
      });
    }
  }, [user, isAdmin, fetchScholars, authLoading, profileLoaded]);

  // Handle error state
  if (scholarsError) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="font-serif text-xl flex items-center text-red-600">
                <AlertTriangle className="h-6 w-6 mr-2" />
                Error Loading Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{scholarsError}</p>
              <Button onClick={() => fetchScholars()}>Try Again</Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // Display loading state while auth is loading
  if (authLoading || !profileLoaded) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p>Checking authentication...</p>
        </main>
        <Footer />
      </div>
    );
  }

  // Redirect if not admin or not logged in
  if (!isAdmin || !user) {
    return <Navigate to="/auth" replace />;
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
                  loading={scholarsLoading}
                  showActions={true}
                  onVerify={handleVerify}
                />
              )}
              {activeTab === 'verified' && (
                <ScholarTable 
                  scholars={verifiedScholars} 
                  loading={scholarsLoading}
                />
              )}
              {activeTab === 'rejected' && (
                <ScholarTable 
                  scholars={rejectedScholars} 
                  loading={scholarsLoading}
                />
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
