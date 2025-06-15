
import React from "react";
import { publicationsToCSV } from "@/utils/publicationsExport";

type DownloadPublicationsCSVButtonProps = {
  publications: any[];
  topicTitle: string;
  disabled?: boolean;
  useStaticData: boolean;
  totalCount: number;
  currentPageCount: number;
};

const DownloadPublicationsCSVButton: React.FC<DownloadPublicationsCSVButtonProps> = ({
  publications,
  topicTitle,
  disabled,
  useStaticData,
  totalCount,
  currentPageCount,
}) => {
  const handleDownloadCSV = () => {
    const csvData = publicationsToCSV(publications);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const tempA = document.createElement("a");
    tempA.href = url;
    tempA.download = `${topicTitle.replace(/\s+/g, "_")}_publications.csv`;
    document.body.appendChild(tempA);
    tempA.click();
    document.body.removeChild(tempA);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-4">
      <button
        className="bg-scholarly-blue hover:bg-scholarly-accent text-white font-medium px-4 py-2 rounded shadow transition-colors mb-2"
        onClick={handleDownloadCSV}
        disabled={disabled}
        title={
          useStaticData
            ? "Download all results as CSV"
            : "Only current page of results can be downloaded from the online database (pagination in effect)"
        }
      >
        Download {useStaticData ? "All as CSV" : "Current Page as CSV"}
      </button>
      {!useStaticData && totalCount > currentPageCount && (
        <span className="text-xs text-muted-foreground ml-3">
          Only the current page can be downloaded when browsing online data.
        </span>
      )}
    </div>
  );
};

export default DownloadPublicationsCSVButton;
