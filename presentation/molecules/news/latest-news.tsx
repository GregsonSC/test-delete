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
import { useState, useEffect } from "react";
import {BlogViewModel} from "@/presentation/pages/blog/BlogViewModel";
import { HoverCardImageSkeleton } from "@/presentation/molecules/hover-card-image/hover-card-image-skeleton";
import { StudyCaseViewModel } from "./StudyCaseViewModel";



export interface blogItemInterface {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  tag: string;
}
export interface StudyCaseItemInterface {
  id: string;
  title: string;
  content: string;
  image: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;  image?:string;
  date?: string;
 
 tag?: string;
}


export function LatestNews() {

    const { posts } = BlogViewModel();
    const {StudyCases} = StudyCaseViewModel();
    const [loading, setLoading] = useState(true);

    // Get the 6 most recent posts
    const recentPosts = [...posts].slice(-6);
    
    const blogItems: blogItemInterface[] = recentPosts.map((post) => ({
    id: String(post.id),
    title: post.title,
    content: post.content,
    image: post.imageUrl,
    date: post.publicationDate,
    tag: post.topic,
  }));

    // Last 6 items
    const shuffledCases = [...StudyCases].slice(-6);
    
    const caseItems: StudyCaseItemInterface[] = shuffledCases.map((caseItem) => ({
      id: String(caseItem.id),
      title: caseItem.title,
      content: caseItem.resume,
      image: caseItem.videoUrl
    }));



    useEffect(() => {
        if (posts && posts.length > 0) {
          setLoading(false);
        }
      }, [posts]);

  const [activeTab, setActiveTab] = React.useState("blog");

  // Determine if we should show tabs (both arrays have items)
  const showTabs = blogItems.length > 0 && caseItems.length > 0;

  // Choose which array to display based on active tab or available data
  let itemsToDisplay: NewsItem[] = [];
  let displayType = "blog"; // Default display type

  if (showTabs) {
    // If showing tabs, use the active tab to determine which items to display
    itemsToDisplay = activeTab === "blog" ? blogItems : caseItems;
    displayType = activeTab;
  } else if (blogItems.length > 0) {
    // If only blog items are provided
    itemsToDisplay = blogItems;
    displayType = "blog";
  } else if (caseItems.length > 0) {
    // If only case items are provided
    itemsToDisplay = caseItems;
    displayType = "cases";
  }
  // ! CH004 [ADD] Endpoint para blog y estudio de casos 
  // LISTOOOO pero toca cambiar un poco la logica de los viewmodel cuando este la base de datos a usar porque cambia un poco
  return (
    <div className="w-full py-12 text-white">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-center mb-8">
          <div className="text-center lg:text-left w-full lg:w-auto">
            <h2 className="text-[32px] md:text-[42px] font-[700] mb-2 text-white">Latest News</h2>
            <p className="text-[16px] font-[600] text-white">Stay up-to-date with our latest industry news on marketing and web design trends.</p>
          </div>

          {showTabs && (
            <Tabs
              defaultValue="blog"
              className="mt-6 lg:mt-0 mx-auto lg:mx-0"
              onValueChange={(value) => setActiveTab(value)}
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
          )}
        </div>

        {itemsToDisplay.length > 0 && (
          <div className="relative mx-auto max-w-[1200px] px-3 sm:px-4">
            <Carousel
              className="w-full px-0 sm:px-14"
              opts={{
                slidesToScroll: 1,
                align: (!showTabs || activeTab === "blog") ? "start" : "center",
                breakpoints: (!showTabs || activeTab === "blog") ? {
                  "(min-width: 1024px)": {
                    slidesToScroll: 2
                  },
                  "(min-width: 1280px)": {
                    slidesToScroll: 3
                  }
                } : {
                  "(min-width: 768px)": {
                    slidesToScroll: 1
                  }
                }
              }}
            >
              <CarouselContent className="py-2 sm:py-6">
                {itemsToDisplay.map((item) => (
                  <CarouselItem key={item.id} className={`${displayType === "blog" ? "basis-full lg:basis-1/2 xl:basis-1/3" : "basis-full sm:basis-full md:basis-full"} flex justify-center px-0 sm:px-2`}>
                    <div className={`relative w-full h-full flex justify-center ${displayType === "blog"
                        ? "max-w-[319px]"
                        : "max-w-[319px] md:max-w-[600px]"
                      }`}>
                      {displayType === 'blog' ? (
                        loading ? (
                          <HoverCardImageSkeleton />
                        ) : (
                          <HoverCardImage
                            image={"/images/portfolio/portafolioTestImg.webp"}
                            title={item.title}
                            content={item.content}
                            date={(item as blogItemInterface).date.slice(0,10)}
                            tag={(item as blogItemInterface).tag === "WEBDESIGN" ? "Web Development" : (item as blogItemInterface).tag === "DIGITALMARKETING" ? "Marketing" : "Marketing"}
                            href={`/blog/${item.id}`}
                          />
                        )
                        
                      ) : (
                        <div className="w-full h-full ml-5 sm:ml-0 bg-[#1A1A1A] rounded-lg overflow-hidden flex flex-col border-2 border-[#8ECF0A] shadow-[0_0_15px_rgba(142,207,10,0.5)]">
                          <div className="p-3 sm:p-4 md:p-6 bg-[#1A1A1A] text-center">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 md:mb-2 text-white">{item.title}</h3>
                            <p className="text-xs sm:text-sm text-white/80">{item.content}</p>
                          </div>
                          <div className="flex-grow flex items-center justify-center" style={{ maxHeight: "336px", height: "auto" }}>
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="bg-white text-black hover:bg-white/90 border-none left-0 hidden sm:flex" />
              <CarouselNext className="bg-white text-black hover:bg-white/90 border-none right-0 hidden sm:flex" />
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}