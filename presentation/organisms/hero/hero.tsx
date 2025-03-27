"use client";

import { Button } from "@/presentation/atoms/button/button";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { PortfolioCarousel } from "@/presentation/organisms/carousel/portfolio-carousel";
import { PortfolioCardSmall } from "@/presentation/atoms/portfolio-card/portfolio-card-small";

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Portfolio items data
  const portfolioItems = [
    {
      title: "E-commerce Website",
      description: "Custom online store with seamless checkout experience and product management.",
      imageUrl: "https://placehold.co/645x577",
      href: "/portfolio/ecommerce",
      tags: ["Web Design", "E-commerce", "UI/UX"]
    },
    {
      title: "Corporate Website",
      description: "Professional business website with modern design and optimized user experience.",
      imageUrl: "https://placehold.co/645x577",
      href: "/portfolio/corporate",
      tags: ["Web Design", "Corporate", "Branding"]
    },
    {
      title: "Mobile Application",
      description: "Feature-rich mobile app with intuitive interface and seamless functionality.",
      imageUrl: "https://placehold.co/645x577",
      href: "/portfolio/mobile-app",
      tags: ["Mobile", "UI/UX", "Development"]
    }
  ];

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute -left-20 -top-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -right-20 bottom-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-50"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-8 text-center max-w-4xl mx-auto">
          <div
            className={`space-y-4 transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Digital Agency That Generates
              <br />
              Business Growth
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Maximize the full potential of your business with our complete web design, E-commerce,
              and lead generation solutions!
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 bg-primary text-black hover:bg-primary/90"
            >
              <Link href="/contact">Get Your Free Estimate</Link>
            </Button>
          </div>

          <div
            className={`w-full max-w-4xl transition-all duration-1000 delay-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow-2xl">
              {/* Overlay with semi-transparent gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-secondary/60 z-10"></div>

              <Image
                src="/placeholder.svg?height=600&width=1000"
                alt="Website showcase"
                fill
                className="object-cover"
              />

              {/* Content on top of the image */}
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-start p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Designs That Grow Your Business
                </h2>
                <p className="text-sm md:text-base text-gray-300 mb-6 max-w-md">
                  We create stunning websites that convert visitors into customers and help your
                  business thrive.
                </p>
                <Button
                  asChild
                  size="sm"
                  className="rounded-full bg-primary text-black hover:bg-primary/90"
                >
                  <Link href="/portfolio">See Our Work</Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Portfolio section */}
          <div 
            className={`w-full mt-16 transition-all duration-1000 delay-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
            
            {/* Portfolio Carousel */}
            <div className="max-w-[1200px] mx-auto">
              <PortfolioCarousel items={portfolioItems} />
            </div>
            
            {/* Small Portfolio Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-[1024px] mx-auto">
              <PortfolioCardSmall
                title="Page Title"
                description="Lorem ipsum component variant main layer. Opacity pencil component slice link."
                href="/portfolio/project-1"
                imageUrl="https://picsum.photos/500/500?random=1"
              />
              
              <PortfolioCardSmall
                title="Page Title"
                description="Lorem ipsum component variant main layer. Opacity pencil component slice link. Library ipsum italic figjam arrow. Stroke prototype move library line connection connection follower."
                href="/portfolio/project-2"
                imageUrl="https://picsum.photos/500/500?random=2"
              />
            </div>
            
            <div className="mt-8 text-center">
              <Button
                asChild
                variant="outline"
                className="rounded-full border-primary text-primary hover:bg-primary/10"
              >
                <Link href="/portfolio">View All Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
