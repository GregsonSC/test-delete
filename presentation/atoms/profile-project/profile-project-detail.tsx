"use client";

import { FileText } from "lucide-react";
import { format } from "date-fns";

interface Document {
  id: string;
  name: string;
  url: string;
}

interface ProfileProjectDetailProps {
  description: string;
  documents?: Document[];
  date?: Date;
}

export function ProfileProjectDetail({
  description,
  documents = [],
  date = new Date(),
}: ProfileProjectDetailProps) {
  return (
    <div className="flex flex-col md:flex-row h-full border-4 border-[#8ECF0A] rounded-lg overflow-hidden" 
         style={{ 
           background: 'white',
           boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)'
         }}>
      {/* Project description */}
      <div className="flex-1 bg-white p-6 border-b-4 md:border-b-0 md:border-r-4 border-[#8ECF0A] flex flex-col justify-between">
        <p className="text-gray-700">{description}</p>
        <div className="text-right text-gray-400 text-sm mt-4">
          {format(date, "MM-dd-yy")}
        </div>
      </div>

      {/* Documents list */}
      <div className="w-full md:w-[250px] bg-white p-4 max-h-full overflow-y-auto"
           style={{ 
             msOverflowStyle: 'none',
             scrollbarWidth: 'none'
           }}>
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="space-y-2">
          {documents.map((doc) => (
            <a
              key={doc.id}
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <FileText size={18} className="text-gray-500" />
              <span className="text-gray-600 text-sm truncate">{doc.name}</span>
            </a>
          ))}
          {documents.length === 0 && (
            <div className="text-center text-gray-400 py-4">
              No documents available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}