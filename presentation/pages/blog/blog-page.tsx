"use client";

import React, { useState, useEffect } from "react";
import { MainLayout } from "@/presentation/templates/main-layout";
import { Heading } from "@/presentation/atoms/heading/heading";
import { Button } from "@/presentation/atoms/button/button";
import { ContactInfo } from "@/presentation/molecules/contact-info/contact-info";
import { HoverCardImage } from "@/presentation/molecules/hover-card-image/hover-card-image";
import { ScheduleFreeConsultation } from "@/presentation/organisms/layout/schedule-free-consultation";
import BlogViewModel from "./BlogViewModel";
import { HoverCardImageSkeleton } from "@/presentation/molecules/hover-card-image/hover-card-image-skeleton";

export function BlogPage() {
  // Estado para paginación
  const [simpleBlogsPerPage, setSimpleBlogsPerPage] = useState(3);
  const [offset, setOffset] = useState(0);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const { posts, loading, pageInfo } = BlogViewModel({
    simpleBlog: true,
    offset,
    simpleBlogsPerPage,
  });

  // Acumular posts al hacer load more
  useEffect(() => {
    if (posts && posts.length > 0) {
      if (offset === 0) {
        setAllPosts(posts);
      } else {
        setAllPosts((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newPosts = posts.filter((p) => !existingIds.has(p.id));
          return [...prev, ...newPosts];
        });
      }
    }
  }, [posts, offset]);

  // Load more: aumentar offset
  const handleLoadMore = () => {
    setOffset((prev) => prev + simpleBlogsPerPage);
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <Heading level="h1" className="text-5xl md:text-5xl lg:text-6xl font-bold mt-10">
              Blog
            </Heading>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="mt-14 mb-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {loading && allPosts.length === 0
              ? Array.from({ length: simpleBlogsPerPage }).map((_, idx) => (
                  <div key={idx} className="w-full flex justify-center">
                    <HoverCardImageSkeleton />
                  </div>
                ))
              : allPosts.map((post, index) => (
                  <div key={index} className="w-full flex justify-center">
                    <HoverCardImage
                      title={post.title}
                      content={post.resume}
                      tag={post.topic}
                      date={post.publicationDate.slice(0, 10)}
                      image={post.imageUrl}
                      href={`/blog/${post.id}`}
                    />
                  </div>
                ))}
          </div>
        </div>
        {pageInfo && allPosts.length < pageInfo.totalBlogs && (
          <div className="flex justify-center mt-12 ">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 py-3 text-[16px] font-[600] bg-[#8ECF0A] text-black hover:bg-[#8ab82e] hover:text-white hover:shadow-[0_0_15px_rgba(142,207,10,0.7)] transition-all cursor-pointer"
              onClick={handleLoadMore}
            >
              <span>Load More Articles</span>
            </Button>
          </div>
        )}
      </section>

      {ContactInfo(1)}
      <ScheduleFreeConsultation />
    </MainLayout>
  );
}
