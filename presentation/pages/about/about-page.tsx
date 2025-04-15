import { MainLayout } from "@/presentation/templates/main-layout";
import { Heading } from "@/presentation/atoms/heading/heading";
import { ScheduleFreeConsultation } from "@/presentation/organisms/layout/schedule-free-consultation";
import { ContactInfo } from "@/presentation/molecules/contact-info/contact-info";
import { HoverCardWGC } from "@/presentation/molecules/hover-card-wgc/hover-card-wgc";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

export function AboutPage() { 
  return (
    <MainLayout >
      {/*TITULO*/}
      <section className="bg-[url('/images/marketing/background-marketing.png')] bg-cover bg-center bg-no-repeat">
        <section className="relative overflow-hidden text-center justify-center" >
            <div className="flex-row">
              <video
                className="absolute top-0 left-0 w-full h-full object-cover "
                src="/fondos/about-us-bg-video.mp4"
                autoPlay
                loop
                muted
              />
              <h1 className=" relative z-10 font-bold text-6xl md:text-8xl md:mx-32 mt-32 mb-56">About Us Title</h1>
            </div>
        </section>

        {/*SUBTITULO*/}
        <section className="items-center justify-center mb-14 mt-14 lg:mt-32 lg:mb-56">
          <div className="flex flex-col items-center lg:flex lg:flex-row lg:ml-24 2xl:items-center 2xl:justify-center">
            <div className="mt-5 bg-gradient-to-r from-[#99CC33] via-[#33CCCC] to-[#99CC33] h-72 w-72 lg:h-[552px] lg:w-[552px]"></div>
            <div className="px-5 lg:px-0 lg:ml-28 lg:h-80 lg:w-[596px] lg:mr-12">
              <h1 className="text-5xl font-bold mb-5 mt-3 text-center">Subtitle</h1>
              <p className="text-white text-opacity-70">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper vitae lacus eu convallis. 
          Phasellus ut lectus dolor. Vestibulum eleifend orci non dapibus tincidunt. Phasellus vitae magna tincidunt, 
          aliquam velit sit amet, convallis ante. Nunc non commodo nisi. Morbi libero leo, ultricies at iaculis ac, eleifend ut felis. 
          Duis ipsum velit, vulputate id velit nec, condimentum eleifend lacus. 
          Aliquam erat volutpat. Nunc ac ipsum in nulla volutpat fringilla. Sed et ligula pulvinar, tempus enim eget, pharetra odio. Nulla facilisi. 
          Aliquam at lacus mi. Morbi nec risus quis dui maximus efficitur. Donec ut lacinia urna. Sed fermentum sem egestas fringilla porttitor. 
          Cras sodales eu turpis quis tincidunt.</p>
            </div>
          </div>
        </section>

        {/* Mision y vision */}
        <section>
          <div className="p-5 flex flex-col items-center justify-center gap-8 xl:p-0 xl:grid xl:grid-cols-[auto_auto] xl:gap-x-14 xl:gap-y-10 xl:justify-items-center xl:w-[888px] xl:mx-auto">
            <Card className="p-4 bg-[#3f4049] rounded-lg border-2 border-transparent xl:h-[400px] xl:w-[418px]" style={{ borderImage: "linear-gradient(to right, #99CC33, #33CCCC, #99CC33) 2" }}>
              <CardTitle className="text-5xl font-bold mb-5 ml-4 mt-6">Our Mission</CardTitle>
              <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper vitae lacus eu convallis. Phasellus ut lectus dolor. Vestibulum eleifend orci non dapibus tincidunt.</CardContent>
            </Card>
            <div className="bg-gradient-to-r from-[#99CC33] via-[#33CCCC] to-[#99CC33] h-72 w-full xl:h-[400px] xl:w-[418px]"></div>
            <div className="bg-gradient-to-r from-[#99CC33] via-[#33CCCC] to-[#99CC33] h-72 w-full xl:h-[400px] xl:w-[418px]"></div>
            <Card className="p-4 bg-[#3f4049] rounded-lg border-2 border-transparent xl:h-[400px] xl:w-[418px]" style={{ borderImage: "linear-gradient(to right, #99CC33, #33CCCC, #99CC33) 2" }}>
              <CardTitle className="text-5xl font-bold mb-5 ml-4 mt-6">Our Mission</CardTitle>
              <CardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper vitae lacus eu convallis. Phasellus ut lectus dolor. Vestibulum eleifend orci non dapibus tincidunt.</CardContent>
            </Card>
          </div>
        </section>


        {/*Ubicacion*/}
        <section>
          <h1 className="text-7xl font-bold mb-5">Locations</h1>
          <div>
            <img alt="world-map" src="images/about-us/world-map.png" className="mx-auto"/>
          </div>
        </section>
        
        <section
                className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
              >
                <div className="container px-8 sm:px-4 md:px-6 mx-auto">
                  <div className="max-w-5xl mx-auto">
                    <Heading
                      level="h2"
                      className="text-[32px] md:text-[42px] font-[700] mb-10 text-left mt-[200px] mx-2 sm:mx-10 md:mx-0"
                    >
                      Digital Services That Will <br/> Lead You To Online Success
                    </Heading>
        
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-[200px] justify-items-center">
                      {/* First Card */}
                      <HoverCardWGC
                        icon="/images/marketing/icon1.png"
                        title="Web Design & Development"
                        content="Engaging and powerful web design that converts visitors into new clients and more sales."
                        link="/services/advertising"
                      />
        
                      {/* Second Card */}
                      <HoverCardWGC
                        icon="/images/marketing/icon2.png"
                        title="Generate Traffic, Leads & Sales"
                        content="Drive more leads with a tailored marketing strategy designed exclusively for your business."
                        link="/services/social-media"
                      />
        
                      {/* Third Card - Wrapped in a div for positioning */}
                      <div className="flex justify-center w-full md:col-span-2 lg:col-span-1 md:flex md:justify-center items-start">
                        <HoverCardWGC
                          icon="/images/marketing/icon3.png"
                          title="Create your Professional Brand"
                          content="We build a unique visual identity that leaves lasting impression on your brand."
                          link="/services/seo"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
        {ContactInfo(1)}
      <ScheduleFreeConsultation/>
      </section>
    </MainLayout>
  );
}
