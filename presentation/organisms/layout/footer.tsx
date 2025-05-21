import Link from "next/link";
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Logo } from "@/presentation/atoms/logo/logo";
import { Button } from "@/presentation/atoms/button/button";
import { EmailForm } from "@/presentation/molecules/email-form/email-form";
import { inter600 } from "@/styles/font";
import Image from "next/image";

export function Footer() {
  return (
    <footer className={`w-full flex flex-col ${inter600.className}`}>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 px-4 xl:px-16 py-8 bg-[#14171F] place-items-center xl:place-items-start text-center xl:text-left items-start"
      >
        {/* logos */}
        <div className="space-y-4 flex flex-col items-center md:items-start">
          <Logo className="mb-3" />
          {/* ! CH006 [ADD] Agregar las 3 urls de los las redes sociales */}
          {/* Hecho */}
          <div className="flex space-x-2">
            <a href="https://www.facebook.com/senaviacorporation/">
              <Button className="bg-[#99CC33] hover:bg-gray-100 rounded-full h-8 w-8 p-0">
                <Facebook className="h-4 w-4" color="black" />
                <span className="sr-only">Facebook</span>
              </Button>
            </a>
            <a href="https://www.instagram.com/senaviacorporation/">
              <Button className="bg-[#99CC33] hover:bg-gray-100 rounded-full h-8 w-8 p-0">
                <Instagram className="h-4 w-4" color="black" />
                <span className="sr-only">Instagram</span>
              </Button>
            </a>
            <a href="https://www.youtube.com/channel/UCWL5yUwa4fSxNTtBxmhtOlQ/featured">
              <Button className="bg-[#99CC33] hover:bg-gray-100 rounded-full h-8 w-8 p-0">
                <Youtube className="h-4 w-4" color="black" />
                <span className="sr-only">Youtube</span>
              </Button>
            </a>
          </div>
        </div>

        {/* services */}
        <div className="mt-8 xl:mt-0">
          <h3 className="text-2xl mb-4 text-white">Services</h3>
          <ul className="space-y-2">
            <li>
              <span className="text-white mr-1">&bull;</span>
              <Link
                href="/websites"
                className="text-white hover:text-[#99CC33] underline "
              >
                Web Design & Development
              </Link>
            </li>
            <li>
              <span className="text-white mr-1">&bull;</span>
              <Link
                href="/marketing"
                className="text-white hover:text-[#99CC33] underline"
              >
                Lead Generation & Digital Marketing
              </Link>
            </li>
            {/* <li>
              <span className="text-white mr-1">&bull;</span>
              <Link
                href="/services/graphic-design"
                className="text-white hover:text-[#99CC33] underline"
              >
                Graphic Design & Branding
              </Link>
            </li> */}
          </ul>
        </div>

        {/* helpful links */}
        <div className="mt-8 xl:mt-0">
          <h3 className="text-2xl mb-4 text-white">Helpful Links</h3>
          <ul className="space-y-2">
            <li>
              <span className="text-white mr-1">&bull;</span>
              <Link href="/portfolio" className="text-white hover:text-[#99CC33] underline">
                Work Portfolio
              </Link>
            </li>
            <li>
              <span className="text-white mr-1">&bull;</span>
              <Link href="/contact" className="text-white hover:text-[#99CC33] underline">
                Book My Free Consultation Call!
              </Link>
            </li>
          </ul>
        </div>

        {/* subscribe to our stories */}
        <div className="mt-8 xl:mt-0">
          <h3 className="text-2xl mb-4 text-white">Subscribe to our stories</h3>
          <EmailForm />
        </div>
      </div>

      {/* contact info */}
      <div className="bg-[#99CC33] py-6">
        <div className="container mx-auto px-4 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className=" bg-[#04081E] rounded-full p-[10px]">
                <Phone className="text-white" size={26} />
              </div>
              <a href="tel:+19547064084" className="text-[#14171F] text-lg font-bold hover:underline">(954) 706-4084</a>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className=" bg-[#04081E] rounded-full p-[10px]">
                <Mail className="text-white" size={26} />
              </div>
              <div className="flex flex-col">
                <a href="mailto:info@senaviacorp.com" className="text-[#14171F] text-lg font-bold hover:underline">info@senaviacorp.com</a>
                <a href="mailto:leads@senaviacorp.com" className="text-[#14171F] text-lg font-bold hover:underline">leads@senaviacorp.com</a>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className=" bg-[#04081E] rounded-full p-[10px]">
                <MapPin className="text-white" size={26} />
              </div>
              <a href="https://www.google.com/maps/place/Senavia+Corp/@26.1184942,-80.2649367,17z/data=!3m1!5s0x88e606f1913dee1d:0x6083a0b52ea8f4bf!4m15!1m8!3m7!1s0x88d90595811015ab:0xbee9b3cdd613e48a!2sSenavia+Corp!8m2!3d26.1184942!4d-80.2623618!10e4!16s%2Fg%2F11j_zjxxff!3m5!1s0x88d90595811015ab:0xbee9b3cdd613e48a!8m2!3d26.1184942!4d-80.2623618!16s%2Fg%2F11j_zjxxff?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="text-[#14171F] text-lg font-bold hover:underline">Location Info</a>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className=" bg-[#04081E] rounded-full p-[10px]">
                <Clock className="text-white" size={26} />
              </div>
              <div className="flex flex-col">
                <span className="text-[#14171F] text-lg font-bold">Service Days</span>
                <span className="text-[#14171F] text-lg font-bold">Service Hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#14171F] py-4">
        <div className="container mx-auto px-4 xl:px-16 flex flex-col-reverse lg:flex-row justify-between items-center">
          <p className="text-gray-400 mt-4 lg:mt-0">
            Copyright {new Date().getFullYear()} Senavia Corp. All rights reserved.
          </p>
          <div className="flex space-x-2">
            {/* ! CH007 [ADD] Agregar los reconocimientos de Senavia */}
            <Image src="fotos-prueba/certificate_generic-thumb.webp" width={80} height={48} alt="Certificate" />
            <Image src="fotos-prueba/certificate_generic-thumb.webp" width={80} height={48} alt="Certificate" />
            <Image src="fotos-prueba/certificate_generic-thumb.webp" width={80} height={48} alt="Certificate" />
          </div>
        </div>
      </div>
    </footer>
  );
}
