"use client";

import React from "react";
import { PortfolioCard } from "@/presentation/atoms/portfolio-card/portfolio-card";
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
  return (
    <Carousel className={cn("w-full", className)}>
      <CarouselContent>
        {items.map((item, index) => (
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
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-white text-[#0f1740] border-none hover:bg-white/90 hover:text-[#0f1740] w-[43px] rounded-full -left-[50px] hidden lg:flex" />
      <CarouselNext className="bg-white text-[#0f1740] border-none hover:bg-white/90 hover:text-[#0f1740] w-[43px] rounded-full -right-[50px] hidden lg:flex" />
    </Carousel>
  );
}