"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProfileProjectCardProps {
  projectName: string;
  progress: number;
  phase: string;
  imageUrl?: string;
  className?: string;
  onClick?: () => void;
  isSelected?: boolean;
}

export function ProfileProjectCard({
  projectName,
  progress,
  phase,
  imageUrl = "https://picsum.photos/455/230",
  className,
  onClick,
  isSelected = false,
}: ProfileProjectCardProps) {
  return (
    <div 
      className={cn(
        "relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200",
        isSelected ? "ring-2 ring-[#8ECF0A]" : "hover:shadow-md",
        className
      )}
      onClick={onClick}
    >
      <div className="relative h-[200px] w-full">
        <Image
          src={imageUrl}
          alt={projectName}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        
        <div className="absolute top-4 left-4 text-white font-semibold text-xl">
          {projectName}
        </div>
        
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <div className="bg-[#8ECF0A]/90 text-white px-3 py-1 rounded-full text-sm">
            {progress}%
          </div>
          <div className="bg-[#2A3B56]/90 text-white px-3 py-1 rounded-full text-sm">
            {phase}
          </div>
        </div>
      </div>
    </div>
  );
}