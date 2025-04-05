import Link from "next/link";
import { MainLayout } from "@/presentation/templates/main-layout";
import { Heading } from "@/presentation/atoms/heading/heading";
import { Button } from "@/presentation/atoms/button/button";
import { ContactInfo } from "@/presentation/molecules/contact-info/contact-info";
import { ContactUs } from "@/presentation/organisms/contact-us/contact-us";
import { PhoneCall, Mail, } from "lucide-react"; 



export function ContactPage() {
  
  return (
    <MainLayout>

      <div className="pt-24 md:pt-20 xl:mt-20 flex flex-col-reverse mb-0 xl:flex-row xl:justify-center bg-white xl:bg-transparent">

      <div className="bg-[#ebedf2] xl:w-72 xl:h-44 xl:rounded-l-lg xl:mt-20">
            <h1 className="text-[#0A1248] font-bold text-3xl mt-3 ml-4">Contact Info</h1>
            <div className="flex items-center gap-2 ml-4 mt-3 mb-3">
              <PhoneCall color="black" className="w-5 h-5" />
              <p className="text-black text-sm">(954) 706-4084</p>
            </div>
            <div className="flex items-center ml-4 mb-5 xl:mb-0">
              <Mail color="black" size={20} />
              <div className="flex flex-col sm:flex-row xl:flex-col gap-2 ml-2 mb-0 break-words">
              <p className="text-black text-sm whitespace-normal">info@senaviacorp.com</p>
              <p className="text-black text-sm whitespace-normal">leads@senaviacorp.com</p>
              </div>
            </div>
        </div>

        <div className="flex flex-row items-center justify-center xl:mb-40">
          <div className="bg-white h-auto w-auto xl:bg-transparent ">
            <ContactUs isLoggedIn={true} />
          </div>
        </div>


      </div>
      {ContactInfo(1)}
      
    </MainLayout>
  );
}
