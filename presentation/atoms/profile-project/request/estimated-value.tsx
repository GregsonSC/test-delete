"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names

// Define the structure for each item in the estimate
interface EstimatedItem {
  name: string;
  value: number;
}

// Define the structure for an estimate group
interface EstimateGroup {
  title: string;
  items: EstimatedItem[];
}

// Define the props for the EstimatedValue component
interface EstimatedValueProps {
  estimates: EstimateGroup[]; // Now accepts an array of estimate groups
  currencySymbol?: string; // Optional currency symbol, defaults to $
  onAccept?: (estimateIndex: number) => void; // Modified to include which estimate was accepted
  onDecline?: (estimateIndex: number, reason?: string) => void; // Modified to include which estimate was declined
  status?: string; 
}

// Helper function to format currency
const formatCurrency = (value: number, symbol: string = "$") => {
  // Using Intl.NumberFormat for better localization and formatting
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD', // Adjust currency code if needed
    currencyDisplay: 'symbol', // Use symbol like $
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  }).format(value).replace('USD', symbol); // Replace default code if symbol provided
};

export function EstimatedValue({
  estimates,
  currencySymbol = "$",
  onAccept,
  onDecline,
  status,
}: EstimatedValueProps) {
  // Track open/decline state for each estimate
  const [openStates, setOpenStates] = useState<boolean[]>(new Array(estimates.length).fill(false));
  const [showDeclineReasons, setShowDeclineReasons] = useState<boolean[]>(new Array(estimates.length).fill(false));
  const [declineMessages, setDeclineMessages] = useState<string[]>(new Array(estimates.length).fill(""));

  // --- Render Logic ---

  return (
    <div className="space-y-4">
      {estimates.map((estimate, index) => {
        // Calculate the total value for this estimate
        const totalValue = estimate.items.reduce((sum, item) => sum + item.value, 0);
        
        const isOpen = openStates[index];
        const showDeclineReason = showDeclineReasons[index];
        
        // Handlers for this specific estimate
        const handleToggle = () => {
          if (showDeclineReason) return;
          const newOpenStates = [...openStates];
          newOpenStates[index] = !newOpenStates[index];
          setOpenStates(newOpenStates);
        };
        
        const handleInitiateDecline = (e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          const newShowDeclineReasons = [...showDeclineReasons];
          newShowDeclineReasons[index] = true;
          setShowDeclineReasons(newShowDeclineReasons);
        };
        
        const handleCancelDecline = (e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          const newShowDeclineReasons = [...showDeclineReasons];
          newShowDeclineReasons[index] = false;
          setShowDeclineReasons(newShowDeclineReasons);
          
          const newDeclineMessages = [...declineMessages];
          newDeclineMessages[index] = "";
          setDeclineMessages(newDeclineMessages);
        };
        
        const handleConfirmDecline = (e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          if (onDecline) {
            onDecline(index, declineMessages[index]);
          }
          
          const newShowDeclineReasons = [...showDeclineReasons];
          newShowDeclineReasons[index] = false;
          setShowDeclineReasons(newShowDeclineReasons);
          
          const newOpenStates = [...openStates];
          newOpenStates[index] = false;
          setOpenStates(newOpenStates);
          
          const newDeclineMessages = [...declineMessages];
          newDeclineMessages[index] = "";
          setDeclineMessages(newDeclineMessages);
        };
        
        const handleDeclineMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
          const newDeclineMessages = [...declineMessages];
          newDeclineMessages[index] = e.target.value;
          setDeclineMessages(newDeclineMessages);
        };
        
        return (
          <div
            key={index}
            className={cn(
              "rounded-lg transition-all duration-300 ease-in-out overflow-hidden relative",
              isOpen 
                ? "p-[3px] bg-gradient-to-r from-[#99CC33] to-[#33CCCC]" 
                : "border border-gray-200 shadow-[0_2px_8px_0_rgba(0,0,0,0.06)]"
            )}
          >
            <div className={cn(
              "w-full h-full bg-white rounded-lg",
              isOpen ? "p-4" : ""
            )}>
              {/* Header (Always Visible, Clickable) */}
              <div
                className={cn(
                  "flex justify-between items-center",
                  isOpen ? "mb-4" : "p-3", // Add padding only when closed
                  "cursor-pointer" // Always clickable
                )}
                onClick={handleToggle}
              >
                <span className="font-bold text-lg text-[#0B1A33]">{estimate.title}</span>
                <span className="font-semibold text-lg text-[#0B1A33]">
                  {formatCurrency(totalValue, currencySymbol)}
                </span>
              </div>

              {/* Main Content Section */}
              <div
                className={cn(
                  "transition-all duration-300 ease-in-out overflow-hidden",
                  isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0",
                  showDeclineReason ? "invisible" : "visible" // Hide when decline reason is showing
                )}
              >
                {/* Item List */}
                <ul className="mb-4 space-y-1 text-[#0B1A33]">
                  {estimate.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex justify-between items-center text-sm ml-4">
                      <span>• {item.name}</span>
                      <span>{formatCurrency(item.value, currencySymbol)}</span>
                    </li>
                  ))}
                </ul>

                {/* Total Row */}
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                  <span className="font-semibold text-[#0B1A33]">Total</span>
                  <span className="font-bold text-[#0B1A33]">
                    {formatCurrency(totalValue, currencySymbol)}
                  </span>
                </div>

                {/* Action Buttons */}
                {(onAccept || onDecline) && (
                  <div className="flex justify-end gap-3 mt-5">
                    {onDecline && (
                      <button
                        onClick={handleInitiateDecline} 
                        className="px-5 py-1 bg-[#99CC33] text-white rounded-full text-sm font-semibold hover:bg-opacity-90 transition-colors"
                      >
                        Decline
                      </button>
                    )}
                    {onAccept && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); 
                          if (onAccept) onAccept(index);
                          
                          const newOpenStates = [...openStates];
                          newOpenStates[index] = false;
                          setOpenStates(newOpenStates);
                        }}
                        className="px-5 py-1 bg-[#99CC33] text-white rounded-full text-sm font-semibold hover:bg-opacity-90 transition-colors"
                      >
                        Accept
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Decline Reason Section (Overlay) */}
            <div 
              className={cn(
                "absolute top-[3px] left-[3px] right-[3px] bottom-[3px] bg-white p-4 flex flex-col rounded-lg",
                "transition-all duration-300 ease-in-out",
                showDeclineReason 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-full pointer-events-none"
              )}
            >
              <h3 className="font-bold text-lg text-[#0B1A33] mb-2">Decline Reason</h3>
              <textarea
                value={declineMessages[index]}
                onChange={handleDeclineMessageChange}
                placeholder="Type your message here."
                className="w-full p-2 border border-gray-300 rounded-md resize-none text-sm text-[#4A5568] placeholder-gray-400 flex-grow bg-white outline-none focus:outline-none focus:border-gray-300"
                rows={6}
              />
              <div className="flex justify-end gap-3 mt-auto pt-3">
                <button
                  onClick={handleCancelDecline}
                  className="px-5 py-1 bg-transparent text-[#99CC33] border border-[#99CC33] rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors"
                >
                  Go Back
                </button>
                <button
                  onClick={handleConfirmDecline}
                  className="px-5 py-1 bg-[#99CC33] text-white rounded-full text-sm font-semibold hover:bg-opacity-90 transition-colors"
                  disabled={!declineMessages[index].trim()}
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}