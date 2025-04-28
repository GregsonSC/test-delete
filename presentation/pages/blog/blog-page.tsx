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
  const { posts } = BlogViewModel();

  // Estado para controlar la cantidad de posts visibles
  const [postsCount, setPostsCount] = useState(6);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (posts && posts.length > 0) {
      setLoading(false);
    }
  }, [posts]);

  // Al montar el componente, se determina el dispositivo según window.innerWidth:
  // - Mobile (<640px): 3 posts
  // - Tablet (>=640px y <1024px): 4 posts
  // - Desktop (>=1024px): 6 posts
  useEffect(() => {
    const width = window.innerWidth;
    if (width < 640) {
      setPostsCount(3);
    } else if (width < 1024) {
      setPostsCount(4);
    } else {
      setPostsCount(6);
    }
  }, []);

  console.log(posts);

  // Función para cargar 3 posts adicionales cada vez que se presiona el botón
  const handleLoadMore = () => {
    setPostsCount((prev) => prev + 3);
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
            {loading
              ? Array.from({ length: postsCount }).map((_, idx) => (
                <div key={idx} className="w-full flex justify-center">
                  <HoverCardImageSkeleton />
                </div>
              ))
              : posts.slice(0, postsCount).map((post, index) => (
                <div key={index} className="w-full flex justify-center">
                  <HoverCardImage
                    title={post.title}
                    content={post.content}
                    // tag={post.tag}
                    tag={index % 3 === 0 ? "Web Development" : index % 3 === 1 ? "Marketing" : "Design"}
                    date={post.publicationDate}
                    // image={post.imageUrl || "fotos-prueba/webdevelpment.png"}
                    image={"/images/portfolio/portafolioTestImg.webp"}
                    href="/"
                  />
                </div>
              ))}
          </div>
        </div>
        {
          posts.length > 6 && (
            <div className="flex justify-center mt-12 ">
              <Button variant="outline" className="rounded-full" onClick={handleLoadMore}>
                Load More Articles
              </Button>
            </div>
          )
        }
      </section>

      {ContactInfo(1)}
      <ScheduleFreeConsultation />
    </MainLayout>
  );
}
