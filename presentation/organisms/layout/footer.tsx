import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { Logo } from "@/presentation/atoms/logo/logo";
import { Button } from "@/presentation/atoms/button/button";

import { EmailForm } from "@/presentation/molecules/email-form/email-form";
import { ContactCard } from "@/presentation/molecules/contact-card/contact-card";
import { inter600 } from "@/styles/font";

export function Footer() {
  return (
    <footer
      className={`xl:w-11/12 xl:mx-16  xl:border-t xl:border-gray-800 flex flex-col ${inter600.className}`}
    >
      <div className="flex flex-col items-center text-center xl:items-start xl:text-left xl:flex-row xl:justify-center xl:flex-nowrap mt-10 xl:w-full xl:mx-5 2xl:mx-0">
        <div className="space-y-4 flex flex-col xl:w-[324px] sm:items-center sm:text-center xl:items-start xl:text-left">
          <Logo className="mb-3 md:mx-0 ml-10  " />
          <div className="flex space-x-2 justify-center">
            <a href="https://www.facebook.com">
              <Button className="text-muted-foreground hover:text-primary rounded-full h-8 w-8">
                <Facebook color="black" />
                <span className="sr-only">Facebook</span>
              </Button>
            </a>
            <a href="https://www.instagram.com">
              <Button className="text-muted-foreground hover:text-primary rounded-full h-8 w-8">
                <Instagram color="black" />
                <span className="sr-only">Instagram</span>
              </Button>
            </a>
            <a href="https://www.youtube.com">
              <Button className="text-muted-foreground hover:text-primary rounded-full h-8 w-8">
                <Youtube color="black" />
                <span className="sr-only">Youtube</span>
              </Button>
            </a>
          </div>
          <div>
            <h3 className="text-2xl mt-3">Subscribe to our stories</h3>
            <div>
              <EmailForm />
            </div>
          </div>
        </div>

        <div className="mt-5 xl:mx-8 xl:size-60 xl:mt-3  items-center text-start xl:items-start xl:text-left ml-6">
          <h3 className="text-2xl mb-2">Services</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/services/web-development"
                className="text-muted-foreground hover:text-primary"
              >
                <p className="underline underline-offset-4 text-white font-normal">
                  •Web Design & Development
                </p>
              </Link>
            </li>
            <li>
              <Link
                href="/services/digital-marketing"
                className="text-muted-foreground hover:text-primary text-base"
              >
                <p className="underline underline-offset-4 text-white font-normal">
                  •Lead Generation & Digital Marketing
                </p>
              </Link>
            </li>
            <li>
              <Link
                href="/services/graphic-design"
                className="text-muted-foreground hover:text-primary text-base"
              >
                <p className="underline underline-offset-4 text-white font-normal">
                  •Graphic Design & Branding
                </p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-10 text-start xl:mx-8 xl:size-60 xl:mt-3 items-center xl:items-start xl:text-left">
          <h3 className="text-2xl mb-2">Helpful Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-primary text-base"
              >
                <p className="underline underline-offset-4 text-white font-normal">
                  •Work Portfolio
                </p>
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-primary text-base"
              >
                <p className="underline underline-offset-4 text-white font-normal">
                  •Book My Free Consultation Call!
                </p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="sm:flex sm:justify-center xl:block mt-5 xl:mt-0">
          <ContactCard />
        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center text-center lg:text-left lg:items-center lg:ml-16 mt-4 mb-16 pt-8 text-muted-foreground">
        <p className="mt-4 lg:mt-0">
          © {new Date().getFullYear()} Senavia Corp. All rights reserved.
        </p>
        <div className="flex space-x-2 mb-2 lg:mb-0 xl:mr-0 2xl:mr-4">
          <div className="bg-[#99CC33] w-[100px] h-[60px] md:w-[90px] md:h-[50px] lg:w-[83px] lg:h-[46px]"></div>
          <div className="bg-[#99CC33] w-[100px] h-[60px] md:w-[90px] md:h-[50px] lg:w-[83px] lg:h-[46px]"></div>
          <div className="bg-[#99CC33] w-[100px] h-[60px] md:w-[90px] md:h-[50px] lg:w-[83px] lg:h-[46px]"></div>
        </div>
      </div>
    </footer>
  );
}
