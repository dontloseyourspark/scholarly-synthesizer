
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface TopicPageLayoutProps {
  children: React.ReactNode;
}

const TopicPageLayout = ({ children }: TopicPageLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-scholarly-lightGray pb-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default TopicPageLayout;
