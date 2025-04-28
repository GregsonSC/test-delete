"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProfileChat } from "@/presentation/atoms/chat/profile-chat";
import { ProfileProjectDetail } from "./profile-project-detail"; // Assuming this path is correct

// Define types based on expected data structure (adjust if necessary)
interface Document {
  id: string;
  name: string;
  url: string;
}

interface ProjectDetailData {
  description: string;
  documents: Document[];
  date: Date;
}

interface ChatMessage {
  sender: "client" | "agent";
  message: string;
  timestamp: Date;
}

interface ProjectMobileProps {
  projectName: string;
  details: ProjectDetailData[];
  chatHistory: ChatMessage[];
  onBack: () => void; // Function to handle going back to the list
}

export function ProjectMobile({
  projectName,
  details,
  chatHistory,
  onBack,
}: ProjectMobileProps) {
  const [activeTab, setActiveTab] = useState<"chat" | "documents">("chat");

  return (
    // Removed bg-gray-900 from this div
    <div className="flex flex-col h-full text-white p-4"> 
      {/* Header */}
   
        {/* Assuming the parent container provides the text color, otherwise might need to adjust text color here */}
        <h1 className="text-xl font-bold truncate text-gray-800 mb-2">{projectName}</h1> 
      

      {/* Tabs */}
      <div className="flex mb-4 flex-shrink-0">
        <button
          className={cn(
            // Apply common styles from profile-projects tabs
            "px-6 py-0 rounded-full mr-2 text-base font-bold", 
            activeTab === "chat"
              // Active style from profile-projects tabs
              ? "bg-[#99CC33] text-white" 
              // Inactive style from profile-projects tabs
              : "bg-transparent text-[#739926] border border-[#99CC33]" 
          )}
          onClick={() => setActiveTab("chat")}
        >
          Chat
        </button>
        <button
          className={cn(
            // Apply common styles from profile-projects tabs
            "px-6 py-0 rounded-full text-base font-bold", // Removed mr-2 from second button
            activeTab === "documents"
              // Active style from profile-projects tabs
              ? "bg-[#99CC33] text-white"
              // Inactive style from profile-projects tabs
              : "bg-transparent text-[#739926] border border-[#99CC33]" 
          )}
          onClick={() => setActiveTab("documents")}
        >
          Documents
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {/* Conditional Rendering based on activeTab */}
        {activeTab === "chat" && (
          // ProfileChat might need styling adjustments if it assumed a dark background
          <ProfileChat messages={chatHistory} />
        )}

        {activeTab === "documents" && (
          <div className="space-y-4">
            {details.length > 0 ? (
              details.map((detail, index) => (
                // Removed specific background/border, assuming ProfileProjectDetail has its own appropriate styling
                <ProfileProjectDetail
                  key={index}
                  description={detail.description}
                  documents={detail.documents}
                  date={detail.date}
                  // Removed the dark-mode specific class: className="bg-gray-800 border border-[#99CC33] rounded-lg p-3" 
                />
              ))
            ) : (
              // Adjusted placeholder text color for potentially light background
              <div className="text-center text-gray-500 mt-10"> 
                No details available for this project.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}