'use client';

import { MainLayout } from "@/presentation/templates/main-layout";
import { useParams } from "next/navigation";
import { ContactInfo } from "@/presentation/molecules/contact-info/contact-info";
import { GoogleReviewCard } from "@/presentation/molecules/review-card/review-card";
import { ReviewCardUser } from "@/presentation/molecules/review-card-user/review-card-user";
import {Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  const params = useParams<{ service: string }>();
  console.log(params.service);

  return (
    <MainLayout>
      <section>
        {/* first section */}
        <section>
          <div className="relative mt-20 text-center px-5 z-0 overflow-hidden lg:mt-60 lg:mb-80">
          <div className="hidden rounded-sm absolute top-0 left-1/2 md:left-3/4 -translate-x-1/2 w-11/12 h-4/5 md:w-3/6 md:h-96 bg-gradient-to-r from-[#99CC33] via-[#33CCCC] to-[#99CC33] opacity-50 z-0" />
            <div className="relative z-10 space-y-5 lg:pl-28 lg:pr-[441px]">
              <h1 className="font-bold text-4xl mb-5 lg:text-7xl lg:text-start">
                Web Design Services in Miami Beach
              </h1>
              <p className="text-justify opacity-80 font-medium lg:text-start">
                Welcome to the premier choice for professional web design services in Miami Beach! Whether you’re a local business, a trendy boutique, a luxury hotel, or a thriving restaurant, we specialize in creating custom web designs that not only look stunning but also drive real results.
              </p>
              <Link href="/contact">
                <Button className="mt-5 rounded-full font-bold text-2xl px-10 py- lg:w-72 lg:h-14">
                  Book A Call Now!
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* second section (Cards section) */}
        <section >
          <div className="mt-10 text-center px-5 lg:ml-[658px] lg:mr-[76px] lg:px-0">
            <h1 className="font-bold text-4xl mb-5 lg:text-5xl lg:text-start">Why Choose Our Miami Beach Web Design Services?</h1>
            <div>
              <Card className="relative border border-white text-start items-center justify-center bg-white/5 mb-3 pt-3">
                <Image src="/images/post-schedule/Frame 22.png" alt="correct-badge" width={58} height={58} className="absolute left-3 top-1/2 transform -translate-y-8"/>
                <CardTitle className="text-lg pl-20">Custom Web Design for Miami Beach Businesses</CardTitle>
                <CardContent className="text-base pl-20">We create unique, eye-catching websites tailored to your brand and the Miami Beach audience.</CardContent>
              </Card>
              
              <Card className="relative border border-white text-start items-center justify-center bg-white/5 mb-3 pt-3">
                <Image src="/images/post-schedule/Frame 22.png" alt="correct-badge" width={58} height={58} className="absolute left-3 top-1/2 transform -translate-y-8"/>
                <CardTitle className="text-lg pl-20">Mobile-Friendly & Responsive Web Design</CardTitle>
                <CardContent className="text-base pl-20">With so many users browsing on their phones, we ensure your website is fully responsive and looks amazing on any device.</CardContent>
              </Card>

              <Card className="relative border border-white text-start items-center justify-center bg-white/5 mb-3 pt-3">
                <Image src="/images/post-schedule/Frame 22.png" alt="correct-badge" width={58} height={58} className="absolute left-3 top-1/2 transform -translate-y-8"/>
                <CardTitle className="text-lg pl-20">SEO-Optimized Websites for Local Visibility</CardTitle>
                <CardContent className="text-base pl-20">Our websites are built with local SEO strategies to help you rank higher on Google and attract more customers in Miami Beach.</CardContent>
              </Card>

              <Card className="relative border border-white text-start items-center justify-center bg-white/5 mb-3 pt-3">
                <Image src="/images/post-schedule/Frame 22.png" alt="correct-badge" width={58} height={58} className="absolute left-3 top-1/2 transform -translate-y-8"/>
                <CardTitle className="text-lg pl-20">Conversion-Focused Web Development</CardTitle>
                <CardContent className="text-base pl-20">From clear calls-to-action to intuitive navigation, we design websites that turn visitors into paying customers.</CardContent>
              </Card>

              <Card className="relative border border-white text-start items-center justify-center bg-white/5 mb-3 pt-3">
                <Image src="/images/post-schedule/Frame 22.png" alt="correct-badge" width={58} height={58} className="absolute left-3 top-1/2 transform -translate-y-8"/>
                <CardTitle className="text-lg pl-20">Ongoing Website Maintenance & Support</CardTitle>
                <CardContent className="text-base pl-20">Your website is your digital storefront. We offer reliable website maintenance to keep it running smoothly and securely.</CardContent>
              </Card>
              
            </div>
          </div>
        </section>
        {/* Testimonial section */}
        <section
          className=" flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
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
