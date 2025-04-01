import Link from "next/link";
import { Facebook, Instagram, Youtube} from "lucide-react";
import { Logo } from "@/presentation/atoms/logo/logo";
import { Button } from "@/presentation/atoms/button/button";

import { EmailForm } from "@/presentation/molecules/email-form/email-form";
import { ContactCard } from "@/presentation/molecules/contact-card/contact-card";
import { inter600 } from "@/styles/font";

export function Footer() {
  return (
    <footer className={` w-11/12 xl:mx-16 border-t border-gray-800 flex flex-col ${inter600.className}`}>
        <div className=" flex-wrap justify-start xl:justify-center mt-10 xl:w-full mx-5  xl:flex xl:flex-nowrap 2xl:mx-0 ">
          <div className="space-y-4 flex flex-col xl:w-[324px]">
            <Logo className="mb-3" />
            <div className="flex space-x-2 ">
              <a href="https://www.facebook.com">
                <Button className="text-muted-foreground hover:text-primary rounded-full h-8 w-8 ">
                  <Facebook color="black" />
                  <span className="sr-only">Facebook</span>
                </Button>
              </a>
              <a href="https://www.instagram.com">
                <Button className="text-muted-foreground hover:text-primary rounded-full h-8 w-8" >
                  <Instagram  color="black"/>
                  <span className="sr-only">Instagram</span>
                </Button>
              </a>
              <a href="https://www.youtube.com">
                <Button className="text-muted-foreground hover:text-primary rounded-full h-8 w-8">
                  <Youtube  color="black"/>
                  <span className="sr-only">Youtube</span>
                </Button>
              </a>
            </div>
            <div className="">
            <h3 className={`${inter600.className} text-2xl mt-3`}>Subscribe to our stories</h3>
              <div >
                <EmailForm />
              </div>
            </div>
        </div>

          <div className="mx-8 xl:size-60 mt-3 sm:mt-3">
            <h3 className="text-2xl mb-2">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/web-development"
                  className="text-muted-foreground hover:text-primary"
                >
                  •Web Design & Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services/digital-marketing"
                  className="text-muted-foreground hover:text-primary text-base"
                >
                  •Lead Generation & Digital Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="/services/graphic-design"
                  className="text-muted-foreground hover:text-primary text-base"
                >
                  •Graphic Design & Branding
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-3 mx-8 xl:size-60 sm:mt-3">
            <h3 className="text-2xl mb-2">Helpful Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary text-base">
                  •Work Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary text-base">
                  •Book My Free Consultation Call!
                </Link>
              </li>
            </ul>
          </div>
          <ContactCard/>         
        </div>
        <div className="ml-16 mt-12 pt-8 border-t border-gray-800 text-muted-foreground">
          <p>© {new Date().getFullYear()} Senavia Corp. All rights reserved.</p>
        </div>
    </footer>
  );
}
