"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  createdAt: Date;
}

export function ProfileChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you with your project today?",
      role: "assistant",
      createdAt: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      createdAt: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'd be happy to discuss the layout. What specific aspects are you looking to improve?",
        role: "assistant",
        createdAt: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    handleSendMessage(input);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      
      <div 
            ref={chatContainerRef} 
            className="flex-1 overflow-y-auto mb-2 space-y-4" 
            style={{ 
              msOverflowStyle: 'none',  /* IE and Edge */
              scrollbarWidth: 'none',   /* Firefox */
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;  /* Chrome, Safari and Opera */
              }
            `}</style>
            {messages.map(message => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
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

        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-400">
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-75"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-auto">
        <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Write your message..."
            className="flex-1 bg-transparent text-gray-800 placeholder:text-gray-400 px-4 py-3 focus:outline-none"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          <button 
            type="submit" 
            className="p-2 rounded-full mr-1 text-white bg-[#abd45a] hover:bg-[#99cc33]"
            aria-label="Send message"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}