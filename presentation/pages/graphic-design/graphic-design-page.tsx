import { MainLayout } from "@/presentation/templates/main-layout";
import { Heading } from "@/presentation/atoms/heading/heading";
import { Button } from "@/presentation/atoms/button/button";
import Image from "next/image";
import Link from "next/link";

export function GraphicDesignPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute -right-20 top-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-50"></div>

        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-primary font-medium">
                Graphic Design
              </div>
              <Heading level="h1" className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Stunning Designs That Capture Your Brand
              </Heading>
              <p className="text-lg text-muted-foreground">
                Our graphic design services help you communicate your brand message effectively
                through visually compelling designs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/contact">Start a Project</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/portfolio">View Our Work</Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-[200px] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/placeholder.svg?height=400&width=300"
                    alt="Design sample 1"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-[150px] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Design sample 2"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-[150px] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Design sample 3"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-[200px] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/placeholder.svg?height=400&width=300"
                    alt="Design sample 4"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Heading level="h2" className="text-3xl md:text-4xl font-bold mb-4">
              Our Design Services
            </Heading>
            <p className="text-muted-foreground text-lg">
              From branding to print materials, we offer a wide range of graphic design services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Brand Identity Design",
                description:
                  "Logos, color palettes, typography, and brand guidelines that capture your brand essence.",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Print Design",
                description:
                  "Business cards, brochures, flyers, posters, and other print materials that make an impact.",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Packaging Design",
                description:
                  "Eye-catching packaging that stands out on shelves and enhances the customer experience.",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Social Media Graphics",
                description:
                  "Engaging visuals for your social media platforms that boost engagement and brand awareness.",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "UI/UX Design",
                description:
                  "User-friendly interfaces and experiences for websites and applications.",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Illustration & Infographics",
                description:
                  "Custom illustrations and data visualizations that tell your story effectively.",
                image: "/placeholder.svg?height=300&width=400",
              },
            ].map((service, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg">
                <div className="relative h-[250px] w-full">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-white/80 text-sm">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute -left-20 bottom-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-50"></div>

        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Heading level="h2" className="text-3xl md:text-4xl font-bold mb-4">
              Our Design Process
            </Heading>
            <p className="text-muted-foreground text-lg">
              We follow a collaborative approach to ensure your design project exceeds expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                number: "01",
                title: "Discovery",
                description:
                  "We learn about your brand, goals, target audience, and design preferences.",
              },
              {
                number: "02",
                title: "Concept Development",
                description:
                  "We create initial design concepts based on our research and your requirements.",
              },
              {
                number: "03",
                title: "Refinement",
                description:
                  "We refine the chosen concept based on your feedback until it's perfect.",
              },
              {
                number: "04",
                title: "Delivery",
                description:
                  "We deliver the final designs in all the formats you need for your projects.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-background/5 border border-gray-800 rounded-lg p-6 relative"
              >
                <div className="text-5xl font-bold text-primary/20 absolute top-4 right-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2 mt-8">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Heading level="h2" className="text-3xl md:text-4xl font-bold mb-4">
              Featured Design Work
            </Heading>
            <p className="text-muted-foreground text-lg">
              Take a look at some of our recent design projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg">
                <div className="relative h-[300px] w-full">
                  <Image
                    src={`/placeholder.svg?height=600&width=800&text=Project+${index + 1}`}
                    alt={`Design project ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/80 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button variant="secondary" size="sm" className="rounded-full">
                      View Project
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/portfolio">View Full Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10 border-y border-primary/20">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Heading level="h2" className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Bring Your Vision to Life?
            </Heading>
            <p className="text-muted-foreground text-lg mb-8">
              Contact us today to discuss your design project and get a free quote.
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/contact">Start Your Project</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
