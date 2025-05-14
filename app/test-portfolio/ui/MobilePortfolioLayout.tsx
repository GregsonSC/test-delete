"use client";
import React, { useState } from "react";
import { mockProjects, mockRequests } from "../mockData";
import ProjectList from "./ProjectList";
import RequestList from "./RequestList";
import ProjectDetailMobile from "./ProjectDetailMobile";
import RequestDetailMobile from "./RequestDetailMobile";

const REQUEST_TABS = ["Requests", "Projects"];

type Props = {
  selectedRequest: string | null;
  setSelectedRequest: (id: string | null) => void;
  selectedProject: string | null;
  setSelectedProject: (id: string | null) => void;
  chatComponent: React.ReactNode;
};

export default function MobilePortfolioLayout({
  selectedRequest,
  setSelectedRequest,
  selectedProject,
  setSelectedProject,
  chatComponent,
}: Props) {
  const [tab, setTab] = useState<(typeof REQUEST_TABS)[number]>(REQUEST_TABS[0]);
  const [projectDetailTab, setProjectDetailTab] = useState("Chat");

  // Navegación: si hay seleccionado, mostrar detalle, si no, lista
  if (tab === "Projects" && selectedProject) {
    const project = mockProjects.find((p) => p.id === selectedProject);
    if (!project) return null;
    return (
      <div className="flex flex-col gap-4 flex-1 min-h-0 overflow-y-auto">
        <ProjectDetailMobile
          project={project}
          tab={projectDetailTab}
          setTab={setProjectDetailTab}
          chatComponent={chatComponent}
        />
        <button className="mt-4 text-blue-600 underline" onClick={() => setSelectedProject(null)}>
          Volver a proyectos
        </button>
      </div>
    );
  }
  if (tab === "Requests" && selectedRequest) {
    const request = mockRequests.find((r) => r.id === selectedRequest);
    if (!request) return null;
    return (
      <div className="flex flex-col gap-4 flex-1 min-h-0 overflow-y-auto">
        <RequestDetailMobile request={request} chatComponent={chatComponent} />
        <button className="mt-4 text-blue-600 underline" onClick={() => setSelectedRequest(null)}>
          Volver a requests
        </button>
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
            className={`px-3 py-1 rounded-full font-semibold transition-colors ${
              tab === t
                ? "bg-[#eaf7d6] text-[#7bb12b]"
                : "bg-[#f6f8fa] text-gray-500 border border-[#eaf7d6]"
            }`}
            onClick={() => {
              setTab(t);
              setSelectedProject(null);
              setSelectedRequest(null);
            }}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto">
        {tab === "Projects" ? (
          <ProjectList
            projects={mockProjects}
            selectedId={selectedProject}
            onSelect={setSelectedProject}
          />
        ) : (
          <RequestList
            requests={mockRequests}
            selectedId={selectedRequest}
            onSelect={setSelectedRequest}
          />
        )}
      </div>
    </div>
  );
}
