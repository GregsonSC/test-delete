import { Heading } from "@/presentation/atoms/heading/heading";
import { Button } from "@/presentation/atoms/button/button";
import { Phone } from "lucide-react";
import Link from "next/link";

/* Para usar la funcion sencillamente la exportas y para usarlo pones {ContactInfo(Numero)}. 
  El primer numero es con el boton y numero y el segundo es para de Miami Beach market */
export function ContactInfo(type: number) {
  switch (type) {
    case 1:
      if (typeof window !== 'undefined' && window.screen.width < 768) {
        return (
        <section className="relative py-20">
          <div className="flex-row">
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              src="/fondos/blog-video-background.mp4"
              autoPlay
              loop
              muted
            />
            <div className="relative z-10 text-center w-full mx-auto">
              <Heading
                level="h1"
                className="px-2 text-3xl md:text-4xl font-bold mb-5 text-[#0A1248]"
              >
                Let's talk About Your Project Goals!
              </Heading>
              <p className="text-lg mb-8 text-[#0A1248] font-semibold">
                Connect with one of our digital experts at Senavia to see how we
                can assist <br /> you in achieving your business objectives.
              </p>
              <Button className="rounded-full bg-[#0A1248] text-white">
                <Phone color="white" />
                <a href="tel:+19547064084" className="font-bold">(954) 706-4084</a>
              </Button>
            </div>
          </div>
        </section>
      );}
      else {return (
        <section className="relative bg-[#4CD4A1] text-black py-20 place-items-center">
          {/* Video de fondo */}
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            src="/fondos/blog-video-background.mp4"
            autoPlay
            loop
            muted
          />
          {/* Contenido encima del video */}
          <div className="relative flex justify-center 2xl:max-w-[1440px] mx-auto z-10">
            {/* Texto */}
            <div className="w-full 2xl:w-[804px] 2xl:flex 2xl:flex-col 2xl:items-end 2xl:text-right text-center 2xl:ml-[560px] 2xl:mr-20 2xl:place-items-end">
              <Heading
                level="h1"
                className="text-3xl md:text-5xl font-bold mb-4 text-[#0A1248]"
              >
                Let's talk About Your Project Goals!
              </Heading>
              <p className="mb-6 font-semibold text-[#0A1248]">
                Connect with one of our digital experts at Senavia to see how we can
                assist you in achieving your business objectives.
              </p>
              <Button className="rounded-full bg-[#0A1248] text-white">
                <Phone color="white" />
                <a href="tel:+19547064084" className="font-bold">(954) 706-4084</a>
              </Button>
            </div>
            {/* Círculo blanco - solo visible en xl en adelante */}
            <div
              className="hidden 2xl:block absolute bg-white rounded-full w-[464px] h-[464px] left-[35px] top-1/2 -translate-y-1/2"
            />
          </div>
        </section>
      );}
      
      

    case 2:
      return (
        <section className="relative py-20">
          <div className="flex-row">
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              src="/fondos/blog-video-background.mp4"
              autoPlay
              loop
              muted
            />
            <div className="relative z-10 text-center w-full mx-auto">
              <Heading
                level="h1"
                className="px-2 text-3xl md:text-4xl font-bold mb-5 text-[#0A1248]"
              >
                Ready to Dominate the Miami Beach Market?
              </Heading>
              <p className="text-lg mb-8 text-[#0A1248] font-semibold">
                Let's create a website that helps your business shine in Miami Beach!
                <br />
                <Link
                  href="/"
                  className="text-white underline underline-offset-auto"
                >
                  Contact us today for a free consultation
                </Link>{" "}
                and discover how a great web <br />
                design can take your online presence to the next level.
              </p>
              <Button className="rounded-full bg-[#0A1248] text-white text-lg">
                Book a call now!
              </Button>
            </div>
          </div>
        </section>
      );
      break;
  }
}