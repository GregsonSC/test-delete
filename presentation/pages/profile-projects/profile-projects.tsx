"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MainLayout } from "@/presentation/templates/main-layout";
import { ProfileChat } from "@/presentation/atoms/chat/profile-chat";
import { ProfileProjectCard } from "@/presentation/atoms/profile-project/profile-project-card";
import { ProfileProjectDetail } from "@/presentation/atoms/profile-project/profile-project-detail";
import { projects } from "@/lib/constants";

export function ProfileProjects() {
  const [activeTab, setActiveTab] = useState<"leads" | "projects">("projects");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<"chat" | "documents">("chat");

  // Find the selected project
  const selectedProject =
    projects.find((project) => project.id === selectedProjectId) || projects[0];

  // Handle project selection
  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId);

    // Add history entry for back button functionality
    window.history.pushState({ projectId }, "", window.location.pathname);
  };

  // Listen for popstate event (browser back button)
  useEffect(() => {
    const handlePopState = () => {
      setSelectedProjectId(null);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <MainLayout>
      <section className="bg-gray-50">
        <div className="w-full md:px-5 md:py-4 overflow-x-hidden lg:mt-0 mt-20 ">
          <div className="grid grid-cols-1 md:grid-cols-[35%_1fr] md:gap-6">
            {/* Left column - Projects list */}
            <div
              className={cn(
                "bg-white md:rounded-lg md:p-4 p-0 pt-2 sm:pt-0",
                selectedProjectId ? "md:block hidden" : "block"
              )}
              style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
            >
              {/* Tabs */}
              <div className="flex mb-4 px-4 md:p-0 pt-3 md:pt-0">
                <button
                  className={cn(
                    "px-6 py-0 rounded-full mr-2 text-base font-bold md:text-lg",
                    activeTab === "leads"
                      ? "bg-[#99CC33] text-white"
                      : "bg-transparent text-[#739926] border border-[#99CC33]"
                  )}
                  onClick={() => setActiveTab("leads")}
                >
                  Leads
                </button>
                <button
                  className={cn(
                    "px-6 py-0 rounded-full text-base font-bold md:text-lg",
                    activeTab === "projects"
                      ? "bg-[#99CC33] text-white"
                      : "bg-transparent text-[#739926] border border-[#99CC33]"
                  )}
                  onClick={() => setActiveTab("projects")}
                >
                  Projects
                </button>
              </div>

              {/* Project cards container */}
              <div
                className="overflow-y-auto space-y-4 px-4 md:pr-2 md:pl-0 flex-1 max-h-[900px]"
                style={{
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                }}
              >
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                {activeTab === "projects" &&
                  projects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => handleProjectSelect(project.id)}
                      className="cursor-pointer"
                    >
                      <ProfileProjectCard
                        projectName={project.name}
                        progress={project.progress}
                        phase={project.phase}
                        isSelected={selectedProjectId === project.id}
                      />
                    </div>
                  ))}
                {activeTab === "leads" && (
                  <div className="text-center text-gray-500 mt-10">No leads available</div>
                )}
              </div>
            </div>

            {/* Right column - Project details and chat */}
            <div
              className={cn(
                "flex flex-col md:space-y-4 pt-2 sm:pt-0 px-2",
                !selectedProjectId ? "md:block hidden" : "block"
              )}
            >
              {/* Project header with name - Mobile only */}
              <h2 className="text-[20px] font-bold text-[#060B20] px-4 py-1 md:hidden">
                {selectedProject.name}
              </h2>

              {/* Chat/Documents toggle buttons - Mobile only */}
              <div className="flex mb-2 px-4 pt-2 md:rounded-lg md:shadow-sm md:hidden">
                <button
                  className={cn(
                    "px-6 py-0 rounded-full mr-2 text-base font-bold",
                    activeView === "chat"
                      ? "bg-[#99CC33] text-white"
                      : "bg-transparent text-[#739926] border border-[#99CC33]"
                  )}
                  onClick={() => setActiveView("chat")}
                >
                  Chat
                </button>
                <button
                  className={cn(
                    "px-6 py-0 rounded-full mr-2 text-base font-bold",
                    activeView === "documents"
                      ? "bg-[#99CC33] text-white"
                      : "bg-transparent text-[#739926] border border-[#99CC33]"
                  )}
                  onClick={() => setActiveView("documents")}
                >
                  Documents
                </button>
              </div>

              {/* Desktop view - Project details */}
              <div
                className="bg-white rounded-lg p-4 max-w-full flex-1 overflow-auto md:block hidden md:mt-0 md:h-[380px]"
                style={{
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                }}
              >
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                <div className="grid grid-cols-1 gap-4 h-full overflow-y-auto">
                  {selectedProject.details.map((detail, index) => (
                    <div key={index} className="h-[164px]">
                      <ProfileProjectDetail
                        description={detail.description}
                        documents={detail.documents}
                        date={detail.date}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop view - Chat section */}
              <div
                className="bg-white rounded-lg p-4 md:block hidden h-[600px]"
                style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="mb-4">
                  <div className="px-6 py-0 rounded-full bg-[#99CC33] text-white text-center font-bold text-lg w-24">
                    Chat
                  </div>
                </div>
                <div className="h-[calc(100%-3rem)] flex flex-col">
                  <div
                    className="flex-1 overflow-y-auto"
                    style={{
                      msOverflowStyle: "none",
                      scrollbarWidth: "none",
                    }}
                  >
                    <style jsx>{`
                      div::-webkit-scrollbar {
                        display: none;
                      }
                    `}</style>
                    <ProfileChat messages={selectedProject.chatHistory} />
                  </div>
                </div>
              </div>

              {/* Mobile view - Content area (shows either chat or documents) */}
              <div className="bg-white  p-4 flex-1 h-[calc(100vh-165px)] md:hidden md:rounded-lg md:shadow-sm">
                {activeView === "chat" && (
                  <div className="h-full flex flex-col">
                    <div
                      className="flex-1 overflow-y-auto"
                      style={{
                        msOverflowStyle: "none",
                        scrollbarWidth: "none",
                      }}
                    >
                      <style jsx>{`
                        div::-webkit-scrollbar {
                          display: none;
                        }
                      `}</style>
                      <ProfileChat messages={selectedProject.chatHistory} />
                    </div>
                  </div>
                )}

                {activeView === "documents" && (
                  <div className="h-full flex flex-col">
                    <div
                      className="flex-1 overflow-y-auto"
                      style={{
                        msOverflowStyle: "none",
                        scrollbarWidth: "none",
                      }}
                    >
                      <style jsx>{`
                        div::-webkit-scrollbar {
                          display: none;
                        }
                      `}</style>
                      <div className="grid grid-cols-1 gap-4">
                        {selectedProject.details.map((detail, index) => (
                          <div key={index}>
                            <ProfileProjectDetail
                              description={detail.description}
                              documents={detail.documents}
                              date={detail.date}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
