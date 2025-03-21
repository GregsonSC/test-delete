import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { Logo } from "@/presentation/atoms/logo/logo";
import { Button } from "@/presentation/atoms/button/button";
import {Inter} from "next/font/google";
import { EmailForm } from "@/presentation/molecules/email-form/email-form";
import { ContactCard } from "@/presentation/molecules/contact-card/contact-card";



const inter600 = Inter(
  {
    weight: "600",
    style: "normal",
    display: 'swap',
    subsets: ['latin']

  }
);

export function Footer() {
  return (
    <footer className={`bg-secondary border-t border-gray-800 flex flex-col backdrop-blur-md ${inter600.className}`}>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <div className="flex space-x-4">
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
            <div>
            <h3 className={`${inter600.className} text-2xl`}>Subscribe to our stories</h3>
              <div className="py-3">
                <EmailForm />
              </div>
            </div>
        </div>

          <div>
            <h3 className=" text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/web-development"
                  className="text-muted-foreground hover:text-primary"
                >
                  Web Design & Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services/digital-marketing"
                  className="text-muted-foreground hover:text-primary"
                >
                  Lead Generation & Digital Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="/services/graphic-design"
                  className="text-muted-foreground hover:text-primary"
                >
                  Graphic Design & Branding
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Helpful Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  Work Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Book My Free Consultation Call!
                </Link>
              </li>
            </ul>
          </div>
          
          <ContactCard />
          
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Senavia Corp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
