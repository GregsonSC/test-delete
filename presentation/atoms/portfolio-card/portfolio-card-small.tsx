import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PortfolioItem } from "@/components/interface/modules/Portfolio";

export function PortfolioCardSmall({
  name,
  description,
  imageUrl = "https://picsum.photos/500/500",
  siteUrl,
  className,
}: PortfolioItem & { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg shadow-lg max-w-[500px] max-h-[500px] w-full h-full",
        "transition-all duration-300 hover:shadow-xl group",
        className
      )}
    >
      <div className="relative w-full h-full aspect-square rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
        />

        {/* Default state */}
        <div className="absolute inset-0 bg-[#0f1740]/70 flex items-end p-6 rounded-lg border border-[#8ECF0A] transition-opacity duration-1000 group-hover:opacity-0 sm:group-hover:opacity-0">
          <h3 className="text-3xl max-sm:text-[36px] font-bold text-white transition-opacity duration-2500 group-hover:opacity-0">
            {name}
          </h3>
        </div>

        {/* Hover state */}
        <div className="absolute inset-0 bg-[#99CC33]/20 flex flex-col justify-center p-6 rounded-lg border-2 border-[#8ECF0A] z-20 shadow-[inset_0_0_25px_rgba(142,207,10,0.6)] opacity-0 transition-opacity duration-800 group-hover:opacity-100 sm:group-hover:opacity-100">
          {/* SVGs */}
          <div className="absolute inset-0 rounded-lg overflow-hidden z-10">
            <div className="absolute top-0 left-0 h-full opacity-0 transition-opacity duration-700 delay-300 group-hover:opacity-100">
              <Image
                src="/images/portfolio/rectangle-green.svg"
                alt="Decorative element"
                width={250}
                height={500}
                className="h-full w-auto"
              />
            </div>

            <div className="absolute top-0 left-0 h-full opacity-0 transition-opacity duration-700 delay-300 group-hover:opacity-100">
              <Image
                src="/images/portfolio/rectangle-gray.svg"
                alt="Decorative element"
                width={250}
                height={500}
                className="h-full w-auto"
              />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-20 max-w-[200px] max-[380px]:max-w-[150px] ml-4 text-left opacity-0 transition-opacity duration-700 delay-150 group-hover:opacity-100 flex flex-col">
            <h3 className="text-[15px] font-bold text-white mb-3">{name}</h3>
            {description && <p className="text-gray-200 mb-5 text-[10px]">{description}</p>}
            <Link
              href={siteUrl}
              className="inline-block px-5 py-1.5 rounded-full bg-[#8ECF0A] text-[#060B20] hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] text-[10px] font-[600] transition-all w-fit"
            >
              Visit Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
