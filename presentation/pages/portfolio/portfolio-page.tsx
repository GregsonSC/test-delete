import { MainLayout } from "@/presentation/templates/main-layout";
import { GoogleReviewCard } from "@/presentation/molecules/review-card/review-card";
import { ReviewCardUser } from "@/presentation/molecules/review-card-user/review-card-user";
import { LatestNews, NewsItem } from "@/presentation/molecules/news/latest-news";
import { ScheduleFreeConsultation } from "@/presentation/organisms/layout/schedule-free-consultation";
import { ContactInfo } from "@/presentation/molecules/contact-info/contact-info";
// Import the PortfolioCardSmall component
import { PortfolioCardSmall } from "@/presentation/atoms/portfolio-card/portfolio-card-small";

export function PortfolioPage() {
  // Portfolio items data (using placeholder images and links)
  const portfolioItems = [
    {
      title: "Page title 1",
      description: "Brief description of project 1.",
      imageUrl: "/images/portfolio/portfolio-item-placeholder.png", // Replace with actual image path
      href: "/portfolio/project-1", // Replace with actual link
    },
    {
      title: "Page title 2",
      description: "Brief description of project 2.",
      imageUrl: "/images/portfolio/portfolio-item-placeholder.png", // Replace with actual image path
      href: "/portfolio/project-2", // Replace with actual link
    },
    {
      title: "Page title 3",
      description: "Brief description of project 3.",
      imageUrl: "/images/portfolio/portfolio-item-placeholder.png", // Replace with actual image path
      href: "/portfolio/project-3", // Replace with actual link
    },
    {
      title: "Page title 4",
      description: "Brief description of project 4.",
      imageUrl: "/images/portfolio/portfolio-item-placeholder.png", // Replace with actual image path
      href: "/portfolio/project-4", // Replace with actual link
    },
    {
      title: "Page title 5",
      description: "Brief description of project 5.",
      imageUrl: "/images/portfolio/portfolio-item-placeholder.png", // Replace with actual image path
      href: "/portfolio/project-5", // Replace with actual link
    },
    {
      title: "Page title 6",
      description: "Brief description of project 6.",
      imageUrl: "/images/portfolio/portfolio-item-placeholder.png", // Replace with actual image path
      href: "/portfolio/project-6", // Replace with actual link
    },
  ];

  // Review items data
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
    },
    {
      profilePicture: "/fotos-prueba/joe.jpg",
      name: "David Wilson",
      rating: 5.0,
      review: "Review",
    },
    {
      profilePicture: "/fotos-prueba/joe.jpg",
      name: "Jessica Lee",
      rating: 5.0,
      review: "Review",
    },
    {
      profilePicture: "/fotos-prueba/joe.jpg",
      name: "Robert Taylor",
      rating: 5.0,
      review: "Review",
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



      {/* --- NEW PORTFOLIO SECTION --- */}
      <section className="bg-[#060B20] py-16 md:py-24">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          {/* Section Title */}
          <h2 className="text-5xl font-bold text-white text-center mb-16 md:mb-20"> {/* Updated size and margin */}
            Explore Our Web Portfolio
          </h2>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            {portfolioItems.map((item, index) => (
              <PortfolioCardSmall
                key={index}
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl}
                href={item.href}
                className="w-full h-auto aspect-square" // Ensure cards maintain aspect ratio
              />
            ))}
          </div>
        </div>
      </section>
      {/* --- END NEW PORTFOLIO SECTION --- */}



     


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
                See Why Clients Love Our Services!
                </h3>
                <p className="text-[16px] md:text-[18px] text-gray-300 max-w-2xl mx-auto">
                We aim to surpass our client’s expectations, becoming your trusted partner in achieving goals and identifying the best path forward for your business.
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
