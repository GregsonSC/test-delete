"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavCardProps {
  title: string;
  description: string;
  iconUrl?: string;
  href: string;
  className?: string;
  onClick?: () => void;
}

export function NavCard({
  title,
  description,
  iconUrl = "/images/navbar/trophy.svg",
  href,
  className,
  onClick,
}: NavCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-[#ffffff] p-4 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#d3e8a9] shadow shadow-gray-200 transform group",
        className
      )}
      onClick={onClick}
    >
      <Link href={href} className="block h-full">
        <div className="flex flex-col h-full">
          <div className="flex">
            {/* Círculo con icono */}
            <div className="flex-shrink-0 mr-4">
              <div className="w-12 h-12 rounded-full bg-[#D8E9A8]/70 flex items-center justify-center transition-all duration-300 group-hover:bg-white">
                <img src={iconUrl} alt="" className="w-8 h-8" />
              </div>
            </div>

            {/* Contenido del título y descripción */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
          </div>

          {/* "Learn More" con flecha animada */}
          <div className="flex justify-end mt-auto pt-2">
            <div className="group inline-flex items-center">
              <span className="text-gray-700 font-medium text-sm transition-all duration-300 group-hover:text-[#3B82F6] mr-1">
                Learn More
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transform translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 text-[#3B82F6]"
              >
                <path d="M2 12h17"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
