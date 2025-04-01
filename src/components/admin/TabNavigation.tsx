
import React from 'react';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

type Tab = 'pending' | 'verified' | 'rejected';

interface TabNavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  pendingCount: number;
  verifiedCount: number;
  rejectedCount: number;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  pendingCount,
  verifiedCount,
  rejectedCount
}) => {
  return (
    <div className="flex border-b mb-4">
      <button
        className={`px-4 py-2 font-medium ${activeTab === 'pending' ? 'border-b-2 border-scholarly-blue text-scholarly-blue' : 'text-gray-500'}`}
        onClick={() => setActiveTab('pending')}
      >
        <div className="flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          Pending ({pendingCount})
        </div>
      </button>
      <button
        className={`px-4 py-2 font-medium ${activeTab === 'verified' ? 'border-b-2 border-scholarly-blue text-scholarly-blue' : 'text-gray-500'}`}
        onClick={() => setActiveTab('verified')}
      >
        <div className="flex items-center">
          <CheckCircle className="h-4 w-4 mr-1" />
          Verified ({verifiedCount})
        </div>
      </button>
      <button
        className={`px-4 py-2 font-medium ${activeTab === 'rejected' ? 'border-b-2 border-scholarly-blue text-scholarly-blue' : 'text-gray-500'}`}
        onClick={() => setActiveTab('rejected')}
      >
        <div className="flex items-center">
          <XCircle className="h-4 w-4 mr-1" />
          Rejected ({rejectedCount})
        </div>
      </button>
    </div>
  );
};

export default TabNavigation;
