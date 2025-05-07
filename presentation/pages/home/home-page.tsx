import Link from "next/link";
import { MainLayout } from "@/presentation/templates/main-layout";
import { Heading } from "@/presentation/atoms/heading/heading";
import { Button } from "@/presentation/atoms/button/button";
import { HoverCardWGC } from "@/presentation/molecules/hover-card-wgc/hover-card-wgc";
import { PortfolioCarousel } from "@/presentation/organisms/carousel/portfolio-carousel";
import { GoogleReviewCard } from "@/presentation/molecules/review-card/review-card";
import { ReviewCardUser } from "@/presentation/molecules/review-card-user/review-card-user";
import { LatestNews } from "@/presentation/molecules/news/latest-news";
import { ScheduleFreeConsultation } from "@/presentation/organisms/layout/schedule-free-consultation";
import { ContactInfo } from "@/presentation/molecules/contact-info/contact-info";
import ExpandingColumns from "@/presentation/atoms/home/expanding-columns";
import { blogItems, caseItems, portfolioItems, reviewItems } from "@/lib/constants2";



export function HomePage() {
  return (
    <MainLayout>
      {/* First Section - Hero */}
      <section
        className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden mt-20"
        style={{ backgroundColor: "#020301" }}
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/home/hero-background.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.7
          }}
        />

        <div className="container mt-5 mb-5 px-4 md:px-6 text-center max-w-6xl mx-auto relative z-10 text-white">
          <Heading level="h1" className="text-[36px] md:text-[40px] font-[700] mb-12">
            Web Design and Digital Marketing<br />
            Agency in Miami
          </Heading>

          <p className="text-[16px] md:text-[18px] font-normal mb-12 max-w-3xl mx-auto">
            Did you know that your website is the first impression of your business? At Senavia, we are experts in
            web design and digital marketing, turning your online presence into a client-generating machine.
          </p>

          <Button
            asChild
            size="lg"
            className="rounded-full px-8 py-3 text-[16px] font-[600] bg-[#a3e635] text-black hover:bg-[#87c232] transition-colors"
          >
            <Link href="/contact">Get a free consultation!</Link>
          </Button>
        </div>

        <div className="relative z-10 mt-16 w-full max-w-6xl mx-auto">
          <img
            src="/images/home/hero-image.webp"
            alt="Website Preview"
            className="w-full h-auto "

          />
        </div>
      </section>



      {/* --- PARTNERS LOGOS SECTION --- */}
      <section className="w-full bg-white py-8 lg:h-[150px]">
        <div className="container mx-auto h-full flex items-center justify-center">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-5 lg:gap-0 xl:gap-5">
            <img
              src="images/home/googleAnalytic.webp"
              alt="Google Analytics"
              className="h-8 md:h-[100px] md:w-auto xl:h-[120px] lg:w-48"
            />
            <img
              src="images/home/webflow.webp"
              alt="Webflow"
              className="h-8 md:h-[100px] md:w-auto xl:h-[120px] lg:w-48"
            />
            <img
              src="images/home/shopify.webp"
              alt="Shopify"
              className="h-8 md:h-[100px] md:w-auto xl:h-[120px] lg:w-48"
            />
            <img
              src="images/home/paypal.webp"
              alt="PayPal"
              className="h-8 md:h-[100px] md:w-auto xl:h-[120px] lg:w-48"
            />
            <img
              src="images/home/stripe.webp"
              alt="Stripe"
              className="h-8 md:h-[100px] md:w-auto xl:h-[120px] lg:w-48"
            />
          </div>
        </div>
      </section>
      {/* --- END PARTNERS LOGOS SECTION --- */}


      {/* --- HERO VIDEO SECTION --- */}
      <section className="min-h-screen relative flex flex-col justify-center items-center">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-1"
          src="/fondos/blog-video-background.mp4"
          autoPlay
          loop
          muted
        ></video>

        <div className="relative z-2 text-center w-full max-w-4xl mx-auto px-4 mt-5 mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-[#181C3A] text-center mb-4 mt-4">
            5-Star Digital Marketing Agency
          </h1>
          <p className="text-base md:text-lg text-[#181C3A] text-center max-w-xl mx-auto mb-8">
            Located in the heart of South Florida, Senavia Corp. is a full-service agency, providing standout design, web development, and marketing solutions tailored to meet your business needs.
          </p>
          <div className="flex justify-center">
            <div className="w-full max-w-2xl aspect-video rounded-lg overflow-hidden shadow-lg border-2 border-[#181C3A]/10 bg-black md:my-10">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/pABHh3xkdWQ"
                title="SENAVIA - Enjoy Online Success with Smart Digital Marketing"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      {/* --- END HERO VIDEO SECTION --- */}

      {/* Second Section */}
      <section
        className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/marketing/background-marketing.webp')" }}
      >
        <div className="container px-8 sm:px-4 md:px-6 mx-auto">
          <div className="max-w-5xl mx-auto">
            <Heading
              level="h2"
              className="text-[32px] md:text-[42px] font-[700] mb-10 text-left mt-[200px] mx-2 sm:mx-10 md:mx-0"
            >
              Digital Services That Will Lead You To Online Success
            </Heading>

          {/* ! CH005 [URL] Agregar urls para navegar donde se requiere */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-[200px] justify-items-center">
              {/* First Card */}
              <HoverCardWGC
                icon="/images/marketing/icon1.webp"
                title="Web Design & Development"
                content="Engaging and powerful web design that converts visitors into new clients and more sales"
                link="/websites"
              />

              {/* Second Card */}
              <HoverCardWGC
                icon="/images/marketing/icon2.webp"
                title="Generate Traffic, Leads & Sales"
                content="Drive more leads with a tailored marketing strategy designed exclusively for your business "
                link="/marketing"
              />

              {/* Third Card - Wrapped in a div for positioning */}
              <div className="flex justify-center w-full md:col-span-2 lg:col-span-1 md:flex md:justify-center items-start">
                <HoverCardWGC
                  icon="/images/marketing/icon3.webp"
                  title="Create your Professional Brand"
                  content="We build a unique visual identity that leaves lasting impression on your brand"
                  link="/marketing"
                />
              </div>
            </div>
          </div>
        </div>
      </section>





      {/* Portfolio Section */}
      <section className=" px-4 md:px-6 mx-auto relative">
        <div className="absolute right-0 top-[40%] transform -translate-y-1/2 h-full max-h-[70%] z-0 hidden md:block">
          <img
            src="/images/marketing/portfolio-background.webp"
            alt="Portfolio background"
            className="h-full object-contain"
          />
        </div>
        <div className="relative z-10">
          <Heading
            level="h2"
            className="text-[32px] md:text-[42px] font-[700] mb-10 text-center mt-[150px]"
          >
            Our Web Design &
            Development Portfolio
          </Heading>
          <p className="text-[24px] md:text-[20px] font-[600] text-center  mb-8 max-w-4xl mx-auto">
            Fuel your creativity with our latest web design & development masterpieces!
          </p>
          <div className="mt-[50px] max-w-6xl mx-auto mb-[150px]">
            {/* ! CH002: obtener datos del backend para agregar la data del carousel, img, tags, title, description, href  */}
            <PortfolioCarousel items={portfolioItems} />
          </div>
        </div>
      </section>

      <ExpandingColumns />

      {/* New Section with same container and background */}
      <section
        className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat mb-[150px]"
        style={{ backgroundImage: "url('/images/marketing/reviews.jpg')" }}
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
                  See the results of dozens of businesses in Miami that have trusted Senavia and seen positive returns. We offer a unique experience where you are our #1 priority.
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




      {ContactInfo(1)}

      <ScheduleFreeConsultation />

      {/* Fourth Section - Blog/Resources */}
      <section
        className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/marketing/background-marketing.webp')" }}
      >

        <LatestNews />

      </section>

    </MainLayout>
  );
}