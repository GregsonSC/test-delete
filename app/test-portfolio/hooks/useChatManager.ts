import { useState, useCallback } from "react";
import { mockRequests, mockProjects } from "../mockData"; // Adjust path to mockData from /hooks directory
import { DisplayMessage } from "../../../presentation/atoms/chat/profile-chat"; // Adjust path to DisplayMessage

// Define types for mock data items for clarity within the hook
interface MockRequestItem {
  id: string;
  chat?: { from: string; text: string }[];
  // other properties as they exist in mockData...
}

interface MockProjectItem {
  id: string;
  chat?: { from: string; text: string }[];
  // other properties as they exist in mockData...
}

export function useChatManager() {
  const [currentChatMessages, setCurrentChatMessages] = useState<DisplayMessage[]>([]);
  const [isLoadingChatHistory, setIsLoadingChatHistory] = useState(false);
  const [currentLoadedEntityId, setCurrentLoadedEntityId] = useState<string | null>(null);

  const handleRequestHistoryLoad = useCallback(
    async (entityId: string, entityType: "project" | "request") => {
      if (!entityId || !entityType) {
        setCurrentChatMessages([]);
        setIsLoadingChatHistory(false);
        setCurrentLoadedEntityId(null);
        return;
      }

      // If already loaded for this entity and messages are present, don't reload
      if (entityId === currentLoadedEntityId && currentChatMessages.length > 0) {
        // console.log(`useChatManager: History for ${entityType} ID ${entityId} already loaded.`);
        setIsLoadingChatHistory(false); // Ensure loading is false
        return;
      }

      // console.log(`useChatManager: Requesting history for ${entityType} ID: ${entityId}`);
      setIsLoadingChatHistory(true);
      setCurrentChatMessages([]); // Clear messages for new entity or if previously empty

      await new Promise((resolve) => setTimeout(resolve, 500));

      let rawChatData: { from: string; text: string }[] = [];
      if (entityType === "request") {
        const request = (mockRequests as MockRequestItem[]).find(
          (r: MockRequestItem) => r.id === entityId
        );
        if (request && request.chat) {
          rawChatData = request.chat;
        }
      } else if (entityType === "project") {
        const project = (mockProjects as MockProjectItem[]).find(
          (p: MockProjectItem) => p.id === entityId
        );
        if (project && project.chat) {
          rawChatData = project.chat;
        }
      }
      const formattedMessages: DisplayMessage[] = rawChatData.map((msg, index) => ({
        id: `loaded-${entityType}-${entityId}-${index}`,
        content: msg.text,
        role: msg.from === "user" ? "user" : "assistant",
        createdAt: new Date(),
      }));
      setCurrentChatMessages(formattedMessages);
      setCurrentLoadedEntityId(entityId); // Mark this entity as loaded
      setIsLoadingChatHistory(false);
    },
    [currentLoadedEntityId, currentChatMessages.length] // Dependency on currentLoadedEntityId and message count
  );

  const handleSendMessageRequest = useCallback(
    async (content: string, entityId?: string, entityType?: "project" | "request") => {
      if (!entityId || !entityType) return;
      if (entityId !== currentLoadedEntityId) {
        // This should ideally not happen if UI prevents sending to non-active chat.
        // If it does, could trigger a reload or show an error.
        console.warn("Attempted to send message to a chat that is not currently loaded.");
        // Optionally, force a reload to the correct chat before sending:
        // await handleRequestHistoryLoad(entityId, entityType);
        // For now, we'll just proceed, assuming the message list will be for the right entity soon.
      }

      const userMessage: DisplayMessage = {
        id: Date.now().toString(),
        content,
        role: "user",
        createdAt: new Date(),
      };
      setCurrentChatMessages((prev) => [...prev, userMessage]);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      const botMessage: DisplayMessage = {
        id: (Date.now() + 1).toString(),
        content: "Thanks! I've got your message. (Simulated Hook Response)",
        role: "assistant",
        createdAt: new Date(),
      };
      // Ensure bot message is only added if still on the same chat entity
      if (entityId === currentLoadedEntityId) {
        setCurrentChatMessages((prev) => [...prev, botMessage]);
      }
    },
    [currentLoadedEntityId] // Dependency on currentLoadedEntityId for send logic
  );

  // Function to clear chat explicitly, e.g., when no entity is selected
  const clearChatState = useCallback(() => {
    setCurrentChatMessages([]);
    setIsLoadingChatHistory(false);
    setCurrentLoadedEntityId(null); // Also clear the loaded entity ID
  }, []);

  return {
    currentChatMessages,
    isLoadingChatHistory,
    handleRequestHistoryLoad,
    handleSendMessageRequest,
    clearChatState,
    currentLoadedEntityId, // Expose for potential debugging or advanced logic in layout
  };
}
