import React from "react";

const TABS = ["Chat", "Documents"];

export default function ProjectDetailMobile({
  project,
  tab,
  setTab,
  chatComponent,
}: {
  project: any;
  tab: string;
  setTab: (tab: string) => void;
  chatComponent: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 h-full min-h-0">
      <h2 className="font-bold text-xl mb-2">{project.name}</h2>
      <div className="flex gap-2 mb-2 flex-shrink-0">
        {TABS.map((t) => (
          <button
            key={t}
            className={`px-3 py-1 rounded-full font-semibold transition-colors ${
              tab === t
                ? "bg-[#eaf7d6] text-[#7bb12b]"
                : "bg-[#f6f8fa] text-gray-500 border border-[#eaf7d6]"
            }`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex-1 min-h-0">
        {tab === "Chat" ? (
          chatComponent
        ) : (
          <div className="flex flex-col gap-2 overflow-y-auto">
            {project.documents.map((doc: any, i: number) => (
              <div key={i} className="rounded-lg p-2 bg-gray-100">
                {doc.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
