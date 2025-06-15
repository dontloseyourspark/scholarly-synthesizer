
import React from "react";

type AddInsightSourceFieldsProps = {
  sourceTitle: string;
  setSourceTitle: (val: string) => void;
  sourceAuthors: string;
  setSourceAuthors: (val: string) => void;
  sourcePublication: string;
  setSourcePublication: (val: string) => void;
  sourceYear: number | "";
  setSourceYear: (val: number | "") => void;
  sourceDoi: string;
  setSourceDoi: (val: string) => void;
  sourceUrl: string;
  setSourceUrl: (val: string) => void;
};

const AddInsightSourceFields: React.FC<AddInsightSourceFieldsProps> = ({
  sourceTitle,
  setSourceTitle,
  sourceAuthors,
  setSourceAuthors,
  sourcePublication,
  setSourcePublication,
  sourceYear,
  setSourceYear,
  sourceDoi,
  setSourceDoi,
  sourceUrl,
  setSourceUrl,
}) => {
  return (
    <div className="pt-4 border-t mt-6">
      <label className="block text-base font-medium mb-2">Optional: Add a Source</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          type="text"
          className="w-full px-2 py-1 border rounded"
          placeholder="Title"
          value={sourceTitle}
          onChange={e => setSourceTitle(e.target.value)}
        />
        <input
          type="text"
          className="w-full px-2 py-1 border rounded"
          placeholder="Authors"
          value={sourceAuthors}
          onChange={e => setSourceAuthors(e.target.value)}
        />
        <input
          type="text"
          className="w-full px-2 py-1 border rounded"
          placeholder="Publication (Journal, Book, etc)"
          value={sourcePublication}
          onChange={e => setSourcePublication(e.target.value)}
        />
        <input
          type="number"
          className="w-full px-2 py-1 border rounded"
          placeholder="Year"
          value={sourceYear}
          onChange={e => setSourceYear(e.target.value ? Number(e.target.value) : "")}
        />
        <input
          type="text"
          className="w-full px-2 py-1 border rounded"
          placeholder="DOI"
          value={sourceDoi}
          onChange={e => setSourceDoi(e.target.value)}
        />
        <input
          type="text"
          className="w-full px-2 py-1 border rounded"
          placeholder="URL"
          value={sourceUrl}
          onChange={e => setSourceUrl(e.target.value)}
        />
      </div>
      <div className="text-xs text-muted-foreground mt-1">
        Provide publication details or a link to help others verify your insight. All fields are optional.
      </div>
    </div>
  );
};

export default AddInsightSourceFields;
