import { MainLayout } from "@/presentation/templates/main-layout";
import { Heading } from "@/presentation/atoms/heading/heading";
import { Button } from "@/presentation/atoms/button/button";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export function MarketingPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute -left-20 top-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-50"></div>

        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-primary font-medium">
                Digital Marketing
              </div>
              <Heading level="h1" className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Grow Your Business With Data-Driven Marketing
              </Heading>
              <p className="text-lg text-muted-foreground">
                Our digital marketing strategies are designed to increase your online visibility,
                drive qualified traffic, and convert visitors into customers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/contact">Get a Strategy</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/case-studies">View Case Studies</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder.svg?height=800&width=600"
                  alt="Marketing analytics"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-background p-4 rounded-lg shadow-xl border border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <p className="font-medium">Increased Conversions</p>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-background p-4 rounded-lg shadow-xl border border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <p className="font-medium">ROI Focused</p>
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
              Our Marketing Services
            </Heading>
            <p className="text-muted-foreground text-lg">
              Comprehensive digital marketing solutions to help your business reach its full
              potential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Search Engine Optimization (SEO)",
                description:
                  "Improve your website's visibility in search results to drive organic traffic.",
                icon: "🔍",
              },
              {
                title: "Pay-Per-Click Advertising (PPC)",
                description:
                  "Strategic ad campaigns on Google, Facebook, and other platforms to drive immediate traffic.",
                icon: "💰",
              },
              {
                title: "Social Media Marketing",
                description:
                  "Build your brand and engage with your audience on the platforms that matter most.",
                icon: "📱",
              },
              {
                title: "Content Marketing",
                description:
                  "Compelling content that attracts, engages, and converts your target audience.",
                icon: "✍️",
              },
              {
                title: "Email Marketing",
                description:
                  "Nurture leads and build customer loyalty with targeted email campaigns.",
                icon: "📧",
              },
              {
                title: "Analytics & Reporting",
                description:
                  "Data-driven insights to continuously optimize your marketing performance.",
                icon: "📊",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-background/5 border border-gray-800 rounded-lg p-6 hover:border-primary transition-colors"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute -right-20 bottom-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-50"></div>

        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Heading level="h2" className="text-3xl md:text-4xl font-bold mb-4">
              Results That Speak For Themselves
            </Heading>
            <p className="text-muted-foreground text-lg">
              Our clients see real, measurable results from our marketing strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-background/5 border border-gray-800 rounded-lg p-8 text-center">
              <div className="text-4xl font-bold text-primary mb-2">250%</div>
              <p className="text-lg">Average Increase in Organic Traffic</p>
            </div>
            <div className="bg-background/5 border border-gray-800 rounded-lg p-8 text-center">
              <div className="text-4xl font-bold text-primary mb-2">180%</div>
              <p className="text-lg">Average Increase in Conversion Rate</p>
            </div>
            <div className="bg-background/5 border border-gray-800 rounded-lg p-8 text-center">
              <div className="text-4xl font-bold text-primary mb-2">320%</div>
              <p className="text-lg">Average Return on Ad Spend</p>
            </div>
          </div>

          <div className="bg-background/5 border border-gray-800 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Why Choose Senavia for Your Digital Marketing?
                </h3>
                <ul className="space-y-4">
                  {[
                    "Data-driven strategies tailored to your business goals",
                    "Transparent reporting and communication",
                    "Experienced team of marketing specialists",
                    "Focus on ROI and measurable results",
                    "Continuous optimization based on performance data",
                    "Integrated approach across all marketing channels",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Marketing team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10 border-y border-primary/20">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Heading level="h2" className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Grow Your Business?
            </Heading>
            <p className="text-muted-foreground text-lg mb-8">
              Contact us today for a free marketing consultation and strategy session.
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
