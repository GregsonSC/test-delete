"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavAreaCardProps {
  title: string;
  links: Array<{
    name: string;
    href: string;
  }>;
  className?: string;
  onClick?: () => void;
}

export function NavAreaCard({
  title,
  links,
  className,
  onClick,
}: NavAreaCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-[#ffffff] p-4 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#d3e8a9] shadow shadow-gray-200 transform",
        className
      )}
      onClick={onClick}
    >
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-bold text-gray-800 mb-3">{title}</h3>
        
        <ul className="flex-1 space-y-1">
          {links.map((link, index) => (
            <li key={index}>
              <Link 
                href={link.href}
                className="text-gray-600 hover:text-[#8ECF0A] transition-colors text-sm flex items-center"
              >
                <span className="mr-1">•</span>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}