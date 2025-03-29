import { MainLayout } from "@/presentation/templates/main-layout";
import { Heading } from "@/presentation/atoms/heading/heading";
import { Button } from "@/presentation/atoms/button/button";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { HoverCardImage } from "@/presentation/molecules/hover-card-image/hover-card-image";
import { Phone } from "lucide-react";

export function BlogPage() {
  return (
      <MainLayout>
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <Heading level="h1" className="text-5xl md:text-5xl lg:text-6xl font-bold mt-24">
                Blog
              </Heading>
            </div>
          </div>
        </section>

        {/* Recent Posts */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <HoverCardImage
                  key={index}
                  title={`Blog Post ${index + 1}`}
                  content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl."
                  tag={
                    index % 3 === 0 ? "Web Development" : index % 3 === 1 ? "Marketing" : "Design"
                  }
                  date="June 10, 2023"
                  image={`/placeholder.svg?height=400&width=600&text=Blog+${index + 1}`}
                  href= "/"
                />
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Button variant="outline" className="rounded-full">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>

{/* Contact info */}
        <section className="relative py-20">
          <div className="flex-row">
            <video
              className="absolute top-0 left-0 w-full h-full object-cover "
              src="/fondos/blog-video-background.mp4"
              autoPlay
              loop
              muted
            />
            <div className=" relative z-10 text-center w-full mx-auto">
              <Heading level="h1" className="text-3xl md:text-4xl md:nowr font-bold mb-5 text-[#0A1248]">
                Let’s talk About Your Project Goals!
              </Heading>
              <p className="text-lg mb-8 text-[#0A1248] font-semibold">
                Connect with one of our digital experts at Senavia to see how we can assist <br /> you in achieving your business objectives.
              </p>
              <Button className="rounded-full bg-[#0A1248] text-white">
                <Phone color="white" />
                (954) 706-4084
              </Button>
            </div>
          </div>
        </section>
      </MainLayout>
  );
}