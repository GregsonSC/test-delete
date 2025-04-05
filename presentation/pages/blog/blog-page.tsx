import { MainLayout } from "@/presentation/templates/main-layout";
import { Heading } from "@/presentation/atoms/heading/heading";
import { Button } from "@/presentation/atoms/button/button";
import { ContactInfo } from "@/presentation/molecules/contact-info/contact-info";
import { HoverCardImage } from "@/presentation/molecules/hover-card-image/hover-card-image";
import { Calendar } from "@/components/ui/calendar"
import { Calendar_molecule } from "@/presentation/molecules/calendar/calendar";


export function BlogPage() {
  return (
      <MainLayout>
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <Heading level="h1" className="text-5xl md:text-5xl lg:text-6xl font-bold mt-10">
                Blog
              </Heading>
            </div>
          </div>
        </section>

        {/* Recent Posts */}
        <section className="mt-14">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
              {[...Array(6)].map((_, index) => (
                <HoverCardImage
                  key={index}
                  title={`Blog Post ${index + 1}`}
                  content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl."
                  tag={
                    index % 3 === 0 ? "Web Development" : index % 3 === 1 ? "Marketing" : "Design"
                  }
                  date="June 10, 2023"
                  image="fotos-prueba/webdevelpment.png"
                  href= "/"
                />
              ))}
            </div>

            <div className="flex justify-center mt-12 mb-12">
              <Button variant="outline" className="rounded-full">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>

        {ContactInfo(1)}
      </MainLayout>
  );
}