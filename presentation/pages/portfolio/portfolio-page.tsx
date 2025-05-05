"use client";

import React, { useEffect, useState } from "react";
import { MainLayout } from "@/presentation/templates/main-layout";
import { GoogleReviewCard } from "@/presentation/molecules/review-card/review-card";
import { ReviewCardUser } from "@/presentation/molecules/review-card-user/review-card-user";
import { LatestNews } from "@/presentation/molecules/news/latest-news";
import { ScheduleFreeConsultation } from "@/presentation/organisms/layout/schedule-free-consultation";
import { ContactInfo } from "@/presentation/molecules/contact-info/contact-info";
import { PortfolioCardSmall } from "@/presentation/atoms/portfolio-card/portfolio-card-small";
import { PortfolioCardSmallSkeleton } from "@/presentation/atoms/portfolio-card/portfolio-card-small-skeleton";
import { reviewItems } from "@/lib/constants2";
import { blogItems, caseItems } from "@/lib/constants";
import PortfolioViewModel from "./PortfolioViewModel";
import { Button } from "@/presentation/atoms/button/button"; // Import Button component

// !CH008 [ADD] Endpoint para los card de portafolio, reemplazar por el endpoint real en un viewModel
export function PortfolioPage() {
  const { portfolioItems, loading, error } = PortfolioViewModel();

  // Number of items to show initially and load each time
  const itemsPerLoad = 4; // You can adjust this number
  const [visibleItemsCount, setVisibleItemsCount] = useState(itemsPerLoad);

  // Function to load more items
  const handleLoadMore = () => {
    setVisibleItemsCount((prevCount) => prevCount + itemsPerLoad);
  };

  return (
    <MainLayout>
      {/* --- NEW PORTFOLIO SECTION --- */}
      <section className="bg-[#060B20] py-16 md:py-24">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          {/* Section Title */}
          <h2 className="text-5xl font-bold text-white text-center mb-16 md:mb-20">
            Explore Our Web Portfolio
          </h2>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            {loading ? (
              // Show skeletons while loading - show initial count
              Array.from({ length: itemsPerLoad }).map((_, index) => (
                <PortfolioCardSmallSkeleton key={`skeleton-${index}`} />
              ))
            ) : error ? (
              // Show error message if fetch failed
              <p className="text-red-500 col-span-full text-center">Error loading portfolio: {error}</p>
            ) : portfolioItems.length === 0 ? (
              // Show message if no items are found
              <p className="text-gray-400 col-span-full text-center">No portfolio items found.</p>
            ) : (
              // Render portfolio items once loaded - slice based on visible count
              portfolioItems.slice(0, visibleItemsCount).map((item) => (
                <PortfolioCardSmall
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  imageUrl={item.image}
                  href={item.url}
                  className="w-full h-auto aspect-square"
                />
              ))
            )}
          </div>

          {/* Load More Button */}
          {!loading && !error && portfolioItems.length > visibleItemsCount && (
            <div className="flex justify-center mt-12">
              <Button variant="outline" className="rounded-full text-white border-white hover:bg-white hover:text-[#060B20]" onClick={handleLoadMore}>
                Load More Projects
              </Button>
            </div>
          )}

        </div>
      </section>
      {/* --- END NEW PORTFOLIO SECTION --- */}

      {/* --- Existing Review Section --- */}
      <section
        className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat mb-[150px]"
        style={{ backgroundImage: "url('/images/marketing/reviews.jpg')" }}
      >
        <div className="container px-8 sm:px-4 md:px-6 mx-auto flex items-center justify-center h-full">
          <div className="max-w-5xl mx-auto w-full">
            {/* Content container */}
            <div className="bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-3xl p-8 md:p-12 mx-auto max-w-5xl relative overflow-hidden my-[120px]">
              <div className="text-center mb-8">
                <h3 className="text-[32px] md:text-[36px] font-bold text-white mb-4">
                  See Why Clients Love Our Services!
                </h3>
                <p className="text-[16px] md:text-[18px] text-gray-300 max-w-2xl mx-auto">
                  We aim to surpass our client’s expectations, becoming your trusted partner in achieving goals and identifying the best path forward for your business.
                </p>
              </div>

              {/* Google Reviews Summary */}
              <div className="flex justify-center mb-12">
                <GoogleReviewCard rating={5.0} totalReviews={25} />
              </div>

              {/* Individual Reviews Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reviewItems.map((review, index) => (
                  <ReviewCardUser
                    key={index}
                    profilePicture={review.profilePicture}
                    name={review.name}
                    rating={review.rating}
                    review={review.review}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {ContactInfo(1)}

      <ScheduleFreeConsultation />

      {/* Fourth Section - Blog/Resources */}
      <section
        className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/marketing/background-marketing.png')" }}
      >
        <LatestNews blogItems={blogItems} caseItems={caseItems} />
      </section>
    </MainLayout>
  );
}
