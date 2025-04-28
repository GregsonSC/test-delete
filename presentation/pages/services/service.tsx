'use client';

import { MainLayout } from "@/presentation/templates/main-layout";
import { useParams } from "next/navigation";
import { ContactInfo } from "@/presentation/molecules/contact-info/contact-info";
import { GoogleReviewCard } from "@/presentation/molecules/review-card/review-card";
import { ReviewCardUser } from "@/presentation/molecules/review-card-user/review-card-user";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { serviceContent } from "@/components/const/service";
import { notFound } from "next/navigation";

const reviewItems = [
  {
    profilePicture: "/fotos-prueba/joe.jpg",
    name: "Sarah Johnson",
    rating: 5.0,
    review: "Review",
  },
  {
    profilePicture: "/fotos-prueba/joe.jpg",
    name: "Michael Chen",
    rating: 5.0,
    review: "Review",
  },
  {
    profilePicture: "/fotos-prueba/joe.jpg",
    name: "Emily Rodriguez",
    rating: 5.0,
    review: "Review",
  }
];

export function ServicePage() {
  const params = useParams<{ service: string[] }>()

  const [county, city, serviceKey] = params.service ?? []
  const countyConfig = serviceContent[county]
  const validCity = countyConfig?.cities.includes(city)
  const content = validCity ? countyConfig.services[serviceKey] : undefined

  if (!content) {
    notFound()
  }

  return (
    <MainLayout>
      <section>
        {/* first section */}
        <section>
          <div className="overflow-hidden relative">
            <div className="hidden lg:block rounded-md absolute top-28 right-0  w-[840px] h-[679px] bg-gradient-to-r from-[#99CC33] via-[#33CCCC] to-[#99CC33] opacity-50 z-0" />
            <div className="relative mt-20 text-center px-5 z-0 overflow-hidden lg:mt-60 lg:mb-80">
              <div className="lg:place-items-start relative z-10 space-y-5 lg:pl-28 lg:pr-[448px] 2xl:lg:pr-[900px]">
                <h1 className="font-bold text-4xl mb-5 lg:text-7xl lg:text-start">
                  {content.title}
                </h1>
                <p className="text-justify opacity-80 font-medium lg:text-start">
                  {content.description}
                </p>
                <Link href="/contact">
                  <Button className="mt-5 rounded-full font-bold text-2xl px-10 py- lg:w-72 lg:h-14">
                    Book A Call Now!
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* second section (Cards section) */}
        <section className="p-0">
          <div className="overflow-hidden relative h-full">
            <div className="hidden lg:block rounded-md absolute top-20  lg:w-80 xl:w-[600px] lg:h-[800px] xl:h-[680px] 2xl:h-[600] bg-gradient-to-r from-[#99CC33] via-[#33CCCC] to-[#99CC33]" />
            <div className="items-center mt-10 lg:mt-20 lg:mb-28 text-center px-5  lg:pl-96 xl:pl-[658px] lg:pr-[76px] lg:px-0 relative z-0">
              <h1 className="font-bold text-4xl mb-5 lg:text-5xl lg:text-start">{content.cardsSectionTitle}</h1>
              <div>
                {content.cardItems.map((card, i) => (
                  <Card
                    key={i}
                    className="relative border border-white text-start items-center justify-center bg-white/5 mb-3 pt-3"
                  >
                    <Image
                      src="/images/post-schedule/Frame 22.png"
                      alt="icon"
                      width={58}
                      height={58}
                      className="absolute left-3 top-1/2 -translate-y-8"
                    />
                    <CardTitle className="text-lg pl-20">
                      {card.title}
                    </CardTitle>
                    <CardContent className="text-base pl-20 pb-3">
                      {card.description}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial section */}
        <section
          className="flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/fondos/ReviewsGreenBurblesBackground.jpg')" }}
        >
          <div className="container px-8 sm:px-4 md:px-6 mx-auto flex items-center justify-center h-full">
            <div className="max-w-5xl mx-auto w-full">
              {/* Content container */}
              <div className="bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-3xl p-8 md:p-12 mx-auto max-w-5xl relative overflow-hidden my-[120px]">
                <div className="text-center mb-8">
                  <h3 className="text-[32px] md:text-[36px] font-bold text-white mb-4">
                    Testimonials Section
                  </h3>
                  <p className="text-[16px] md:text-[18px] text-gray-300 max-w-2xl mx-auto">
                    See the results of dozens of businesses that have trusted Senavia and seen positive returns. We offer a unique experience where you are our #1 priority.
                  </p>
                </div>

                {/* Google Reviews Summary */}
                <div className="flex justify-center mb-12">
                  <GoogleReviewCard rating={5.0} totalReviews={25} />
                </div>

                {/* Individual Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {reviewItems.map((review, index) => (
                    <ReviewCardUser
                      key={index}
                      profilePicture={review.profilePicture}
                      name={review.name}
                      rating={review.rating}
                      review={review.review}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
      {ContactInfo(2)}
    </MainLayout>
  );
}
