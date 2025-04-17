import { MainLayout } from "@/presentation/templates/main-layout";
import { Heading } from "@/presentation/atoms/heading/heading";
import { ScheduleFreeConsultation } from "@/presentation/organisms/layout/schedule-free-consultation";
import { ContactInfo } from "@/presentation/molecules/contact-info/contact-info";
import { HoverCardWGC } from "@/presentation/molecules/hover-card-wgc/hover-card-wgc";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image";

export function AboutPage() { 
  return (
    <MainLayout >
      {/*TITULO*/}
      <section className="lg:bg-[url('/images/marketing/background-marketing.png')] lg:bg-cover lg:bg-center lg:bg-no-repeat">
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
        <section className="items-center justify-center mb-20 mt-14 lg:mt-32 lg:mb-56">
          <div className="flex flex-col items-center lg:flex lg:flex-row lg:ml-24 2xl:items-center 2xl:justify-center">
            <div className="mt-5 bg-gradient-to-r from-[#99CC33] via-[#33CCCC] to-[#99CC33] h-72 w-72 lg:h-[552px] lg:w-[552px]"></div>
            <div className="px-10 mt-5  lg:mb-0 lg:mt-0 lg:px-0 lg:ml-28 lg:h-80 lg:w-[596px] lg:mr-12">
              <h1 className="text-5xl font-bold mb-5 mt-3 text-center">Subtitle</h1>
              <p className="text-white text-opacity-70 text-center lg:text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper vitae lacus eu convallis. 
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
          <div className="mx-8 flex flex-col items-center justify-center gap-8 md:p-0 md:grid md:grid-cols-2  md:justify-items-center lg:w-[888px] md:mx-auto">
            {/* First Card */}
            <Card className="md:ml-10 lg:ml-0 md:p-4 bg-[#3f4049] rounded-lg border-2 border-transparent lg:h-[400px] lg:w-[418px]" style={{ borderImage: "linear-gradient(to right, #99CC33, #33CCCC, #99CC33) 2" }}>
              <CardTitle className="text-3xl lg:text-5xl font-bold mb-5 ml-4 mt-6">
                Our Mission
              </CardTitle>
              <CardContent>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper vitae lacus eu convallis. Phasellus ut lectus dolor. Vestibulum eleifend orci non dapibus tincidunt. Phasellus vitae magna tincidunt, aliquam velit sit amet, convallis ante. Nunc non commodo nisi. Morbi libero leo, ultricies at iaculis ac, eleifend ut felis. Duis ipsum velit, vulputate id velit nec, condimentum eleifend lacus.
                {/* Mobile-only gradient divs inside Card */}
                <div className="block lg:hidden bg-gradient-to-r from-[#99CC33] via-[#33CCCC] to-[#99CC33] h-72 w-full mt-4" />
              </CardContent>
            </Card>

            {/* Large screens: gradient divs between cards */}
            <div className="hidden lg:block bg-gradient-to-r from-[#99CC33] via-[#33CCCC] to-[#99CC33] h-72 w-full lg:h-[400px] lg:w-[418px]" />
            <div className="hidden lg:block bg-gradient-to-r from-[#99CC33] via-[#33CCCC] to-[#99CC33] h-72 w-full lg:h-[400px] lg:w-[418px]" />

            {/* Second Card */}
            <Card className="md:mr-10 lg:mr-0 md:p-4 bg-[#3f4049] rounded-lg border-2 border-transparent lg:h-[400px] lg:w-[418px]" style={{ borderImage: "linear-gradient(to right, #99CC33, #33CCCC, #99CC33) 2" }}>
              <CardTitle className="text-3xl lg:text-5xl font-bold mb-5 ml-4 mt-6">
                Our Mission
              </CardTitle>
              <CardContent>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper vitae lacus eu convallis. Phasellus ut lectus dolor. Vestibulum eleifend orci non dapibus tincidunt. Phasellus vitae magna tincidunt, aliquam velit sit amet, convallis ante. Nunc non commodo nisi. Morbi libero leo, ultricies at iaculis ac, eleifend ut felis. Duis ipsum velit, vulputate id velit nec, condimentum eleifend lacus.
                {/* Mobile-only gradient divs inside Card */}
                <div className="block lg:hidden bg-gradient-to-r from-[#99CC33] via-[#33CCCC] to-[#99CC33] h-72 w-full mt-4" />
              </CardContent>
            </Card>
          </div>
        </section>


        {/*Ubicacion*/}
        <section className="text-center lg:mt-56 mt-14">
          <h1 className="text-3xl lg:text-7xl font-bold mb-5">Locations</h1>
          <div className="mx-8">
            <img alt="world-map" src="images/about-us/world-map.png" className="mx-auto"/>
          </div>
        </section>

        {/*Servicios */}
        <section className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat mt-16 mb-[60px]">
                <div className="container px-8 sm:px-4 md:px-6 mx-auto">
                  <div className="max-w-5xl mx-auto">
                    <Heading
                      level="h1"
                      className=" text-3xl lg:text-5xl  font-bold mb-5 lg:mb-10 text-left  mx-2 sm:mx-10 md:mx-0"
                    >
                      Digital Services That Will <br/> Lead You To Online Success
                    </Heading>
        
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  justify-items-center">
                      {/* First Card */}
                      <HoverCardWGC
                        icon="/images/marketing/icon1.png"
                        title="Web Design & Development"
                        content="Engaging and powerful web design that converts visitors into new clients and more sales."
                        link="/services/advertising"
                        style={{borderRadius: "5px", 
                          border: "3px solid transparent", 
                          borderImage: "linear-gradient(to right, #99CC33, #33CCCC, #99CC33) 2", 
                          mask: "linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0)",
                          WebkitMaskComposite: "exclude" }}
                      />
        
                      {/* Second Card */}
                      <HoverCardWGC
                        icon="/images/marketing/icon2.png"
                        title="Generate Traffic, Leads & Sales"
                        content="Drive more leads with a tailored marketing strategy designed exclusively for your business."
                        link="/services/social-media"
                        style={{  borderRadius: "5px", 
                          border: "3px solid transparent", 
                          borderImage: "linear-gradient(to right, #99CC33, #33CCCC, #99CC33) 2", 
                          mask: "linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0)",
                          WebkitMaskComposite: "exclude" }}
                      />
        
                      {/* Third Card - Wrapped in a div for positioning */}
                      <div className="flex justify-center w-full md:col-span-2 lg:col-span-1 md:flex md:justify-center items-start">
                        <HoverCardWGC
                          icon="/images/marketing/icon3.png"
                          title="Create your Professional Brand"
                          content="We build a unique visual identity that leaves lasting impression on your brand."
                          link="/services/seo"
                          style={{ 
                            borderRadius: "5px", 
                            border: "3px solid transparent", 
                            borderImage: "linear-gradient(to right, #CC33B8, #5933CC, #CC33B8) 2", 
                            mask: "linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0)",
                            WebkitMaskComposite: "exclude"
                          }}
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
