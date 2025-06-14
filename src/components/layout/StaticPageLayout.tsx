
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface StaticPageLayoutProps {
  children: React.ReactNode;
}

const StaticPageLayout = ({ children }: StaticPageLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default StaticPageLayout;
