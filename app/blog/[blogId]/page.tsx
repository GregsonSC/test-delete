"use client";
import { notFound } from "next/navigation";
import { BlogPost } from "@/components/interface/modules/Blog";
import { Button } from "@/presentation/atoms/button/button";
import { Heading } from "@/presentation/atoms/heading/heading";
import { MainLayout } from "@/presentation/templates/main-layout";
import { HoverCardImage } from "@/presentation/molecules/hover-card-image/hover-card-image";
import { ScheduleFreeConsultation } from "@/presentation/organisms/layout/schedule-free-consultation";
import { ContactInfo } from "@/presentation/molecules/contact-info/contact-info";
import BlogViewModel from "@/presentation/pages/blog/BlogViewModel";
import { useState } from "react";
import { useBlogPostViewModel } from "./blogPostViewModel";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = Number(params.blogId);
  // const blogPost = await getBlogPost(blogId);
  const { posts } = BlogViewModel();
  const { blog, loading, error, getBlogPost } = useBlogPostViewModel(blogId);
  const [postsCount] = useState(4);

  if (loading) {
    return (
      <MainLayout>
        <div className="w-full pt-20 pb-16 bg-[#04081E]">
          <div className="container mx-auto px-4">
            {/* Skeleton for hero section */}
            <div className="w-full aspect-auto md:aspect-[16/9] max-w-6xl mx-auto rounded-lg overflow-hidden bg-gray-800 animate-pulse">
              <div className="w-full h-full flex flex-col justify-end p-9">
                <div className="h-16 bg-gray-700 rounded w-3/4 mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-700 rounded w-1/2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <section className="py-16 bg-[#04081E] mb-[125px] mt-14">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-[121px]">
              {/* Main content skeleton */}
              <div className="w-full lg:w-2/3">
                {/* Author info skeleton */}
                <div className="flex items-center gap-3 mb-[45px]">
                  <div className="w-12 h-12 rounded-full bg-gray-700 animate-pulse"></div>
                  <div className="flex flex-col gap-2">
                    <div className="h-4 bg-gray-700 rounded w-24 animate-pulse"></div>
                    <div className="h-3 bg-gray-700 rounded w-32 animate-pulse"></div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="h-8 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded w-2/3 animate-pulse"></div>
                  </div>
                  <div className="h-24 bg-gray-700 rounded w-full animate-pulse"></div>
                  <div className="h-8 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                  <div className="h-64 bg-gray-700 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/3 animate-pulse"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded w-2/3 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Sidebar skeleton */}
              <div className="w-full lg:w-1/3">
                <div className="sticky top-24">
                  <div className="h-12 bg-gray-700 rounded-full w-full mb-12 animate-pulse"></div>
                  <div className="h-8 bg-gray-700 rounded w-1/2 mb-9 animate-pulse"></div>
                  <div className="space-y-4">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="bg-gray-800 rounded-lg p-4 animate-pulse">
                        <div className="h-40 bg-gray-700 rounded w-full mb-4"></div>
                        <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    );
  }

  if (error || !blog.length) {
    notFound();
  }

  return (
    <MainLayout>
      {/* Hero section with gradient background */}
      <div className="w-full pt-20 pb-16 bg-[#04081E]">
        <div className="container mx-auto px-4">
          {/* Gradient card with blog title */}
          {blog[0]?.imageUrl ? (
            <div
              className="w-full aspect-auto md:aspect-[16/9] max-w-6xl mx-auto rounded-lg overflow-hidden flex flex-col justify-end p-9 relative"
            >
              <Image
                src={blog[0]?.imageUrl || "/images/portfolio/portafolioTestImg.webp"}
                alt={blog[0]?.title || "Blog hero image"}
                fill
                className="object-cover"
              />
              <Heading level="h1" className="text-[40px] sm:text-[50px] md:text-[60px] lg:text-[80px] font-[700] text-white relative z-10">
                {blog[0]?.title}
              </Heading>
              <p className="text-[16px] md:text-[18px] font-[600] text-white/80 w-full relative z-10">
                {blog[0]?.resume}
              </p>
            </div>
          ) : (
            <div
              className="w-full aspect-auto md:aspect-[16/9] max-w-6xl mx-auto rounded-lg overflow-hidden flex flex-col justify-end p-9 relative"
              style={{
                background: "linear-gradient(135deg, #8ECF0A 0%, #2EBAC6 100%)",
              }}
            >
              <Heading level="h1" className="text-[40px] sm:text-[50px] md:text-[60px] lg:text-[80px] font-[700] text-white relative z-10">
                {blog[0]?.title}
              </Heading>
              <p className="text-[16px] md:text-[18px] font-[600] text-white/80 w-full relative z-10">
                {blog[0]?.resume}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Blog content section */}
      <section className="py-16 bg-[#04081E] mb-[125px] mt-14">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-[121px]">
            {/* Main content column */}
            <div className="w-full lg:w-2/3">
              {/* Author info */}
              <div className="flex items-center gap-3 mb-[45px]">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8ECF0A] via-[#39cac0] to-[#8ECF0A] flex items-center justify-center"></div>
                <div className="flex flex-col">
                  <span className="font-semibold text-white">{blog[0]?.User.name}</span>
                  <span className="text-sm text-gray-400">{blog[0]?.publicationDate}</span>
                </div>
              </div>

              <div className="prose prose-lg prose-invert">
                <h2 className="text-white text-4xl font-bold mb-6">{blog[0]?.SubTitle}</h2>
                <p className="text-gray-300 mb-6 leading-relaxed text-justify">
                  {blog[0]?.content.content1}
                </p>

                {/* Blockquote with green left border */}
                <blockquote className="border-l-4 border-[#8ECF0A] pl-4 py-2 my-8 italic text-gray-300 ml-[54px] mb-[45px]">
                  {blog[0]?.content.quote}
                </blockquote>

                <h2 className="text-white text-4xl font-bold mb-6">{blog[0]?.ImageSubTitle}</h2>

                {/* Image with gradient background */}
                <Image
                  src={blog[0]?.ContentImageUrl || "/images/portfolio/portafolioTestImg.webp"}
                  alt={blog[0]?.title || "Blog image"}
                  width={1200}
                  height={675}
                  className="w-full aspect-video bg-gradient-to-r from-[#8ECF0A] to-[#2EBAC6] rounded-lg mb-6"
                />

                <p className="text-[#D3E8A9] text-sm text-center mb-8 italic">
                  {blog[0]?.ImageReference}
                </p>

                <p className="text-gray-300 mb-6 leading-relaxed text-justify">
                  {blog[0]?.content.content2}
                </p>
              </div>
            </div>

            {/* Sidebar column with related articles */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-24">
                {/* Consultation button */}
                <Button
                  className="w-full rounded-full bg-[#99CC33] text-black hover:bg-[#8ab82e] hover:text-white hover:shadow-[0_0_15px_rgba(153,204,51,0.7)] px-8 py-3 font-bold text-lg transition-all mb-12"
                >
                  Get a free consultation!
                </Button>

                <h3 className="text-white text-4xl font-bold mb-9">Read More</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 justify-items-center">
                  {posts.slice(0, postsCount).map((post, index) => (
                    <HoverCardImage
                      key={index}
                      title={post.title}
                      content={post.resume}
                      tag={post.topic === 'WEBDESIGN' ? 'Web Design' : post.topic === 'DIGITALMARKETING' ? 'Digital Marketing' : post.topic}
                      date={post.publicationDate.slice(0, 10)}
                      image={post.imageUrl}
                      href={`/blog/${post.id}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {ContactInfo(1)}

      <ScheduleFreeConsultation />
    </MainLayout>
  );
}