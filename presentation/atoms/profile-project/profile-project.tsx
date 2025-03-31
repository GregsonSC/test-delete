"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProfileProjectProps {
  variant?: "blue" | "white";
  width?: number;
  height?: number;
  text?: string;
  className?: string;
}

export function ProfileProject({
  variant = "blue",
  width = 300,
  height = 200,
  text,
  className,
}: ProfileProjectProps) {
  const imageSrc = variant === "blue" 
    ? "/images/projects/profile-project-blue.svg" 
    : "/images/projects/profile-project-white.svg";

  // Calculate font size based on image dimensions
  const fontSize = Math.max(Math.min(width / 25, 16), 10); // Min 10px, max 16px
  const padding = Math.max(width / 30, 8); // Scale padding with width

  return (
    <div 
      className={cn("relative", className)}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <Image
        src={imageSrc}
        alt="Project Profile"
        width={width}
        height={height}
        className="w-full h-full object-contain"
      />
      
      {text && (
        <div 
          className="absolute bottom-0 left-0 z-10 w-full text-center"
          style={{ 
            paddingTop: `${padding}px`,
            paddingRight: `${padding}px`,
            paddingBottom: `${padding}px`,
            paddingLeft: `${padding}px`
          }}
        >
          <span 
            className={cn(
              "font-medium inline-block",
              variant === "blue" ? "text-white" : "text-gray-800"
            )}
            style={{ 
              fontSize: `${fontSize}px`,
              maxWidth: `${width - (padding * 2)}px`,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}
          >
            {text}
          </span>
        </div>
      )}
    </div>
  );
}