"use client";
import React, { useState } from "react";
import { mockProjects, mockRequests } from "../mockData";
import ProjectList from "./ProjectList";
import RequestList from "./RequestList";
import { ProfileProjectDetail } from "../../../presentation/atoms/profile-project/profile-project-detail";
import { RequestDetail } from "../../../presentation/atoms/profile-project/request/request-detail";

const REQUEST_TABS = ["Requests", "Projects"];

type Props = {
  requestTab: string;
  setRequestTab: (tab: string) => void;
  selectedRequest: string | null;
  setSelectedRequest: (id: string | null) => void;
  selectedProject: string | null;
  setSelectedProject: (id: string | null) => void;
  chatComponent: React.ReactNode;
  handleSelectProject: (id: string) => void;
  handleSelectRequest: (id: string) => void;
};

export default function MobilePortfolioLayout({
  requestTab,
  setRequestTab,
  selectedRequest,
  selectedProject,
  chatComponent,
  handleSelectProject,
  handleSelectRequest,
}: Props) {
  const [projectDetailTab, setProjectDetailTab] = useState("Chat");

  // Navegación: si hay seleccionado, mostrar detalle, si no, lista
  if (requestTab === "Projects" && selectedProject) {
    const project = mockProjects.find((p) => p.id === selectedProject);
    if (!project) return null;
    return (
      <div className="flex flex-col gap-4 flex-1 min-h-0 overflow-y-auto">
        <div className="flex flex-col gap-2 h-full min-h-0">
          <h2 className="font-bold text-xl mb-2">{project.name}</h2>
          <div className="flex gap-2 mb-2 flex-shrink-0">
            {["Chat", "Documents"].map((t) => (
              <button
                key={t}
                className={`px-3 py-1 rounded-full font-bold border-2 transition-colors text-[14px] h-8 ${
                  projectDetailTab === t
                    ? "bg-[#99CC33] text-[#13103A] border-[#99CC33]"
                    : "bg-transparent text-[#99CC33] border-[#99CC33]"
                }`}
                onClick={() => setProjectDetailTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex-1 min-h-0 h-full">
            {projectDetailTab === "Chat" ? (
              chatComponent
            ) : (
              <div className="flex flex-col gap-4 flex-1 min-h-0 h-full overflow-y-auto pr-2">
                {(project.details || []).map((detail: any, idx: number) => (
                  <ProfileProjectDetail
                    key={idx}
                    description={detail.description}
                    documents={detail.documents.map((doc: any, j: number) => ({
                      id: `${project.id}-${idx}-${j}`,
                      name: doc.name,
                      url: `/docs/${doc.name}`,
                    }))}
                    date={detail.date ? new Date(detail.date) : undefined}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  if (requestTab === "Requests" && selectedRequest) {
    const request = mockRequests.find((r) => r.id === selectedRequest);
    if (!request) return null;
    return (
      <div className="flex flex-col gap-4 flex-1 min-h-0 overflow-y-auto">
        <RequestDetail
          requestName={request.name}
          associatedService={request.service}
          companyPlan={request.plan}
          description={request.description}
          leadStatus={request.status}
        />
        <div className="flex-1 min-h-0">{chatComponent}</div>
      </div>
    );
  }
  // Lista principal
  return (
    <div className="flex flex-col gap-4 w-full h-full min-h-0 flex-1 overflow-y-auto">
      <div className="flex gap-2 mb-2">
        {REQUEST_TABS.map((t) => (
          <button
            key={t}
            className={`px-3 py-1 rounded-full font-bold border-2 transition-colors text-[14px] h-8 ${
              requestTab === t
                ? "bg-[#99CC33] text-[#13103A] border-[#99CC33]"
                : "bg-transparent text-[#99CC33] border-[#99CC33]"
            }`}
            onClick={() => {
              setRequestTab(t);
            }}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto">
        {requestTab === "Projects" ? (
          <ProjectList
            projects={mockProjects}
            selectedId={selectedProject}
            onSelect={handleSelectProject}
          />
        ) : (
          <RequestList
            requests={mockRequests}
            selectedId={selectedRequest}
            onSelect={handleSelectRequest}
          />
        )}
      </div>
    </div>
  );
}
