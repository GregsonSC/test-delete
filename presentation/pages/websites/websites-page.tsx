import { MainLayout } from "@/presentation/templates/main-layout";
import { Heading } from "@/presentation/atoms/heading/heading";
import { Button } from "@/presentation/atoms/button/button";
import Image from "next/image";
import Link from "next/link";

export function WebsitesPage() {
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
                Website Development
              </div>
              <Heading level="h1" className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Custom Websites That Convert
              </Heading>
              <p className="text-lg text-muted-foreground">
                We design and develop custom websites that not only look great but also drive
                conversions and help your business grow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/contact">Get a Quote</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/portfolio">View Our Work</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder.svg?height=800&width=600"
                  alt="Website showcase"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-background p-4 rounded-lg shadow-xl border border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <p className="font-medium">100% Responsive Design</p>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-background p-4 rounded-lg shadow-xl border border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <p className="font-medium">SEO Optimized</p>
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
              Our Website Services
            </Heading>
            <p className="text-muted-foreground text-lg">
              We offer a comprehensive range of website development services to meet your business
              needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Custom Web Design",
                description:
                  "Unique, branded websites designed specifically for your business goals and target audience.",
                icon: "🎨",
              },
              {
                title: "E-Commerce Development",
                description:
                  "Powerful online stores with secure payment processing and inventory management.",
                icon: "🛒",
              },
              {
                title: "CMS Integration",
                description:
                  "Easy-to-use content management systems so you can update your site without technical knowledge.",
                icon: "📝",
              },
              {
                title: "Responsive Development",
                description:
                  "Websites that look and function perfectly on all devices, from desktops to smartphones.",
                icon: "📱",
              },
              {
                title: "Website Maintenance",
                description:
                  "Ongoing support, updates, and security monitoring to keep your site running smoothly.",
                icon: "🔧",
              },
              {
                title: "Performance Optimization",
                description:
                  "Speed optimization to ensure fast loading times and better user experience.",
                icon: "⚡",
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

      {/* Process Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute -left-20 bottom-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-50"></div>

        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Heading level="h2" className="text-3xl md:text-4xl font-bold mb-4">
              Our Development Process
            </Heading>
            <p className="text-muted-foreground text-lg">
              We follow a structured approach to ensure your website meets your business goals and
              exceeds your expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <ol className="relative border-l border-gray-700">
                {[
                  {
                    title: "Discovery & Planning",
                    description:
                      "We learn about your business, goals, and target audience to create a strategic plan.",
                  },
                  {
                    title: "Design & Prototyping",
                    description:
                      "We create wireframes and visual designs for your approval before development begins.",
                  },
                  {
                    title: "Development",
                    description:
                      "Our developers bring the designs to life with clean, efficient code.",
                  },
                  {
                    title: "Testing & Quality Assurance",
                    description:
                      "We thoroughly test your website across devices and browsers to ensure everything works perfectly.",
                  },
                  {
                    title: "Launch & Training",
                    description:
                      "We launch your site and provide training so you can manage your content with confidence.",
                  },
                ].map((step, index) => (
                  <li key={index} className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 bg-primary text-black font-bold">
                      {index + 1}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/placeholder.svg?height=1000&width=800"
                alt="Development process"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10 border-y border-primary/20">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Heading level="h2" className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Website Project?
            </Heading>
            <p className="text-muted-foreground text-lg mb-8">
              Contact us today to discuss your website needs and get a free quote.
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
