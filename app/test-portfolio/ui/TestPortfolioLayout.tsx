"use client";

import React, { useState, useEffect } from "react";
import MobilePortfolioLayout from "./MobilePortfolioLayout";
import { mockRequests, mockProjects } from "../mockData";
import RequestList from "./RequestList";
import ProjectList from "./ProjectList";
import { ProfileChat } from "../../../presentation/atoms/chat/profile-chat";
import { useChatManager } from "../hooks/useChatManager";

// Updated Placeholder for dark background
const Placeholder = ({ label }: { label: string }) => (
  <div className="flex items-center justify-center h-full w-full text-gray-400 text-lg font-semibold border-2 border-dashed border-gray-700 rounded-lg">
    {label}
  </div>
);

const REQUEST_TABS = ["Requests", "Projects"];
const CHAT_TABS = ["Chat", "Estimated value", "Invoices"];

// Helper function defined at module scope
function getChatEntityDetails(
  requestTab: string,
  selectedRequest: string | null,
  selectedProject: string | null
): {
  currentEntityId: string | undefined;
  currentEntityType: "project" | "request" | undefined;
} {
  if (requestTab === "Requests" && selectedRequest) {
    return { currentEntityId: selectedRequest, currentEntityType: "request" };
  }
  if (requestTab === "Projects" && selectedProject) {
    return { currentEntityId: selectedProject, currentEntityType: "project" };
  }
  return { currentEntityId: undefined, currentEntityType: undefined };
}

export default function TestPortfolioLayout() {
  const [requestTab, setRequestTab] = useState<(typeof REQUEST_TABS)[number]>(REQUEST_TABS[0]);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [chatTab, setChatTab] = useState(CHAT_TABS[0]);

  // Use the custom hook for chat logic
  const {
    currentChatMessages,
    isLoadingChatHistory,
    handleRequestHistoryLoad,
    handleSendMessageRequest,
    clearChatState,
  } = useChatManager();

  // Effect to clear chat state if no project/request is selected globally
  useEffect(() => {
    const isAnyItemSelected = selectedRequest || selectedProject;
    if (!isAnyItemSelected) {
      clearChatState();
    }
  }, [selectedRequest, selectedProject, clearChatState]);

  // Use the module-level helper function
  const { currentEntityId, currentEntityType } = getChatEntityDetails(
    requestTab,
    selectedRequest,
    selectedProject
  );

  const chatComponentInstance = (
    <ProfileChat
      entityId={currentEntityId}
      entityType={currentEntityType}
      messagesToDisplay={currentChatMessages}
      onSendMessageRequest={handleSendMessageRequest}
      onRequestHistoryLoad={handleRequestHistoryLoad}
      isLoadingHistory={isLoadingChatHistory}
    />
  );

  // Main details label según tab
  const getMainDetailsLabel = (tab: string) =>
    tab === "Projects" ? "Main Details (Projects)" : "Main Details (Requests)";

  // Chat tabs para desktop según tab
  const getChatTabs = (tab: string) => (tab === "Projects" ? [CHAT_TABS[0]] : CHAT_TABS);

  return (
    <div className="w-full bg-[#04081E] p-4 flex flex-col gap-4 min-h-[calc(100vh-64px)] h-[calc(100vh-72px)] text-gray-200">
      {/* Desktop/Tablet Layout - grid background is now transparent, allowing parent bg to show */}
      <div className="hidden md:grid grid-cols-3 gap-4 w-full h-full min-h-0">
        {/* Sidebar - card background changed */}
        <div className="col-span-1 bg-[#13103A] rounded-xl shadow p-4 flex flex-col gap-4 h-full min-h-0">
          <div className="flex gap-2">
            {REQUEST_TABS.map((tab) => (
              <button
                key={tab}
                className={`px-3 py-1 rounded-full font-bold border-2 transition-colors text-[14px] h-8 ${
                  requestTab === tab
                    ? "bg-[#99CC33] text-[#13103A] border-[#99CC33]"
                    : "bg-transparent text-[#99CC33] border-[#99CC33]"
                }`}
                onClick={() => {
                  setRequestTab(tab);
                  setSelectedRequest(null);
                  setSelectedProject(null);
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          {requestTab === "Requests" ? (
            <RequestList
              requests={mockRequests}
              selectedId={selectedRequest}
              onSelect={setSelectedRequest}
            />
          ) : (
            <ProjectList
              projects={mockProjects}
              selectedId={selectedProject}
              onSelect={setSelectedProject}
            />
          )}
        </div>
        {/* Main Content */}
        <div className="col-span-2 flex flex-col gap-4 h-full min-h-0">
          {/* Top Section - card background changed */}
          <div className="bg-[#13103A] rounded-xl shadow p-4 flex flex-col gap-4">
            <Placeholder label={getMainDetailsLabel(requestTab)} />
          </div>
          {/* Bottom Section - card background changed */}
          <div className="bg-[#13103A] rounded-xl shadow p-4 flex-1 flex flex-col gap-4 min-h-0 h-0">
            <div className="flex gap-2 mb-2">
              {getChatTabs(requestTab).map((tab) => (
                <button
                  key={tab}
                  className={`px-3 py-1 rounded-full font-bold border-2 transition-colors text-[14px] h-8 ${
                    chatTab === tab
                      ? "bg-[#99CC33] text-[#13103A] border-[#99CC33]"
                      : "bg-transparent text-[#99CC33] border-[#99CC33]"
                  }`}
                  onClick={() => setChatTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex-1 min-h-0">
              {/* Content for "Chat" tab */}
              <div className={`h-full ${chatTab === CHAT_TABS[0] ? "block" : "hidden"}`}>
                {chatTab === CHAT_TABS[0] && chatComponentInstance}
              </div>

              {/* Content for "Estimated value" tab */}
              {getChatTabs(requestTab).includes(CHAT_TABS[1]) && (
                <div className={`h-full ${chatTab === CHAT_TABS[1] ? "block" : "hidden"}`}>
                  <Placeholder label={`Content (${CHAT_TABS[1]})`} />
                </div>
              )}

              {/* Content for "Invoices" tab */}
              {getChatTabs(requestTab).includes(CHAT_TABS[2]) && (
                <div className={`h-full ${chatTab === CHAT_TABS[2] ? "block" : "hidden"}`}>
                  <Placeholder label={`Content (${CHAT_TABS[2]})`} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Layout - background is now transparent, allowing parent bg to show */}
      <div className="md:hidden flex flex-col gap-4 w-full h-screen min-h-0 flex-1 mt-[70px] lg:mt-0">
        <MobilePortfolioLayout
          selectedRequest={selectedRequest}
          setSelectedRequest={setSelectedRequest}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          chatComponent={chatComponentInstance}
        />
      </div>
    </div>
  );
}
