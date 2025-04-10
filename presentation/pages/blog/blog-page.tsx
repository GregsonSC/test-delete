"use client";

import React, { useState, useEffect } from "react";
import { MainLayout } from "@/presentation/templates/main-layout";
import { Heading } from "@/presentation/atoms/heading/heading";
import { Button } from "@/presentation/atoms/button/button";
import { ContactInfo } from "@/presentation/molecules/contact-info/contact-info";
import { HoverCardImage } from "@/presentation/molecules/hover-card-image/hover-card-image";
import { ScheduleFreeConsultation } from "@/presentation/organisms/layout/schedule-free-consultation";

export function BlogPage() {
  // Estado para controlar la cantidad de posts visibles
  const [postsCount, setPostsCount] = useState(6);

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
      <section className="mt-14">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {[...Array(postsCount)].map((_, index) => (
              <div key={index} className="w-full flex justify-center">
                <HoverCardImage
                  title={`Blog Post ${index + 1}`}
                  content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl."
                  tag={index % 3 === 0 ? "Web Development" : index % 3 === 1 ? "Marketing" : "Design"}
                  date="June 10, 2023"
                  image="fotos-prueba/webdevelpment.png"
                  href="/"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-12 mb-12">
          <Button variant="outline" className="rounded-full" onClick={handleLoadMore}>
            Load More Articles
          </Button>
        </div>
      </section>

      {ContactInfo(1)}
      <ScheduleFreeConsultation />
    </MainLayout>
  );
}
