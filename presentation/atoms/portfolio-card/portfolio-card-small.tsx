import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PortfolioCardSmallProps {
  title: string;
  description?: string;
  imageUrl?: string;
  href: string;
  variant?: 'default' | 'overlay';
  className?: string;
}

export function PortfolioCardSmall({
  title,
  description,
  imageUrl = 'https://picsum.photos/500/500',
  href,
  variant = 'default',
  className,
}: PortfolioCardSmallProps) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-lg shadow-lg max-w-[500px] max-h-[500px] w-full h-full",
        "transition-all duration-300 hover:shadow-xl",
        className
      )}
    >
      {/* Background Image */}
      <div className="relative w-full h-full aspect-square">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
        
        {/* Overlay */}
        {variant === 'default' ? (
          // Default variant - just title at bottom left
          <div className="absolute inset-0 bg-[#0f1740]/70 flex items-end p-6">
            <h3 className="text-[48px] font-bold font-[700] text-white">{title}</h3>
          </div>
        ) : (
          // Overlay variant with decorative elements
          <div className="absolute inset-0 bg-[#99CC33]/20 flex flex-col justify-center items-center p-6">
            {/* Decorative elements - SVGs on the left side */}
            <div className="absolute inset-0">
              {/* Green rectangle first (bottom layer) */}
              <div className="absolute top-0 left-0 h-full">
                <Image 
                  src="/images/portfolio/rectangle-green.svg" 
                  alt="Decorative element" 
                  width={250}
                  height={500}
                  className="h-full w-auto"
                />
              </div>
              
              {/* Gray rectangle on top */}
              <div className="absolute top-0 left-0 h-full">
                <Image 
                  src="/images/portfolio/rectangle-gray.svg" 
                  alt="Decorative element" 
                  width={250}
                  height={500}
                  className="h-full w-auto"
                />
              </div>
            </div>
            
            {/* Content - centered over the image */}
            <div className="relative z-20 text-center max-w-xs">
              <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
              {description && <p className="text-gray-200 mb-5 text-sm">{description}</p>}
              <Link 
                href={href} 
                className="inline-block px-5 py-2 rounded-full bg-[#8ECF0A] text-[#060B20] hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] font-medium transition-all"
              >
                Visit Site
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}