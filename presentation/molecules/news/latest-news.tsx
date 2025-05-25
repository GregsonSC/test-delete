"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HoverCardImage } from "@/presentation/molecules/hover-card-image/hover-card-image";
import { BlogViewModel } from "@/presentation/pages/blog/BlogViewModel";
import { HoverCardImageSkeleton } from "@/presentation/molecules/hover-card-image/hover-card-image-skeleton";
import { StudyCaseViewModel } from "./StudyCaseViewModel";
import { Blog } from "@/components/interface/modules/Blog";
import { StudyCase } from "@/components/interface/modules/StudyCase";

// Skeleton para StudyCases fuera del componente principal
function StudyCaseSkeleton() {
  return (
    <div className="w-full h-full ml-5 sm:ml-0 bg-[#1A1A1A] rounded-lg overflow-hidden flex flex-col border-2 border-[#8ECF0A] shadow-[0_0_15px_rgba(142,207,10,0.5)] animate-pulse">
      <div className="p-3 sm:p-4 md:p-6 bg-[#1A1A1A] text-center">
        <div className="h-6 bg-gray-700 rounded w-3/4 mx-auto mb-2" />
        <div className="h-4 bg-gray-800 rounded w-2/3 mx-auto" />
      </div>
      <div
        className="flex-grow flex items-center justify-center"
        style={{ maxHeight: "336px", height: "auto" }}
      >
        <div className="w-full h-full bg-gray-900" />
      </div>
    </div>
  );
}

export function LatestNews() {
  const { posts, loading } = BlogViewModel();
  const { StudyCases, loading: loadingCases, error: errorCases } = StudyCaseViewModel();
  const [activeTab, setActiveTab] = React.useState<string>("blog");

  // Get the 6 most recent posts
  const recentPosts: Blog[] = [...posts].slice(-6);

  // Last 6 items para casos de estudio
  const recentCases = [...StudyCases].slice(-6);

  // Determine if we should show tabs (both arrays have items)
  const showTabs = recentPosts.length > 0 && recentCases.length > 0;

  // Choose which array to display based on active tab or available data
  const itemsToDisplay = activeTab === "blog" ? recentPosts : recentCases;
  const displayType = activeTab;

  return (
    <div className="w-full py-12 text-white bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/marketing/background-marketing.webp')" }}>
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-center mb-8">
          <div className="text-center lg:text-left w-full lg:w-auto">
            <h2 className="text-[32px] md:text-[42px] font-[700] mb-2 text-white">Latest News</h2>
            <p className="text-[16px] font-[600] text-white">
              Stay up-to-date with our latest industry news on marketing and web design trends.
            </p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="mt-6 lg:mt-0 mx-auto lg:mx-0"
          >
            <TabsList className="p-0 overflow-hidden rounded-full flex w-[280px] h-[42px]">
              <TabsTrigger
                value="blog"
                className="text-[16px] md:text-[18px] font-[700] rounded-l-full rounded-r-none px-6 py-2 w-1/2
                  data-[state=active]:bg-white data-[state=active]:text-[#739926]
                  data-[state=inactive]:bg-[#739926] data-[state=inactive]:text-[#D3E8A9]
                  transition-all duration-300 ease-in-out
                  hover:brightness-110 hover:shadow-md"
              >
                Blog
              </TabsTrigger>
              <TabsTrigger
                value="cases"
                className="text-[16px] md:text-[18px] font-[700] rounded-r-full rounded-l-none px-6 py-2 w-1/2
                  data-[state=active]:bg-white data-[state=active]:text-[#739926]
                  data-[state=inactive]:bg-[#739926] data-[state=inactive]:text-[#D3E8A9]
                  transition-all duration-300 ease-in-out
                  hover:brightness-110 hover:shadow-md"
              >
                Study Cases
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="relative mx-auto max-w-[1200px] px-3 sm:px-4">
          <Carousel
            className="w-full px-0 sm:px-14"
            opts={{
              slidesToScroll: 1,
              align: !showTabs || activeTab === "blog" ? "start" : "center",
              breakpoints:
                !showTabs || activeTab === "blog"
                  ? {
                      "(min-width: 1024px)": {
                        slidesToScroll: 2,
                      },
                      "(min-width: 1280px)": {
                        slidesToScroll: 3,
                      },
                    }
                  : {
                      "(min-width: 768px)": {
                        slidesToScroll: 1,
                      },
                    },
            }}
          >
            <CarouselContent className="py-2 sm:py-6">
              {displayType === "blog" &&
                (loading
                  ? Array.from({ length: 3 }).map((_, idx) => (
                      <CarouselItem
                        key={`blog-skeleton-${idx}`}
                        className={
                          "basis-full lg:basis-1/2 xl:basis-1/3 flex justify-center px-0 sm:px-2"
                        }
                      >
                        <div className="relative w-full h-full flex justify-center max-w-[319px]">
                          <HoverCardImageSkeleton />
                        </div>
                      </CarouselItem>
                    ))
                  : itemsToDisplay.map((item) => (
                      <CarouselItem
                        key={item.id}
                        className={
                          "basis-full lg:basis-1/2 xl:basis-1/3 flex justify-center px-0 sm:px-2"
                        }
                      >
                        <div className="relative w-full h-full flex justify-center max-w-[319px]">
                          <HoverCardImage
                            image={(item as Blog).imageUrl}
                            title={(item as Blog).title}
                            content={(item as Blog).content.quote}
                            date={(item as Blog).publicationDate.slice(0, 10)}
                            tag={
                              (item as Blog).topic === "WEBDESIGN"
                                ? "Web Development"
                                : (item as Blog).topic === "DIGITALMARKETING"
                                  ? "Marketing"
                                  : "Marketing"
                            }
                            href={`/blog/${item.id}`}
                          />
                        </div>
                      </CarouselItem>
                    )))}
              {displayType === "cases" &&
                (loadingCases ? (
                  Array.from({ length: 3 }).map((_, idx) => (
                    <CarouselItem
                      key={`studycase-skeleton-${idx}`}
                      className={
                        "basis-full sm:basis-full md:basis-full flex justify-center px-0 sm:px-2"
                      }
                    >
                      <div className="relative w-full h-full flex justify-center max-w-[319px] md:max-w-[600px]">
                        <StudyCaseSkeleton />
                      </div>
                    </CarouselItem>
                  ))
                ) : errorCases ? (
                  <div className="text-red-500 text-center">{errorCases}</div>
                ) : (
                  itemsToDisplay.map((item) => (
                    <CarouselItem
                      key={item.id}
                      className={
                        "basis-full sm:basis-full md:basis-full flex justify-center px-0 sm:px-2"
                      }
                    >
                      <div className="relative w-full h-full flex justify-center max-w-[319px] md:max-w-[600px]">
                        <div className="w-full h-full ml-5 sm:ml-0 bg-[#1A1A1A] rounded-lg overflow-hidden flex flex-col border-2 border-[#8ECF0A] shadow-[0_0_15px_rgba(142,207,10,0.5)]">
                          <div className="p-3 sm:p-4 md:p-6 bg-[#1A1A1A] text-center">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 md:mb-2 text-white">
                              {(item as StudyCase).title}
                            </h3>
                            <p className="text-xs sm:text-sm text-white/80">
                              {(item as StudyCase).resume}
                            </p>
                          </div>
                          <div
                            className="flex-grow flex items-center justify-center"
                            style={{ maxHeight: "336px", height: "auto" }}
                          >
                            <iframe
                              src={(item as StudyCase).videoUrl}
                              title={(item as StudyCase).title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))
                ))}
            </CarouselContent>

            <CarouselPrevious className="bg-white text-black hover:bg-white/90 border-none left-0 hidden sm:flex" />
            <CarouselNext className="bg-white text-black hover:bg-white/90 border-none right-0 hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
