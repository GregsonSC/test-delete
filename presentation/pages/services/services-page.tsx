import { MainLayout } from "@/presentation/templates/main-layout";
import { Heading } from "@/presentation/atoms/heading/heading";
import { ServicesGrid } from "@/presentation/organisms/services-grid/services-grid";
import { ServicesSection } from "@/presentation/organisms/services-section/services-section";

export function ServicesPage() {
  return (
    <MainLayout>
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <Heading level="h1">Our Services</Heading>
            <p className="mx-auto max-w-[700px] text-muted-foreground">
              Explore the comprehensive range of digital services we offer to help your business
              thrive.
            </p>
          </div>

          <ServicesGrid />
          <ServicesSection />

          <div className="mt-24">
            <div className="text-center mb-12">
              <Heading level="h2">Our Process</Heading>
              <p className="mx-auto max-w-[700px] text-muted-foreground mt-4">
                We follow a structured approach to ensure the success of every project.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="relative h-20 w-20 mx-auto rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Discovery</h3>
                <p className="text-muted-foreground">
                  We learn about your business, goals, and challenges to understand your needs.
                </p>
              </div>
              <div className="text-center">
                <div className="relative h-20 w-20 mx-auto rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">Strategy</h3>
                <p className="text-muted-foreground">
                  We develop a tailored strategy and roadmap to achieve your business objectives.
                </p>
              </div>
              <div className="text-center">
                <div className="relative h-20 w-20 mx-auto rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Implementation</h3>
                <p className="text-muted-foreground">
                  Our team executes the strategy with precision and attention to detail.
                </p>
              </div>
              <div className="text-center">
                <div className="relative h-20 w-20 mx-auto rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold mb-4">
                  4
                </div>
                <h3 className="text-xl font-bold mb-2">Optimization</h3>
                <p className="text-muted-foreground">
                  We continuously monitor, analyze, and optimize to ensure long-term success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
