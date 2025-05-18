import React from "react";
import { ProfileProjectCard } from "@/presentation/atoms/profile-project/profile-project-card";

export default function ProjectList({
  projects,
  selectedId,
  onSelect,
  className = "",
}: {
  projects: {
    id: string;
    name: string;
    status: string;
    progress?: number;
    phase?: string;
    imageUrl?: string;
  }[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className} flex-1 overflow-y-auto min-h-0`}>
      <h2 className="font-semibold text-lg mb-2 md:hidden">My Projects</h2>
      {projects.map((project) => (
        <button key={project.id} className="text-left" onClick={() => onSelect(project.id)}>
          <ProfileProjectCard
            projectName={project.name}
            progress={project.progress || 0}
            phase={project.status}
            imageUrl={project.imageUrl}
            isSelected={project.id === selectedId}
          />
        </button>
      ))}
    </div>
  );
}
