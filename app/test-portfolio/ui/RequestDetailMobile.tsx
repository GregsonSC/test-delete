import React from "react";

export default function RequestDetailMobile({
  request,
  chatComponent,
}: {
  request: any;
  chatComponent: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 h-full min-h-0">
      <div className="bg-white rounded-xl shadow p-4 mb-2 flex-shrink-0">
        <div className="font-bold text-xl mb-1">{request.name}</div>
        <div className="text-sm text-gray-600 mb-1">
          {request.service} &bull; {request.plan}
        </div>
        <div className="text-xs text-gray-400 mb-2">{request.status}</div>
        <div className="text-gray-700 text-sm mb-2">{request.description}</div>
      </div>
      <div className="flex-1 min-h-0">{chatComponent}</div>
    </div>
  );
}
