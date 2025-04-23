"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names

// Define the structure for each item in the estimate
interface EstimatedItem {
  name: string;
  value: number;
}

// Define the props for the EstimatedValue component
interface EstimatedValueProps {
  title: string;
  items: EstimatedItem[];
  currencySymbol?: string; // Optional currency symbol, defaults to $
  onAccept?: () => void; // Optional handler for Accept button
  onDecline?: (reason?: string) => void; 
  displayMode?: "full" | "summary"; // Add displayMode prop
  // Add other potential props like status if needed for summary view styling
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
  title,
  items,
  currencySymbol = "$",
  onAccept,
  onDecline,
  displayMode = "full", // Default to full view
  status, // Receive status prop
}: EstimatedValueProps) {
  // State is only needed for the 'full' display mode
  const [isOpen, setIsOpen] = useState(false);
  const [showDeclineReason, setShowDeclineReason] = useState(false); 
  const [declineMessage, setDeclineMessage] = useState(""); 

  // Calculate the total value using useMemo for efficiency
  const totalValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  // Handlers are only relevant for 'full' display mode
  const handleToggle = () => {
    if (displayMode !== 'full') return; // Only toggle in full mode
    // Reset decline view if closing the main component
    if (isOpen) {
      setShowDeclineReason(false);
      setDeclineMessage("");
    }
    setIsOpen(!isOpen);
  };

  const handleInitiateDecline = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent toggle
    setShowDeclineReason(true); // Show the reason input section
  };

  const handleCancelDecline = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowDeclineReason(false); // Hide the reason input section
    setDeclineMessage(""); // Clear any entered message
  };

  const handleConfirmDecline = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onDecline) {
      onDecline(declineMessage); // Call the original handler with the message
    }
    // Optionally close the component or reset view after sending
    setShowDeclineReason(false); 
    setIsOpen(false); 
    setDeclineMessage("");
  };

  // --- Render Logic ---

  // Summary View (List Item)
  if (displayMode === "summary") {
    return (
      <div
        className={cn(
          "flex justify-between items-center bg-white px-6 py-4 rounded-lg shadow-[0_2px_8px_0_rgba(0,0,0,0.06)] mb-4",
          "border border-[#E6EAF0]",
          "font-bold text-lg text-[#0B1A33]"
        )}
      >
        <span>{title}</span>
        <span>{formatCurrency(totalValue, currencySymbol).replace('.', ',')}</span>
      </div>
    );
  }

  // Full View (Collapsible)
  return (
    <div
      className={cn(
        "rounded-lg border transition-all duration-300 ease-in-out overflow-hidden",
        isOpen ? "border-[#99CC33] bg-white p-4 shadow-md" : "border-gray-200 bg-white" 
      )}
    >
      {/* Header (Always Visible, Clickable in full mode) */}
      <div
        className={cn(
          "flex justify-between items-center",
          isOpen ? "mb-4" : "p-3", // Add padding only when closed
          displayMode === 'full' ? "cursor-pointer" : "" // Only clickable in full mode
        )}
        onClick={handleToggle} // Only toggles in full mode due to handler logic
      >
        <span className="font-bold text-lg text-[#0B1A33]">{title}</span>
        <span className="font-semibold text-lg text-[#0B1A33]">
          {formatCurrency(totalValue, currencySymbol)}
        </span>
      </div>

      {/* Collapsible Details Section (Only in full mode) */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0" 
        )}
      >
        {/* Item List */}
        <ul className="mb-4 space-y-1 text-[#0B1A33]">
          {items.map((item, index) => (
            <li key={index} className="flex justify-between items-center text-sm ml-4">
              <span>• {item.name}</span>
              <span>{formatCurrency(item.value, currencySymbol)}</span>
            </li>
          ))}
        </ul>

        {/* Divider (Optional) */}
        {/* <hr className="my-2 border-gray-200" /> */}

        {/* Total Row */}
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
          <span className="font-semibold text-[#0B1A33]">Total</span>
          <span className="font-bold text-[#0B1A33]">
            {formatCurrency(totalValue, currencySymbol)}
          </span>
        </div>

        {/* Action Buttons */}
        {(onAccept || onDecline) && ( // Only show buttons if handlers are provided
          <div className="flex justify-end gap-3 mt-5">
            {onDecline && (
              <button
                // Update onClick to call handleInitiateDecline
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
                  if (onAccept) onAccept();
                  // Optionally close after accept
                  setIsOpen(false); 
                }}
                className="px-5 py-1 bg-[#99CC33] text-white rounded-full text-sm font-semibold hover:bg-opacity-90 transition-colors"
              >
                Accept
              </button>
            )}
          </div>
        )}

        {/* Decline Reason Section (Conditionally Rendered) */}
        {isOpen && showDeclineReason && (
          <div className="mt-5 pt-4 border-t border-gray-200">
            <h3 className="font-bold text-lg text-[#0B1A33] mb-2">Decline Reason</h3>
            <textarea
              value={declineMessage}
              onChange={(e) => setDeclineMessage(e.target.value)}
              placeholder="Type your message here."
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#99CC33] focus:border-[#99CC33] resize-none text-sm text-gray-700 placeholder-gray-400"
              rows={4}
            />
            <div className="flex justify-end gap-3 mt-3">
              <button
                onClick={handleCancelDecline}
                className="px-5 py-1 bg-transparent text-[#99CC33] border border-[#99CC33] rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={handleConfirmDecline}
                className="px-5 py-1 bg-[#99CC33] text-white rounded-full text-sm font-semibold hover:bg-opacity-90 transition-colors"
                disabled={!declineMessage.trim()} // Optionally disable if no message
              >
                Send Message
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}