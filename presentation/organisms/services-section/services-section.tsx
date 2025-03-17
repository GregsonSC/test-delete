import { Heading } from "@/presentation/atoms/heading/heading";
import { Button } from "@/presentation/atoms/button/button";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

const services = [
  {
    id: "web-design",
    title: "Web Design & Development",
    description:
      "Engaging and powerful web design that converts visitors into customers and keeps them coming back for more.",
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
  },
  {
    id: "traffic",
    title: "Generate Traffic, Leads & Sales",
    description:
      "Drive more leads with a tailored marketing strategy designed specifically for your business goals.",
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
  },
  {
    id: "branding",
    title: "Create your Professional Brand",
    description:
      "We build a unique visual identity that leaves lasting impression on your customers.",
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Heading level="h2" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Digital Services That Will Lead
            <br />
            You To Online Success
          </Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-secondary/50 border border-gray-800 p-8 rounded-lg flex flex-col h-full"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6 flex-grow">{service.description}</p>
              <Button asChild variant="link" className="text-primary justify-start p-0">
                <Link href={`/services/${service.id}`}>See more →</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
