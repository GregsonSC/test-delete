import { MainLayout } from "@/presentation/templates/main-layout";
import { Heading } from "@/presentation/atoms/heading/heading";
import { Button } from "@/presentation/atoms/button/button";
import Link from "next/link";
import { HoverCardWGC } from "@/presentation/molecules/hover-card-wgc/hover-card-wgc";
import { PortfolioCarousel } from "@/presentation/organisms/carousel/portfolio-carousel";

export function MarketingPage() {
  // Portfolio items data
  const portfolioItems = [
    {
      title: "E-commerce Redesign",
      description: "Increased conversion rates by 45% through strategic UX improvements and targeted marketing campaigns.",
      imageUrl: "https://picsum.photos/645/577?random=1",
      href: "/portfolio/ecommerce",
      tags: ["Fashion Industry", "E-commerce", "UX Design"]
    },
    {
      title: "Social Media Growth",
      description: "Developed a comprehensive social strategy that grew audience by 200% and engagement by 78% in 6 months.",
      imageUrl: "https://picsum.photos/645/577?random=2",
      href: "/portfolio/social",
      tags: ["Food & Beverage", "Social Media", "Content Strategy"]
    },
    {
      title: "SEO Transformation",
      description: "Achieved first page rankings for 15 competitive keywords, resulting in 87% increase in organic traffic.",
      imageUrl: "https://picsum.photos/645/577?random=3",
      href: "/portfolio/seo",
      tags: ["Real Estate", "SEO", "Content Marketing"]
    }
  ];

  return (
    <MainLayout>
      {/* First Section - Hero */}
      <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden" style={{ backgroundColor: "#020301" }}>

        <div className="container px-4 md:px-6 text-center max-w-5xl mx-auto">
          <Heading level="h1" className="text-[36px] md:text-[48px] font-[700] mb-6">
            Boost Your Online Success
          </Heading>
          <p className="text-[24px] md:text-[30px] font-[600] text-muted-foreground mb-8 max-w-4xl mx-auto">
            Attract New Leads With a Personalized Marketing Strategy
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
            <Heading level="h2" className="text-[32px] md:text-[42px] font-[700] mb-10 text-left mt-[200px] mx-2 sm:mx-10 md:mx-0">
              Take Your Business To The Next <br />Level
            </Heading>
            <p className="text-[16px] font-[600] text-muted-foreground mb-24 text-left mx-2 sm:mx-10 md:mx-0">
              Convert your website into a lead-generating machine. We build websites that attract <br />your ideal clients and turn every visit into a golden opportunity.
            </p>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-[200px] justify-items-center">
              {/* First Card */}
              <HoverCardWGC 
                icon="/images/marketing/icon1.png"
                title="Advertising & Paid Marketing"
                content="With our innovative ideas, we'll boost your business visibility on paid marketing platforms such as Google Ads & Facebook ads. Our targeted advertising campaigns are fully designed to attract your ideal customers who are actively seeking your products or services."
                link="/services/advertising"
              />
              
              {/* Second Card */}
              <HoverCardWGC 
                icon="/images/marketing/icon2.png"
                title="Social Media Management"
                content="Using proven strategies and engaging content across all social media platforms, Senavia Corp will help your company build a strong online presence by promoting your brand, products, and services."
                link="/services/social-media"
              />
              
              {/* Third Card - Wrapped in a div for positioning */}
              <div className="flex justify-center w-full md:col-span-2 lg:col-span-1 md:flex md:justify-center items-start">
                <HoverCardWGC 
                  icon="/images/marketing/icon3.png"
                  title="SEO & Local Business Positioning"
                  content="Based on your niche market, our SEO specialists will implement optimization strategies using the most profitable keywords for your business. This approach will make your website climb the search engine ranks and steal the spotlight at the top of the search results."
                  link="/services/seo"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Portfolio Section */}
      <section className="container px-4 md:px-6 mx-auto">
        <Heading level="h2" className="text-[32px] md:text-[42px] font-[700] mb-10 text-center mt-[150px]">
          Portfolio
        </Heading>
        <div className="mt-[50px] max-w-6xl mx-auto mb-[150px]">
          <PortfolioCarousel items={portfolioItems} />
        </div>
      </section>
    </MainLayout>
  );
}
