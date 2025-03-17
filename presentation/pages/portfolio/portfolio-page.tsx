import { MainLayout } from "@/presentation/templates/main-layout";
import { Heading } from "@/presentation/atoms/heading/heading";
import { Button } from "@/presentation/atoms/button/button";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PortfolioPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute -left-20 top-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-50"></div>

        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <Heading level="h1" className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Our Portfolio
            </Heading>
            <p className="text-lg text-muted-foreground">
              Explore our latest work and see how we've helped businesses like yours achieve their
              digital goals.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Tabs */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-background/5 border border-gray-800">
                <TabsTrigger value="all">All Projects</TabsTrigger>
                <TabsTrigger value="websites">Websites</TabsTrigger>
                <TabsTrigger value="branding">Branding</TabsTrigger>
                <TabsTrigger value="marketing">Marketing</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(9)].map((_, index) => (
                  <PortfolioItem
                    key={index}
                    title={`Project ${index + 1}`}
                    category={
                      index % 3 === 0 ? "Website" : index % 3 === 1 ? "Branding" : "Marketing"
                    }
                    image={`/placeholder.svg?height=600&width=800&text=Project+${index + 1}`}
                    href={`/portfolio/project-${index + 1}`}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="websites" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, index) => (
                  <PortfolioItem
                    key={index}
                    title={`Website Project ${index + 1}`}
                    category="Website"
                    image={`/placeholder.svg?height=600&width=800&text=Website+${index + 1}`}
                    href={`/portfolio/website-${index + 1}`}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="branding" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, index) => (
                  <PortfolioItem
                    key={index}
                    title={`Branding Project ${index + 1}`}
                    category="Branding"
                    image={`/placeholder.svg?height=600&width=800&text=Branding+${index + 1}`}
                    href={`/portfolio/branding-${index + 1}`}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="marketing" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, index) => (
                  <PortfolioItem
                    key={index}
                    title={`Marketing Project ${index + 1}`}
                    category="Marketing"
                    image={`/placeholder.svg?height=600&width=800&text=Marketing+${index + 1}`}
                    href={`/portfolio/marketing-${index + 1}`}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Heading level="h2" className="text-3xl md:text-4xl font-bold mb-4">
              Featured Case Studies
            </Heading>
            <p className="text-muted-foreground text-lg">
              Dive deeper into some of our most successful projects.
            </p>
          </div>

          <div className="space-y-16">
            {[
              {
                title: "E-Commerce Redesign for Fashion Brand",
                description:
                  "Increased conversion rate by 150% and average order value by 30% through strategic UX improvements and performance optimization.",
                image: "/placeholder.svg?height=600&width=1200&text=Case+Study+1",
                stats: [
                  { value: "150%", label: "Conversion Increase" },
                  { value: "30%", label: "Higher Order Value" },
                  { value: "2.5s", label: "Page Load Time" },
                ],
              },
              {
                title: "Digital Marketing Campaign for SaaS Startup",
                description:
                  "Generated 500+ qualified leads in the first month through an integrated campaign across search, social, and email channels.",
                image: "/placeholder.svg?height=600&width=1200&text=Case+Study+2",
                stats: [
                  { value: "500+", label: "Qualified Leads" },
                  { value: "45%", label: "Lower CAC" },
                  { value: "320%", label: "ROI" },
                ],
              },
            ].map((caseStudy, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <h3 className="text-2xl font-bold">{caseStudy.title}</h3>
                  <p className="text-muted-foreground">{caseStudy.description}</p>

                  <div className="grid grid-cols-3 gap-4 py-4">
                    {caseStudy.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="text-center">
                        <div className="text-2xl font-bold text-primary">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <Button asChild variant="outline" className="rounded-full">
                    <Link href={`/case-studies/case-study-${index + 1}`}>Read Case Study</Link>
                  </Button>
                </div>
                <div className="relative h-[300px] w-full rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src={caseStudy.image || "/placeholder.svg"}
                    alt={caseStudy.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute -right-20 bottom-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-50"></div>

        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Heading level="h2" className="text-3xl md:text-4xl font-bold mb-4">
              What Our Clients Say
            </Heading>
            <p className="text-muted-foreground text-lg">
              Don't just take our word for it. Here's what our clients have to say about working
              with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Senavia transformed our online presence. Their team was professional, creative, and delivered beyond our expectations.",
                author: "Sarah Johnson",
                company: "Fashion Boutique Owner",
              },
              {
                quote:
                  "The ROI from our marketing campaign was incredible. Senavia truly understands how to generate qualified leads that convert.",
                author: "Michael Chen",
                company: "SaaS Startup Founder",
              },
              {
                quote:
                  "Working with Senavia on our rebrand was a game-changer. They captured our vision perfectly and translated it into a stunning brand identity.",
                author: "Jessica Martinez",
                company: "Marketing Director",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-background/5 border border-gray-800 rounded-lg p-6">
                <div className="text-primary text-4xl mb-4">"</div>
                <p className="italic mb-6">{testimonial.quote}</p>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10 border-y border-primary/20">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Heading level="h2" className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Project?
            </Heading>
            <p className="text-muted-foreground text-lg mb-8">
              Contact us today to discuss how we can help your business grow.
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

interface PortfolioItemProps {
  title: string;
  category: string;
  image: string;
  href: string;
}

function PortfolioItem({ title, category, image, href }: PortfolioItemProps) {
  return (
    <Link href={href} className="group">
      <div className="relative overflow-hidden rounded-lg">
        <div className="relative h-[300px] w-full">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-sm text-primary mb-2">{category}</div>
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
}
