import { MainLayout } from "@/presentation/templates/main-layout";
import { Heading } from "@/presentation/atoms/heading/heading";
import { Button } from "@/presentation/atoms/button/button";
import Link from "next/link";
import { HoverCardWGC } from "@/presentation/molecules/hover-card-wgc/hover-card-wgc";
import { PortfolioCarousel } from "@/presentation/organisms/carousel/portfolio-carousel";
import { GoogleReviewCard } from "@/presentation/molecules/review-card/review-card";
import { ReviewCardUser } from "@/presentation/molecules/review-card-user/review-card-user";
import { LatestNews, NewsItem } from "@/presentation/molecules/news/latest-news";
import { ScheduleFreeConsultation } from "@/presentation/organisms/layout/schedule-free-consultation";
import { ContactInfo } from "@/presentation/molecules/contact-info/contact-info";
import { reviewItems } from "@/lib/constants2";

export function WebsitesPage() {
  // Portfolio items data
  const portfolioItems = [
    {
      title: "E-commerce Redesign",
      description:
        "Increased conversion rates by 45% through strategic UX improvements and targeted marketing campaigns.",
      imageUrl: "https://picsum.photos/645/577?random=1",
      href: "/portfolio/ecommerce",
      tags: ["Fashion Industry", "E-commerce", "UX Design"],
    },
    {
      title: "Social Media Growth",
      description:
        "Developed a comprehensive social strategy that grew audience by 200% and engagement by 78% in 6 months.",
      imageUrl: "https://picsum.photos/645/577?random=2",
      href: "/portfolio/social",
      tags: ["Food & Beverage", "Social Media", "Content Strategy"],
    },
    {
      title: "SEO Transformation",
      description:
        "Achieved first page rankings for 15 competitive keywords, resulting in 87% increase in organic traffic.",
      imageUrl: "https://picsum.photos/645/577?random=3",
      href: "/portfolio/seo",
      tags: ["Real Estate", "SEO", "Content Marketing"],
    },
  ];

  // Blog news data
  const blogItems: NewsItem[] = [
    {
      id: "1",
      title: "Title",
      content: "Content",
      image: "/images/marketing/mk3.png",
      date: "June 15, 2023",
      tag: "Marketing"
    },
    {
      id: "2",
      title: "Title",
      content: "Content",
      image: "/images/marketing/mk3.png",
      date: "July 22, 2023",
      tag: "SEO"
    },
    {
      id: "3",
      title: "Title",
      content: "Content",
      image: "/images/marketing/mk3.png",
      date: "August 10, 2023",
      tag: "Social Media"
    },
    {
      id: "4",
      title: "Title",
      content: "Content",
      image: "/images/marketing/mk3.png",
      date: "September 5, 2023",
      tag: "Content"
    },
    {
      id: "5",
      title: "Title",
      content: "Content",
      image: "/images/marketing/mk3.png",
      date: "October 18, 2023",
      tag: "Advertising"
    }
  ];

  // Case studies data
  const caseItems: NewsItem[] = [
    {
      id: "case1",
      title: "E-commerce Conversion Boost",
      content: "How we increased online sales by 75% for a retail client",
      image: "https://picsum.photos/597/336",
      date: "May 10, 2023",
      tag: "E-commerce"
    },
    {
      id: "case2",
      title: "Local SEO Success Story",
      content: "Helping a small business dominate local search results",
      image: "https://picsum.photos/597/336",
      date: "July 3, 2023",
      tag: "SEO"
    }
  ];

  return (
    <MainLayout>




      {/* First Section - Hero */}



      <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden" style={{ backgroundColor: "#020301" }}>

        <div className="container px-4 md:px-6 text-center max-w-5xl mx-auto">
          <Heading level="h1" className="text-[36px] md:text-[48px] font-[700] mb-6">
          Professional Web Design and
          Development in Miami
          </Heading>
          <p className="text-[24px] md:text-[20px] font-[600] text-muted-foreground mb-8 max-w-4xl mx-auto">
          Do you still not have a website, or is your current site not up to date with modern design standards? We specialize in creating websites designed to generate the maximum number of conversions. 
          Every visitor to your site is an opportunity, and we ensure you don’t miss any.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 text-[20px] font-[600]"
          >
            <Link href="/contact">Get a free consultation!</Link>
          </Button>
        </div>
      </section>

      {/* Second Section */}
      <section
        className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/marketing/background-marketing.png')" }}
      >
        <div className="container px-8 sm:px-4 md:px-6 mx-auto">
          <div className="max-w-5xl mx-auto">
            <Heading
              level="h2"
              className="text-[32px] md:text-[42px] font-[700] mb-10 text-left mt-[200px] mx-2 sm:mx-10 md:mx-0"
            >
              Websites That Convert Visitors Into New Customers
            </Heading>
            <p className="text-[16px] font-[600] text-muted-foreground mb-24 text-left mx-2 sm:mx-10 md:mx-0">
              Convert your website into a lead-generating machine. We build websites that attract{" "}
              <br />
              your ideal clients and turn every visit into a golden opportunity.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-[200px] justify-items-center">
              {/* First Card */}
              <HoverCardWGC
                icon="/images/marketing/icon1.png"
                title="Custom Web Design"
                content="Partner with our team to get a web design that combines cutting-edge technology, top-notch quality, and the innovation your business deserves. Each design is 100% customized and fully optimized for search engines."
                link="/services/advertising"
              />

              {/* Second Card */}
              <HoverCardWGC
                icon="/images/marketing/icon2.png"
                title="CMS Web Development"
                content="Managing website content has never been easier. Run your website while effortlessly updating daily content. Our clean-coded CMS web development services deliver a reliable and scalable platform for seamless content management."
                link="/services/social-media"
              />

              {/* Third Card - Wrapped in a div for positioning */}
              <div className="flex justify-center w-full md:col-span-2 lg:col-span-1 md:flex md:justify-center items-start">
                <HoverCardWGC
                  icon="/images/marketing/icon3.png"
                  title="E-commerce Websites"
                  content="We specialize in creating powerful, fully responsive E-commerce websites that not only look great but perform brilliantly as well. With reliable top-notch payment gateway integration and the latest technologies working with popular platforms like Shopify, Magento, and WooCommerce."
                  link="/services/seo"
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
            src="/images/marketing/portfolio-background.png" 
            alt="Portfolio background" 
            className="h-full object-contain"
          />
        </div>
        <div className="relative z-10">
          <Heading
            level="h2"
            className="text-[32px] md:text-[42px] font-[700] mb-10 text-center mt-[150px]"
          >
            Portfolio
          </Heading>
          <div className="mt-[50px] max-w-6xl mx-auto mb-[150px]">
            <PortfolioCarousel items={portfolioItems} />
          </div>
        </div>
      </section>

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
        style={{ backgroundImage: "url('/images/marketing/background-marketing.png')" }}
      >

        <LatestNews blogItems={blogItems} caseItems={caseItems} />

      </section>

    </MainLayout>
  );
}
