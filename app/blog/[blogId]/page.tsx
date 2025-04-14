import { MainLayout } from "@/presentation/templates/main-layout";
import { Heading } from "@/presentation/atoms/heading/heading";
import { notFound } from "next/navigation";
import { Button } from "@/presentation/atoms/button/button";
import { HoverCardImage } from "@/presentation/molecules/hover-card-image/hover-card-image";
import { ScheduleFreeConsultation } from "@/presentation/organisms/layout/schedule-free-consultation";
import { ContactInfo } from "@/presentation/molecules/contact-info/contact-info";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  tag: string;
}

async function getBlogPost(id: string): Promise<BlogPost | null> {
  try {
    // Datos de ejemplo para desarrollo
    return {
      id,
      title: "Blog Entry Title",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sodales nibh. Fusce fermentum dapibus arcu, id hendrerit odio consectetur vitae.",
      image: "/images/marketing/mk3.png",
      date: "June 15, 2023",
      tag: "Marketing"
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export default async function BlogDetailPage({ params }: { params: { blogId: string } }) {
  const blogId = params.blogId;
  const blogPost = await getBlogPost(blogId);
  
  if (!blogPost) {
    notFound();
  }

  return (
    <MainLayout>
      {/* Hero section with gradient background */}
      <div className="w-full pt-20 pb-16 bg-[#04081E]">
        <div className="container mx-auto px-4">
          {/* Gradient card with blog title */}
          <div 
            className="w-full aspect-auto md:aspect-[16/9] max-w-6xl mx-auto rounded-lg overflow-hidden flex flex-col justify-end p-9"
            style={{ 
              background: "linear-gradient(135deg, #8ECF0A 0%, #2EBAC6 100%)",
            }}
          >
            <Heading level="h1" className="text-[40px] sm:text-[50px] md:text-[60px] lg:text-[80px] font-[700] text-white ">
              {blogPost.title}
            </Heading>
            <p className="text-[16px] md:text-[18px] font-[600] text-white/80 w-full">
              {blogPost.content}
            </p>
          </div>
        </div>
      </div>

      {/* Blog content section */}
      <section className="py-16 bg-[#04081E] mb-[125px] mt-14">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-[121px]">
            {/* Main content column */}
            <div className="w-full lg:w-2/3">
              {/* Author info */}
              <div className="flex items-center gap-3 mb-[45px]">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8ECF0A] via-[#39cac0] to-[#8ECF0A] flex items-center justify-center"></div>
                <div className="flex flex-col">
                  <span className="font-semibold text-white">Author Name</span>
                  <span className="text-sm text-gray-400">Entry Date</span>
                </div>
              </div>

              <div className="prose prose-lg prose-invert">
                <h2 className="text-white text-4xl font-bold mb-6">Subtitle</h2>
                <p className="text-gray-300 mb-6 leading-relaxed text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper vitae lacus eu convallis. Phasellus ut lectus dolor. Vestibulum eleifend orci non dapibus tincidunt. Phasellus vitae magna tincidunt, aliquam velit sit amet, convallis ante. Nunc non commodo nisi. Morbi libero leo, ultricies at iaculis ac, eleifend ut felis. Duis ipsum velit, vulputate id velit nec, condimentum eleifend lacus. Aliquam erat volutpat. Nunc ac ipsum in nulla volutpat fringilla. Sed et ligula pulvinar, tempus enim eget, pharetra odio. Nulla facilisi. Aliquam at lacus mi. Morbi nec risus quis dui maximus efficitur. Donec ut lacinia urna. Sed fermentum sem egestas fringilla porttitor. Cras sodales eu turpis quis tincidunt.
                </p>

                {/* Blockquote with green left border */}
                <blockquote className="border-l-4 border-[#8ECF0A] pl-4 py-2 my-8 italic text-gray-300 ml-[54px] mb-[45px]">
                  Mauris nec volutpat odio. Fusce rhoncus pretium vestibulum. Etiam ut purus pretium, volutpat odio non, facilisis nibh. Donec aliquet turpis et hendrerit ullamcorper. In id dictum lacus, vitae tempus elit.
                </blockquote>

                <h2 className="text-white text-4xl font-bold mb-6">Subtitle</h2>
                
                {/* Image with gradient background */}
                <div className="w-full aspect-video bg-gradient-to-r from-[#8ECF0A] to-[#2EBAC6] rounded-lg mb-6"></div>
                
                <p className="text-[#D3E8A9] text-sm text-center mb-8 italic">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper vitae lacus eu convallis. Phasellus ut lectus dolor.
                </p>
                
                <p className="text-gray-300 mb-6 leading-relaxed text-justify">
                  Mauris nec volutpat odio. Fusce rhoncus pretium vestibulum. Etiam ut purus pretium, volutpat odio non, facilisis nibh. Donec aliquet turpis et hendrerit ullamcorper. In id dictum lacus, vitae tempus elit. Curabitur euismod sem augue, ac pulvinar arcu egestas et. Duis viverra, ex eu imperdiet sagittis, lectus mauris pretium mi, non tempus eros nisl sed sapien. Maecenas quis lobortis lectus. In condimentum, magna at scelerisque varius, felis purus laoreet odio, vitae luctus velit mauris ut ex. Integer pharetra ex metus, ac dictum dui lobortis eget. Pellentesque id fermentum nunc. Aliquam commodo urna in magna condimentum aliquet. Nunc aliquam magna sed lobortis faucibus.
                </p>
                
                <p className="text-gray-300 mb-6 leading-relaxed text-justify">
                  Etiam non est vel nunc eleifend semper. Quisque augue mauris, mollis at volutpat non, suscipit in nibh. Aliquam erat volutpat. Mauris nec volutpat odio. Fusce rhoncus pretium vestibulum. Etiam ut purus pretium, volutpat odio non, facilisis nibh. Donec aliquet turpis et hendrerit ullamcorper. In id dictum lacus, vitae tempus elit. Curabitur euismod sem augue, ac pulvinar arcu egestas et. Duis viverra, ex eu imperdiet sagittis, lectus mauris pretium mi, non tempus eros nisl sed sapien. Maecenas quis lobortis lectus. In condimentum, magna at scelerisque varius, felis purus laoreet odio, vitae luctus velit mauris ut ex.
                </p>
              </div>
            </div>

            {/* Sidebar column with related articles */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-24">
                {/* Consultation button */}
                <Button 
                  className="w-full rounded-full bg-[#99CC33] text-black hover:bg-[#8ab82e] hover:text-white hover:shadow-[0_0_15px_rgba(153,204,51,0.7)] px-8 py-3 font-bold text-lg transition-all mb-12"
                >
                  Get a free consultation!
                </Button>
                
                <h3 className="text-white text-4xl font-bold mb-9">Read More</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 justify-items-center">
                  {[1, 2, 3, 4].map((index) => (
                    <HoverCardImage
                      key={index}
                      image="/images/marketing/mk3.png"
                      title="Title"
                      content="Contents"
                      date="Date"
                      tag="Tag"
                      href={`/blog/${index}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {ContactInfo(1)}

<ScheduleFreeConsultation />
    </MainLayout>
  );
}