import Link from "next/link";
import { MainLayout } from "@/presentation/templates/main-layout";
import { Heading } from "@/presentation/atoms/heading/heading";
import { Button } from "@/presentation/atoms/button/button";
import { ContactInfo } from "@/presentation/molecules/contact-info/contact-info";
import { ContactUs } from "@/presentation/organisms/contact-us/contact-us";
import { PhoneCall, Mail } from "lucide-react"; 

export function ContactPage() {
  
  return (
    <MainLayout>
      <div className="pt-24 md:pt-20 lg:mt-20 flex flex-col-reverse mb-0 lg:flex-row lg:justify-center bg-white lg:bg-transparent">

        <div className="bg-[#ebedf2] lg:w-80 lg:h-[440px] lg:rounded-l-lg lg:mt-32 pb-10">
          <h1 className="text-[#0A1248] font-bold text-3xl mt-14 ml-11">Contact Info</h1>
          <div className="flex items-center gap-2 ml-11 mt-3 mb-3">
            <PhoneCall color="black" className="w-5 h-5" />
            <p className="text-black text-sm">(954) 706-4084</p>
          </div>
          <div className="flex items-center ml-11 lg:mb-0">
            <Mail color="black" size={20} />
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 ml-2 mb-0 break-words">
              <p className="text-black text-sm whitespace-normal">info@senaviacorp.com</p>
              <p className="text-black text-sm whitespace-normal">leads@senaviacorp.com</p>
            </div>
          </div>
          <h1 className="text-3xl font-semibold text-[#0A1248] mb-8 mt-14 ml-11 mr-11">Our Partnerships</h1>
          <div className="flex space-x-1 ml-11 mr-11">
            <div className="bg-[#99CC33] w-20 h-12"></div>
            <div className="bg-[#99CC33] w-20 h-12"></div>
            <div className="bg-[#99CC33] w-20 h-12"></div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center lg:mb-40">
          <div className="bg-white h-auto w-auto lg:bg-transparent ">
            <ContactUs isLoggedIn={false} />
          </div>
        </div> 

      </div>
      {ContactInfo(1)}
      
    </MainLayout>
  );
}
