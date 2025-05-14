"use client";

import React, { useState, useEffect } from "react";
import MobilePortfolioLayout from "./MobilePortfolioLayout";
import { mockRequests, mockProjects } from "../mockData";
import RequestList from "./RequestList";
import ProjectList from "./ProjectList";
import { ProfileChat } from "../../../presentation/atoms/chat/profile-chat";
import { useChatManager } from "../hooks/useChatManager";

// Placeholder components para los espacios internos
const Placeholder = ({ label }: { label: string }) => (
  <div className="flex items-center justify-center h-full w-full text-gray-400 text-lg font-semibold border-2 border-dashed border-gray-300 rounded-lg">
    {label}
  </div>
);

const REQUEST_TABS = ["Requests", "Projects"];
const CHAT_TABS = ["Chat", "Estimated value", "Invoices"];

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

  // Determine current entity for ProfileChat (compact version)
  const isRequestMode = requestTab === "Requests" && selectedRequest;
  const isProjectMode = requestTab === "Projects" && selectedProject;

  const currentEntityId: string | undefined = isRequestMode
    ? selectedRequest! // selectedRequest is non-null if isRequestMode is true
    : isProjectMode
      ? selectedProject! // selectedProject is non-null if isProjectMode is true
      : undefined;

  const currentEntityType: "project" | "request" | undefined = isRequestMode
    ? "request"
    : isProjectMode
      ? "project"
      : undefined;

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
    <div className="w-full bg-[#f6f8fa] p-4 flex flex-col gap-4 min-h-[calc(100vh-64px)] h-[calc(100vh-64px)]">
      {/* Desktop/Tablet Layout */}
      <div className="hidden md:grid grid-cols-3 gap-4 w-full h-full min-h-0">
        {/* Sidebar */}
        <div className="col-span-1 bg-white rounded-xl shadow p-4 flex flex-col gap-4 h-full min-h-0">
          <div className="flex gap-2 mb-2">
            {REQUEST_TABS.map((tab) => (
              <button
                key={tab}
                className={`px-3 py-1 rounded-full font-semibold transition-colors ${
                  requestTab === tab
                    ? "bg-[#eaf7d6] text-[#7bb12b]"
                    : "bg-[#f6f8fa] text-gray-500 border border-[#eaf7d6]"
                }`}
                onClick={() => {
                  setRequestTab(tab);
                  // When switching main tabs, clear specific selections to ensure clean state
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
          <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-4">
            <Placeholder label={getMainDetailsLabel(requestTab)} />
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex-1 flex flex-col gap-4 min-h-0 h-0">
            <div className="flex gap-2 mb-2">
              {getChatTabs(requestTab).map((tab) => (
                <button
                  key={tab}
                  className={`px-3 py-1 rounded-full font-semibold transition-colors ${
                    chatTab === tab
                      ? "bg-[#eaf7d6] text-[#7bb12b]"
                      : "bg-[#f6f8fa] text-gray-500 border border-[#eaf7d6]"
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
      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col gap-4 w-full h-screen min-h-0 bg-black flex-1">
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
