import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PortfolioCardProps {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  tags?: string[];
  className?: string;
}

export function PortfolioCard({
  title,
  description,
  imageUrl,
  href,
  tags = [],
  className,
}: PortfolioCardProps) {
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-5 overflow-hidden rounded-lg shadow-lg p-5",
      "bg-[#0f1740] text-white",
      "transition-all duration-300 hover:shadow-xl",
      "max-w-[1142px] mx-auto", // Added max width to make the card wider
      className
    )}>
      {/* Image section - takes up full width on mobile, 3/5 on desktop */}
      <div className="relative w-full h-[280px] md:h-[577px] max-h-[577px] md:col-span-3">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content section - takes up full width on mobile, 2/5 on desktop */}
      <div className="w-full p-5 md:p-8 flex flex-col justify-center gap-10 items-start h-full text-left md:col-span-2">
        {/* Tags section - aligned left */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-4 py-1 bg-white text-[#0f1740] rounded-full text-[14px] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title and description section - aligned left */}
        <div className="text-left w-full">
          <h3 className="text-[30px] font-semibold mb-2 text-left">{title}</h3>
          <p className="text-[18px] font-semibold text-gray-200 text-left">{description}</p>
        </div>

        {/* Button section - aligned left */}
        <div>
          <Link 
            href={href} 
            className="inline-block px-5 py-3 h-auto rounded-full bg-[#8ECF0A] text-[#060B20] hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] font-bold text-[18px] transition-all flex items-center justify-center"
          >
            View Page
          </Link>
        </div>
      </div>
    </div>
  );
}