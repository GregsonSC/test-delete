import React from 'react';
import { cn } from '@/lib/utils';

export function PortfolioCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-5 overflow-hidden rounded-lg p-4",
      "bg-[#0A1248] text-white border border-[#8ECF0A]/50 shadow-[0_0_15px_rgba(142,207,10,0.2)]", // Slightly muted border/shadow
      "max-w-[1000px] mx-auto animate-pulse", // Added animate-pulse
      className
    )}>
      {/* Image section placeholder */}
      <div className="relative w-full h-[240px] md:h-[500px] max-h-[500px] md:col-span-3 bg-gray-700/50 rounded">
        {/* You can add a simple placeholder icon or leave it blank */}
      </div>

      {/* Content section placeholder */}
      <div className="w-full p-4 md:p-6 flex flex-col justify-center gap-8 items-start h-full text-left md:col-span-2">
        {/* Tags section placeholder */}
        <div className="flex flex-wrap gap-2">
          <div className="px-3 py-1 h-6 w-20 bg-gray-600/50 rounded-full"></div>
          <div className="px-3 py-1 h-6 w-24 bg-gray-600/50 rounded-full"></div>
        </div>

        {/* Title and description section placeholder */}
        <div className="text-left w-full">
          <div className="h-7 w-3/4 bg-gray-600/50 rounded mb-3"></div> {/* Title placeholder */}
          <div className="h-5 w-full bg-gray-600/50 rounded mb-1"></div> {/* Description line 1 */}
          <div className="h-5 w-5/6 bg-gray-600/50 rounded"></div>    {/* Description line 2 */}
        </div>

        {/* Button section placeholder */}
        <div>
          <div className="h-10 w-32 px-4 py-2 bg-gray-600/50 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}