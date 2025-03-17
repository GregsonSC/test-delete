import { MainLayout } from "@/presentation/templates/main-layout";
import { Heading } from "@/presentation/atoms/heading/heading";

export function AboutPage() {
  return (
    <MainLayout>
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <Heading level="h1">About Senavia Corp</Heading>
            <p className="mx-auto max-w-[700px] text-muted-foreground">
              Learn about our mission, vision, and the team behind Senavia Corp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] bg-zinc-900 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-medium">
                Company Image Placeholder
              </div>
            </div>
            <div>
              <Heading level="h2">Our Story</Heading>
              <p className="mt-4 text-muted-foreground">
                Founded in 2020 by Sebastian Navia Solis, Senavia Corp started with a simple
                mission: to help small businesses succeed in the digital world. What began as a
                one-person operation has grown into a team of dedicated professionals serving
                clients across various industries.
              </p>
              <p className="mt-4 text-muted-foreground">
                Our journey has been defined by a commitment to excellence, innovation, and client
                satisfaction. We believe in building long-term relationships with our clients,
                understanding their unique challenges, and delivering solutions that drive real
                business results.
              </p>
            </div>
          </div>

          <div className="mt-24">
            <div className="text-center mb-12">
              <Heading level="h2">Our Values</Heading>
              <p className="mx-auto max-w-[700px] text-muted-foreground mt-4">
                The principles that guide everything we do at Senavia Corp.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-2">Excellence</h3>
                <p className="text-muted-foreground">
                  We strive for excellence in everything we do, from client communication to project
                  delivery.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We embrace new technologies and approaches to deliver cutting-edge solutions.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-2">Integrity</h3>
                <p className="text-muted-foreground">
                  We operate with honesty, transparency, and ethical business practices in all our
                  relationships.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-24">
            <div className="text-center mb-12">
              <Heading level="h2">Our Team</Heading>
              <p className="mx-auto max-w-[700px] text-muted-foreground mt-4">
                Meet the talented professionals behind Senavia Corp's success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden bg-muted mb-4">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    Photo
                  </div>
                </div>
                <h3 className="text-xl font-bold">Sebastian Navia Solis</h3>
                <p className="text-muted-foreground">Founder & CEO</p>
              </div>
              <div className="text-center">
                <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden bg-muted mb-4">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    Photo
                  </div>
                </div>
                <h3 className="text-xl font-bold">Maria Rodriguez</h3>
                <p className="text-muted-foreground">Lead Developer</p>
              </div>
              <div className="text-center">
                <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden bg-muted mb-4">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    Photo
                  </div>
                </div>
                <h3 className="text-xl font-bold">David Chen</h3>
                <p className="text-muted-foreground">Design Director</p>
              </div>
              <div className="text-center">
                <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden bg-muted mb-4">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    Photo
                  </div>
                </div>
                <h3 className="text-xl font-bold">Ana Patel</h3>
                <p className="text-muted-foreground">Marketing Specialist</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
