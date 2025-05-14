"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";

// This component will no longer import mockData directly for fetching history.
// That logic will be initiated by the parent.

// Type for messages displayed by this component (and managed by parent)
export interface DisplayMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  createdAt: Date;
}

interface ProfileChatProps {
  entityId?: string; // Used to trigger history load via parent
  entityType?: "project" | "request"; // Used to trigger history load via parent
  messagesToDisplay: DisplayMessage[];
  onSendMessageRequest: (
    content: string,
    entityId?: string,
    entityType?: "project" | "request"
  ) => void;
  // Parent will call this when entityId/entityType changes, to load history
  onRequestHistoryLoad: (entityId: string, entityType: "project" | "request") => void;
  isLoadingHistory: boolean; // Prop to indicate if parent is loading history
}

export function ProfileChat({
  entityId,
  entityType,
  messagesToDisplay,
  onSendMessageRequest,
  onRequestHistoryLoad,
  isLoadingHistory,
}: ProfileChatProps) {
  const [input, setInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  // isTyping for bot response simulation can remain local if it's just visual feedback post-send
  const [isBotTypingIndicator, setIsBotTypingIndicator] = useState(false);

  // Effect to request history load when entityId/Type changes
  useEffect(() => {
    if (entityId && entityType) {
      onRequestHistoryLoad(entityId, entityType);
    }
    // If entityId or entityType becomes undefined (e.g. no selection),
    // the parent (TestPortfolioLayout) is responsible for clearing messages via its own effect and clearChatState.
  }, [entityId, entityType, onRequestHistoryLoad]);

  // Auto-scroll to bottom when messages change or loading state changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messagesToDisplay, isLoadingHistory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoadingHistory) return; // Only check parent's loading flag

    onSendMessageRequest(input, entityId, entityType);
    setInput("");
    if (entityId) {
      // Only show bot typing if we are in an active chat
      setIsBotTypingIndicator(true);
      setTimeout(() => setIsBotTypingIndicator(false), 1000);
    }
  };

  // Display messages passed from parent
  const messages = messagesToDisplay;

  return (
    <div className="flex flex-col h-full min-h-0">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto min-h-0 space-y-4"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#d1d5db transparent",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            width: 6px;
          }
          div::-webkit-scrollbar-track {
            background: transparent;
          }
          div::-webkit-scrollbar-thumb {
            background-color: #d1d5db;
            border-radius: 10px;
          }
          div::-webkit-scrollbar-thumb:hover {
            background-color: #9ca3af;
          }
        `}</style>

        {isLoadingHistory && (
          <div className="flex justify-center items-center h-full">
            <div className="text-gray-500">Loading chat history...</div>
          </div>
        )}

        {!isLoadingHistory && messages.length === 0 && entityId && (
          <div className="flex justify-center items-center h-full">
            <div className="text-gray-400">
              No chat history for this item. Start the conversation!
            </div>
          </div>
        )}

        {!isLoadingHistory && messages.length === 0 && !entityId && (
          <div className="flex justify-center items-center h-full">
            <div className="text-gray-400">Select an item to view chat.</div>
          </div>
        )}

        {!isLoadingHistory &&
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex mr-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-300 to-blue-300 mr-4 flex-shrink-0 flex items-center justify-center text-xs">
                  AI
                </div>
              )}
              <div className="relative max-w-[80%]">
                <div
                  className={`px-4 py-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-[#8ECF0A] text-white"
                      : "bg-[#D9ECC7] text-gray-800"
                  }`}
                >
                  {message.content}
                </div>
                {message.role === "assistant" && (
                  <div className="absolute left-[-8px] top-4 w-4 h-4 bg-[#D9ECC7] transform rotate-45"></div>
                )}
              </div>
              {message.role === "user" && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-300 to-blue-300 ml-4 flex-shrink-0 flex items-center justify-center text-white text-xs">
                  US
                </div>
              )}
            </div>
          ))}

        {isBotTypingIndicator && !isLoadingHistory && (
          <div className="flex items-center space-x-2 text-gray-400 ml-14">
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-75"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex-shrink-0 w-full mt-2">
        <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isLoadingHistory
                ? "Loading..."
                : entityId
                  ? "Write your message..."
                  : "Select an item to chat"
            }
            className="flex-1 bg-transparent text-gray-800 placeholder:text-gray-400 px-4 py-3 focus:outline-none"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            disabled={isLoadingHistory || !entityId}
          />
          <button
            type="submit"
            className="p-2 rounded-full mr-1 text-white bg-[#abd45a] hover:bg-[#99cc33] disabled:opacity-50"
            aria-label="Send message"
            disabled={isLoadingHistory || !entityId || !input.trim()}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}
