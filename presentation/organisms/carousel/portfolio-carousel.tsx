"use client";

import React from "react";
import { PortfolioCard } from "@/presentation/atoms/portfolio-card/portfolio-card";
import { PortfolioCardSkeleton } from "@/presentation/atoms/portfolio-card/portfolio-card-skeleton"; // Import the skeleton
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export interface PortfolioItem {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  tags?: string[];
}

interface PortfolioCarouselProps {
  items: PortfolioItem[];
  className?: string;
}

export function PortfolioCarousel({ items, className }: PortfolioCarouselProps) {
  const showSkeleton = !items || items.length === 0;

  return (
    <Carousel className={cn("w-full relative px-0 md:px-10", className)}>
      <CarouselContent>
        {showSkeleton ? (
          <CarouselItem className="md:basis-full lg:basis-full">
            <div className="p-1">
              <PortfolioCardSkeleton />
            </div>
          </CarouselItem>
        ) : (
          items.map((item, index) => (
            <CarouselItem key={index} className="md:basis-full lg:basis-full">
              <div className="p-1">
                <PortfolioCard
                  title={item.title}
                  description={item.description}
                  imageUrl={item.imageUrl}
                  href={item.href}
                  tags={item.tags}
                />
              </div>
            </CarouselItem>
          ))
        )}
      </CarouselContent>
      <CarouselPrevious className="bg-white text-[#0f1740] border-none hover:bg-white/90 hover:text-[#0f1740] w-[35px] h-[35px] rounded-full left-2 hidden md:flex absolute" />
      <CarouselNext className="bg-white text-[#0f1740] border-none hover:bg-white/90 hover:text-[#0f1740] w-[35px] h-[35px] rounded-full right-2 hidden md:flex absolute" />
    </Carousel>
  );
}