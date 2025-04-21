
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

        </div>
      </section>
    </MainLayout>
  );
}
