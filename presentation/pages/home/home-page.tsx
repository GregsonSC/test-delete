import { MainLayout } from "@/presentation/templates/main-layout";
import { Hero } from "@/presentation/organisms/hero/hero";
import { Partners } from "@/presentation/organisms/partners/partners";
import { AgencyIntro } from "@/presentation/organisms/agency-intro/agency-intro";
import { ServicesSection } from "@/presentation/organisms/services-section/services-section";

import { HomePageCloudinary } from "@/app/api/Cloudinary/page"; 

export function HomePage() {
  return (
    /*<MainLayout>
      <Hero />
      <Partners />
      <AgencyIntro />
      <ServicesSection />
    </MainLayout>*/
    <HomePageCloudinary/>
  );
}
