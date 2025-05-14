import React from "react";
import { RequestCard } from "@/presentation/atoms/profile-project/request/request-card";

export default function RequestList({
  requests,
  selectedId,
  onSelect,
  className = "",
}: {
  requests: { id: string; name: string; status: string }[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className} flex-1 overflow-y-auto min-h-0`}>
      <h2 className="font-semibold text-lg mb-2 md:hidden">My Requests</h2>
      {requests.map((req) => (
        <button key={req.id} className="text-left" onClick={() => onSelect(req.id)}>
          <RequestCard
            requestName={req.name}
            leadStatus={req.status}
            isSelected={req.id === selectedId}
          />
        </button>
      ))}
    </div>
  );
}
