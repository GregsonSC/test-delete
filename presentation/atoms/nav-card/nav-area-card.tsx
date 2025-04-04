"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface SubLink {
  name: string;
  href: string;
}

interface AreaLink {
  name: string;
  href: string;
  subLinks: SubLink[];
}

interface NavAreaCardProps {
  title: string;
  links: AreaLink[];
  className?: string;
  onClick?: () => void;
}

export function NavAreaCard({
  title,
  links,
  className,
  onClick,
}: NavAreaCardProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div
      className={cn(
        "rounded-xl bg-[#ffffff] p-4 transition-all duration-300 ease-in-out shadow shadow-gray-200 transform",
        className
      )}
    >
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-bold text-gray-800 mb-3">{title}</h3>
        
        <div className="flex-1 space-y-2">
          {links.map((link, index) => (
            <div key={index} className="border-b border-gray-100 pb-2">
              <button 
                className="w-full flex items-center justify-between text-gray-800 hover:text-[#8ECF0A] transition-colors"
                onClick={toggleExpand(index)}
              >
                <div className="flex items-center">
                  <span className="w-5 h-5 inline-flex items-center justify-center rounded-full bg-gray-100 mr-2">
                    <Image 
                      src="/images/navbar/area.svg"
                      alt="Area icon"
                      width={14}
                      height={14}
                    />
                  </span>
                  {link.name}
                </div>
                <ChevronDown 
                  className={cn(
                    "h-4 w-4 transition-transform duration-300",
                    expandedIndex === index && "rotate-180"
                  )}
                />
              </button>
              
              <div 
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  expandedIndex === index ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
                )}
              >
                <div className="pl-7 space-y-2">
                  {link.subLinks && link.subLinks.map((subLink, subIndex) => (
                    <div key={subIndex} className="flex items-center text-gray-600 text-sm">
                      <span className="mr-2">•</span>
                      <Link 
                        href={subLink.href}
                        className="hover:text-[#8ECF0A] transition-colors"
                        onClick={onClick}
                      >
                        {subLink.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}