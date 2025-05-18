import React from 'react';

export const PortfolioCardSmallSkeleton = () => {
  return (
    // Wrapper div for the gradient border
    <div className="w-full h-auto aspect-square p-[1px] bg-gradient-to-r from-[#99CC33] to-[#33CCCC] rounded-lg animate-pulse">
      {/* Original content container, now fills the wrapper */}
      <div className="w-full h-full bg-gray-700/50 rounded-lg overflow-hidden shadow-lg"> {/* Keep rounded-lg here for inner content */}
        <div className="w-full h-full flex flex-col justify-end p-6">
          <div className="h-6 bg-gray-600/50 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-600/50 rounded w-full mb-1"></div>
          <div className="h-4 bg-gray-600/50 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
};