"use client";

import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { MainLayout } from "@/presentation/templates/main-layout";
import { ProfileChat } from "@/presentation/atoms/chat/profile-chat";
// Re-import project components and data
import { projects, requests } from "@/lib/constants";
import { ProfileProjectCard } from "@/presentation/atoms/profile-project/profile-project-card"; // Re-added
import { ProfileProjectDetail } from "@/presentation/atoms/profile-project/profile-project-detail"; // Re-added
import { RequestCard } from "@/presentation/atoms/profile-project/request/request-card";
import { RequestDetail } from "@/presentation/atoms/profile-project/request/request-detail";
import { EstimatedValue } from "@/presentation/atoms/profile-project/request/estimated-value"; // Import EstimatedValue

// Define types
type Request = typeof requests[0];
type Project = typeof projects[0]; // Re-added Project type
// Assuming both have a compatible chatHistory structure
type ChatMessage = (Request["chatHistory"] | Project["chatHistory"])[0];

// Add EstimatedValue structure to RequestItem if not already globally defined
interface RequestWithEstimate extends Request {
  estimatedValue?: {
    title: string;
    items: Array<{ name: string; value: number }>;
  };
}


export function ProfileProjects() {
  // State for active tab ('leads' or 'projects') and selected IDs
  const [activeTab, setActiveTab] = useState<"leads" | "projects">("leads");
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null); // Re-added Project ID state

  // --- Derived State (Memoized for performance) ---
  // Get the full selected item (request or project) based on ID and active tab
  const selectedItem: RequestWithEstimate | Project | null = useMemo(() => {
    if (activeTab === "leads" && selectedRequestId) {
      return (requests.find((r) => r.id === selectedRequestId) as RequestWithEstimate) || null;
    } else if (activeTab === "projects" && selectedProjectId) {
      return projects.find((p) => p.id === selectedProjectId) || null;
    }
    return null;
    // Update dependencies
  }, [activeTab, selectedRequestId, selectedProjectId]);

  // Get the chat history for the selected item
  const currentChatHistory: ChatMessage[] = useMemo(() => {
    // Selected item can be Request or Project, both should have chatHistory
    return selectedItem?.chatHistory || [];
  }, [selectedItem]);

  // --- Event Handlers ---
  // Re-add handleProjectSelect
  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId);
    setSelectedRequestId(null); // Clear request selection
    if (activeTab !== "projects") setActiveTab("projects"); // Switch tab if needed
  };

  // Update handleRequestSelect to clear project selection
  const handleRequestSelect = (requestId: string) => {
    setSelectedRequestId(requestId);
    setSelectedProjectId(null); // Clear project selection
    // Switch to 'leads' tab if not already active when a request is selected
    if (activeTab !== "leads") setActiveTab("leads");
  };

  // Update handleTabChange to clear both selections
  const handleTabChange = (tab: "leads" | "projects") => {
    setActiveTab(tab);
    setSelectedRequestId(null);
    setSelectedProjectId(null);
    setActiveBottomTab("chat"); // Reset bottom tab to chat when main tab changes
  };

  // --- Effects ---
  // Update effect to reset both selections
  useEffect(() => {
    const handlePopState = () => {
      setSelectedRequestId(null);
      setSelectedProjectId(null); // Reset project ID too
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // --- Render Logic Helper ---
  // Determine if the list view (left column) should be shown on mobile
  // Logic depends on whether *any* item is selected, regardless of type
  const showList = !selectedItem;

  return (
    <MainLayout showFooter={false}>
      {/* Section */}
      <section className="bg-gray-50 pt-20 md:pt-20 lg:pt-0">
        {/* Inner Container */}
        <div className="w-full md:px-5 md:py-4 h-full overflow-hidden lg:mt-0 mt-0">
          {/* Grid */}
          <div className={cn(
            "grid grid-cols-1 md:grid-cols-[35%_1fr] md:gap-4",
            !showList ? "h-[calc(100vh-5rem)]" : "h-auto", // Mobile height
            "md:h-[calc(100vh-6.5rem)]" // Desktop height constraint
          )}>
            {/* Columna Izquierda - Lista */}
            <div
              className={cn(
                "bg-white md:rounded-lg md:p-4",
                "p-0 pt-2 sm:pt-0",
                showList ? "block" : "hidden", // Mobile visibility
                "md:block", // Desktop visibility
                "md:h-full md:flex md:flex-col md:overflow-hidden" // Desktop layout/height/overflow
              )}
              style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
            >
              {/* Tabs */}
              <div className="flex mb-4 px-4 md:p-0 pt-3 md:pt-0 flex-shrink-0">
                {/* Request Tab Button */}
                <button
                  className={cn(
                    "px-6 py-0 rounded-full mr-2 text-base font-bold md:text-lg",
                    activeTab === "leads"
                      ? "bg-[#99CC33] text-white"
                      : "bg-transparent text-[#739926] border border-[#99CC33]"
                  )}
                  onClick={() => handleTabChange("leads")}
                >
                  Requests
                </button>
                {/* Project Tab Button */}
                <button
                  className={cn(
                    "px-6 py-0 rounded-full text-base font-bold md:text-lg",
                    activeTab === "projects"
                      ? "bg-[#99CC33] text-white"
                      : "bg-transparent text-[#739926] border border-[#99CC33]"
                  )}
                  onClick={() => handleTabChange("projects")}
                >
                  Projects
                </button>
              </div>

              {/* Contenedor de Cards (Scrollable area) */}
              <div
                className={cn(
                  "overflow-y-auto space-y-4 px-4 md:pr-2 md:pl-0", // Scrolling
                  "md:flex-1 md:min-h-0", // Desktop flex sizing
                  showList ? "h-[calc(100vh-8rem)]" : "", // Mobile height
                )}
                style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
              >
                <style jsx>{` div::-webkit-scrollbar { display: none; } `}</style>

                {/* Render Request Cards */}
                {activeTab === "leads" &&
                  (requests.length > 0 ? (
                    requests.map((request) => (
                      <div
                        key={request.id}
                        onClick={() => handleRequestSelect(request.id)}
                        className="cursor-pointer"
                      >
                        <RequestCard
                          requestName={request.requestName}
                          leadStatus={request.leadStatus}
                          isSelected={selectedRequestId === request.id}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 mt-10">
                      No requests available
                    </div>
                  ))}

                 {/* Render Project Cards */}
                 {activeTab === "projects" &&
                   (projects.length > 0 ? (
                     projects.map((project) => (
                       <ProfileProjectCard
                         key={project.id}
                         projectName={project.name}
                         progress={project.progress}
                         phase={project.phase}
                         // Assuming ProfileProjectCard has an onClick prop
                         onClick={() => handleProjectSelect(project.id)}
                         isSelected={selectedProjectId === project.id}
                       />
                     ))
                   ) : (
                     <div className="text-center text-gray-500 mt-10">
                       No projects available
                     </div>
                   ))}
              </div> {/* End Contenedor de Cards */}
            </div> {/* End Columna Izquierda */}

            {/* Columna Derecha - Detalles y Chat */}
            <div
              className={cn(
                "flex flex-col space-y-4",
                !showList ? "flex" : "hidden", // Mobile visibility
                "md:flex", // Desktop visibility
                "h-full min-h-0 w-full overflow-hidden" // Layout/height/overflow
              )}
            >
              {/* --- Sección Superior Derecha (Detalles) --- */}
              <div
                className={cn(
                  "bg-white rounded-lg p-4",
                  "lg:max10-[250px]", // Outer container max height
                  "overflow-hidden", // Outer container hides overflow
                  "flex-shrink-0"
                )}
                style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
              >
                {/* Contenedor interno para scroll */}
                <div 
                  className="overflow-y-auto h-full"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#99CC33 #f0f0f0'
                  }}
                >
                  <style jsx>{`
                    div::-webkit-scrollbar {
                      width: 8px;
                    }
                    div::-webkit-scrollbar-track {
                      background: #f0f0f0;
                      border-radius: 10px;
                    }
                    div::-webkit-scrollbar-thumb {
                      background-color: #99CC33;
                      border-radius: 10px;
                      border: 2px solid #f0f0f0;
                    }
                    div::-webkit-scrollbar-thumb:hover {
                      background-color: #739926;
                    }
                  `}</style>
                   
                   {/* Placeholder when no item is selected */}
                   {!selectedItem && (
                     <div className="flex items-center justify-center h-full text-gray-400">
                       {activeTab === 'leads' ? 'Select a request to see details.' : 'Select a project to see details.'}
                     </div>
                   )}

                   {/* Render Request Details */}
                   {selectedItem && activeTab === 'leads' && 'requestName' in selectedItem && (
                     <RequestDetail
                       requestName={selectedItem.requestName}
                       associatedService={selectedItem.associatedService}
                       companyPlan={selectedItem.companyPlan}
                       description={selectedItem.description}
                       leadStatus={selectedItem.leadStatus}
                     />
                   )}

                   {/* Render ALL Project Details */}
                   {selectedItem && activeTab === 'projects' && 'progress' in selectedItem && (
                     selectedItem.details.map((detail, index) => (
                       <ProfileProjectDetail
                         key={index}
                         description={detail.description}
                         documents={detail.documents}
                         date={detail.date}
                       
                       />
                     ))
                   )}
                </div>
              </div>

              {/* --- Sección Inferior Derecha (Chat) --- */}
              <div
                className={cn(
                  "bg-white rounded-lg p-4",
                  "flex-1 min-h-0 flex flex-col overflow-hidden" // Sizing/Layout/Overflow
                )}
                style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
              >
                {/* Tabs for Chat and Estimate */}
                <div className="flex mb-4 flex-shrink-0">
                  <button
                    className={cn(
                      "px-6 py-0 rounded-full mr-2 text-base font-bold md:text-lg",
                      activeBottomTab === "chat"
                        ? "bg-[#99CC33] text-white"
                        : "bg-transparent text-[#739926] border border-[#99CC33]"
                    )}
                    onClick={() => setActiveBottomTab("chat")}
                  >
                    Chat
                  </button>
                  {/* Show Estimate tab only for leads with an estimate */}
                  {activeTab === "leads" && selectedItem && 'estimatedValue' in selectedItem && selectedItem.estimatedValue && (
                    <button
                      className={cn(
                        "px-6 py-0 rounded-full text-base font-bold md:text-lg",
                        activeBottomTab === "estimate"
                          ? "bg-[#99CC33] text-white"
                          : "bg-transparent text-[#739926] border border-[#99CC33]"
                      )}
                      onClick={() => setActiveBottomTab("estimate")}
                    >
                      Estimate
                    </button>
                  )}
                </div>

                {/* Content for Chat or Estimate */}
                <div className="flex-1 min-h-0 overflow-y-auto" style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}>
                   <style jsx>{` div::-webkit-scrollbar { display: none; } `}</style>
                  {!selectedItem ? (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      {activeTab === 'leads' ? 'Select a request to see details.' : 'Select a project to see details.'}
                    </div>
                  ) : activeBottomTab === "chat" ? (
                    <ProfileChat messages={currentChatHistory} />
                  ) : activeBottomTab === "estimate" && activeTab === "leads" && selectedItem && 'estimatedValue' in selectedItem && selectedItem.estimatedValue ? (
                    <EstimatedValue
                      title={selectedItem.estimatedValue.title}
                      items={selectedItem.estimatedValue.items}
                      displayMode="full" // Or "summary" based on your needs
                      // Add onAccept/onDecline handlers if needed, e.g.:
                      // onAccept={() => console.log("Estimate accepted for:", selectedItem.requestName)}
                      // onDecline={(reason) => console.log("Estimate declined for:", selectedItem.requestName, "Reason:", reason)}
                    />
                  ) : (
                     // Fallback if estimate tab is selected but no estimate data (should be rare due to button logic)
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No estimate available for this item.
                    </div>
                  )}
                </div>
              </div>
            </div> {/* Fin Columna Derecha */}
          </div> {/* Fin Grid */}
        </div> {/* Fin Inner Container */}
      </section> {/* Fin Section */}
    </MainLayout>
  );
}
