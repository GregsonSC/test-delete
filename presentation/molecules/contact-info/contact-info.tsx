import { Heading } from "@/presentation/atoms/heading/heading";
import { Button } from "@/presentation/atoms/button/button";
import { Phone } from "lucide-react";


export function ContactInfo(){
    return (
        <section className="relative py-20">
          <div className="flex-row">
            <video
              className="absolute top-0 left-0 w-full h-full object-cover "
              src="/fondos/blog-video-background.mp4"
              autoPlay
              loop
              muted
            />
            <div className=" relative z-10 text-center w-full mx-auto">
              <Heading level="h1" className="text-3xl md:text-4xl md:nowr font-bold mb-5 text-[#0A1248]">
                Let’s talk About Your Project Goals!
              </Heading>
              <p className="text-lg mb-8 text-[#0A1248] font-semibold">
                Connect with one of our digital experts at Senavia to see how we can assist <br /> you in achieving your business objectives.
              </p>
              <Button className="rounded-full bg-[#0A1248] text-white">
                <Phone color="white" />
                (954) 706-4084
              </Button>
            </div>
          </div>
        </section>
    );
}