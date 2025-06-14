
import React from 'react';

type PublicationsResultsSummaryProps = {
  currentPage: number;
  itemsPerPage: number;
  totalCount: number;
  totalPages: number;
  useStaticData: boolean;
};

const PublicationsResultsSummary = ({
  currentPage,
  itemsPerPage,
  totalCount,
  totalPages,
  useStaticData
}: PublicationsResultsSummaryProps) => {
  return (
    <div className="mt-6 text-center text-sm text-muted-foreground">
      {useStaticData ? (
        <>Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} publications</>
      ) : (
        <>Showing page {currentPage} of {totalPages} ({totalCount} total publications)</>
      )}
    </div>
  );
};

export default PublicationsResultsSummary;
