import Link from "next/link";
import { MainLayout } from "@/presentation/templates/main-layout";
import { ContactInfo } from "@/presentation/molecules/contact-info/contact-info";
import { ContactUs } from "@/presentation/organisms/contact-us/contact-us";
import { PhoneCall, Mail } from "lucide-react";
import { GoogleReviewCard } from "@/presentation/molecules/review-card/review-card";
import { ReviewCardUser } from "@/presentation/molecules/review-card-user/review-card-user";
import { reviewItems } from "@/lib/constants2";
import Image from "next/image";

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
          <div className="flex space-x-1 ml-11 mr-16">
            <Image src="fotos-prueba/certificate_generic-thumb.webp" width={80} height={48} alt="Certificate" />
            <Image src="fotos-prueba/certificate_generic-thumb.webp" width={80} height={48} alt="Certificate" />
            <Image src="fotos-prueba/certificate_generic-thumb.webp" width={80} height={48} alt="Certificate" />
          </div>
        </div>

        <div className="flex flex-row items-center justify-center lg:mb-40">
          <div className="bg-white h-auto w-auto lg:bg-transparent ">
            <ContactUs/>
          </div>
        </div>
      </div>
      <section
        className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/fondos/ReviewsGreenBurblesBackground.jpg')" }}
      >
        <div className="container px-8 sm:px-4 md:px-6 mx-auto flex items-center justify-center h-full">
          <div className="max-w-5xl mx-auto w-full">
            {/* Content container */}
            <div className="bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-3xl p-8 md:p-12 mx-auto max-w-5xl relative overflow-hidden my-[120px]">
              <div className="text-center mb-8">
                <h3 className="text-[32px] md:text-[36px] font-bold text-white mb-4">
                  See Why Clients Love Our Services!
                </h3>
                <p className="text-[16px] md:text-[18px] text-gray-300 max-w-2xl mx-auto">
                  We aim to surpass our client's expectations, becoming your trusted partner in
                  achieving goals and identifying the best path forward for your business.
                </p>
              </div>

              {/* Google Reviews Summary */}
              <div className="flex justify-center mb-12">
                <GoogleReviewCard rating={5.0} totalReviews={25} />
              </div>

              {/* Individual Reviews Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reviewItems.map((review, index) => (
                  <ReviewCardUser
                    key={index}
                    profilePicture={review.profilePicture}
                    name={review.name}
                    rating={review.rating}
                    review={review.review}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {ContactInfo(1)}

    </MainLayout>
  );
}
