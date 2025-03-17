import { Heading } from "@/presentation/atoms/heading/heading";
import Image from "next/image";

export function AgencyIntro() {
  return (
    <section className="py-16 bg-[#3CBFAE]/20">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Heading level="h2" className="text-3xl md:text-4xl font-bold mb-4">
            5-Star Digital Marketing Agency
          </Heading>
          <p className="text-lg">
            Located in the heart of South Florida,{" "}
            <span className="font-semibold">Senavia Corp</span> is a full-service agency, providing
            standout design, web development, and marketing solutions tailored to meet your business
            needs.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/placeholder.svg?height=400&width=700"
              alt="Senavia video"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
