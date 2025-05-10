'use client';

import { MainLayout } from "@/presentation/templates/main-layout";
import { useParams } from "next/navigation";
import { ContactInfo } from "@/presentation/molecules/contact-info/contact-info";
import { Card, CardTitle, CardContent} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { serviceContent } from "@/components/const/service";
import { notFound } from "next/navigation";
import { validCounty } from "./ServiceAreaViewmodel";
import { ServiceAreaViewModel } from "./ServiceAreaViewmodel";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ReviewSummary } from "@/presentation/organisms/review-summary/review-summary";


export function ServicePage() {
  const { serviceAreas, getServiceArea } = ServiceAreaViewModel();
  const ValidCounty = validCounty
  const [idToSearch, setIdToSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams<{ service: string[] }>()
  const [county, city, serviceKey] = params.service ?? [] //Te retorna un array con los params del url
  const serviceID = serviceKey === "marketing" ? 2 : serviceKey === "websites" ? 1 : 0
  const countyID = county === "miami-dade" ? "MIAMI_DATE" : county === "broward" ? "BROWARD" : county === "palm-beach" ? "WEST_PALM_BEACH" : "";
  {/* SWITCH CASE relacionando los params del URL con un id

    Importante: se prevee que cada ServiceArea tenga un ID unico*/}
  // switch (county) {
  //   case "miami-dade":
  //     switch (serviceKey) {
  //       case "websites":
  //         idToSearch = "1"
  //         break;
  //       case "marketing":
  //         idToSearch = "2"
  //         break;
  //     }
  //     break;
  //   case "broward":
  //     switch (serviceKey) {
  //       case "websites":
  //         idToSearch = "3"
  //         break;
  //       case "marketing":
  //         idToSearch = "4"
  //         break;
  //     }
  //     break;
  //   case "west-palm-beach":
  //     switch (serviceKey) {
  //       case "websites":
  //         idToSearch = "5"
  //         break;
  //       case "marketing":
  //         idToSearch = "6"
  //         break;
  //     }
  //     break;
  //   default:
  //     idToSearch = " "
  //     break;
  // }


  let title = ""
  let description = ""
  let subtitle = ""
  let items: any[] = []

  // Ejecutar después del montaje para simular la carga de datos y validar parámetros
  useEffect(() => {
    // Asegurarse de que serviceAreas tenga datos
    if (serviceAreas.length === 0) {
      console.log("Waiting for service areas data to load...");
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      getAllServiceAreas()
      return () => clearTimeout(timer);
    } else {
      console.log("ServiceAreas loaded:", serviceAreas);
      //Buscar el serviceArea que haga match a partir de los parametros de la URL
      const serviceArea = serviceAreas.find(item => item.county === countyID && item.service_id === serviceID);


      // Si no hay datos, usar valores predeterminados en lugar de redirigir
      title = serviceArea?.MainTitle || "Servicio no disponible";
      description = serviceArea?.description || "Información no disponible";
      subtitle = serviceArea?.SubTitle || "Servicios no disponibles";
      items = content?.cardItems || [];
      setIsLoading(false);
    }

  }, [serviceAreas]);


  // En lugar de usar getServiceArea, usamos directamente la información que ya tenemos
  // IdtoSearch ya contiene el área de servicio que necesitamos

  const countyConfig = serviceContent[county]
  const validCity = countyConfig?.cities.includes(city)
  const content = validCity ? countyConfig.services[serviceKey] : undefined

  // Useeffect para verificar la validez de los datos después de cargar
  // useEffect(() => {
  //   if (!isLoading && serviceAreas.length > 0) {
  //     // Después de cargar, verificamos si los datos son válidos
  //     const isValidCounty = countyID && ValidCounty.includes(countyID);
  //     const isValidService = serviceID === 1 || serviceID === 2;
  //     const serviceAreaExists = !!serviceArea;
  //     const contentExists = !!content;

  //     console.log("Validation check:", {
  //       isValidCounty,
  //       isValidService,
  //       serviceAreaExists,
  //       contentExists,
  //       serviceAreas: serviceAreas.length
  //     });

  //     // Si algo no es válido, redirigimos a notFound
  //     if (!isValidCounty || !isValidService || !serviceAreaExists || !contentExists) {
  //       notFound();
  //     }

  //     getAllServiceAreas()
  //   }
  // }, [isLoading, countyID, serviceID, serviceArea, content, serviceAreas]);



  const getAllServiceAreas = async () => {

    await getServiceArea(idToSearch)

    // debugger

  }

  return (
    <MainLayout>
      <section>
        {/* first section */}
        <section>
          <div className="overflow-hidden relative">
            <div className="hidden lg:block rounded-md absolute top-28 right-0  w-[840px] h-[679px] bg-gradient-to-r from-[#99CC33] via-[#33CCCC] to-[#99CC33] opacity-50 z-0" />
            <div className="relative mt-20 text-center px-5 z-0 overflow-hidden lg:mt-60 lg:mb-80">
              <div className="lg:place-items-start relative z-10 space-y-5 lg:pl-28 lg:pr-[448px] 2xl:lg:pr-[900px]">
                {isLoading ? (
                  <>
                    {/* Skeleton para el título usando ShadCN */}
                    <Skeleton className="h-14 lg:h-20 w-3/4 mx-auto lg:mx-0 rounded-md" />

                    {/* Skeleton para la descripción usando ShadCN */}
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full rounded-md" />
                      <Skeleton className="h-4 w-full rounded-md" />
                      <Skeleton className="h-4 w-3/4 rounded-md" />
                      <Skeleton className="h-4 w-5/6 rounded-md" />
                    </div>

                    {/* Skeleton para el botón usando ShadCN */}
                    <Skeleton className="h-14 w-72 mx-auto lg:mx-0 rounded-full" />
                  </>
                ) : (
                  <>
                    <h1 className="font-bold text-4xl mb-5 lg:text-7xl lg:text-start">
                      {title}
                    </h1>
                    <p className="text-justify opacity-80 font-medium lg:text-start">
                      {description}
                    </p>
                    <Link href="/contact">
                      <Button className="mt-5 rounded-full font-bold text-2xl px-10 py- lg:w-72 lg:h-14">
                        Book A Call Now!
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* second section (Cards section) */}
        <section className="p-0">
          <div className="overflow-hidden relative h-full">
            <div className="hidden lg:block rounded-md absolute top-20  lg:w-80 xl:w-[600px] lg:h-[800px] xl:h-[680px] 2xl:h-[600] bg-gradient-to-r from-[#99CC33] via-[#33CCCC] to-[#99CC33]" />
            <div className="items-center mt-10 lg:mt-20 lg:mb-28 text-center px-5  lg:pl-96 xl:pl-[658px] lg:pr-[76px] lg:px-0 relative z-0">
              {isLoading ? (
                <>
                  {/* Skeleton para el subtítulo usando ShadCN */}
                  <Skeleton className="h-10 w-1/2 mx-auto lg:mx-0 mb-8 rounded-md" />

                  {/* Skeletons para las tarjetas usando ShadCN */}
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="relative border border-white text-start items-center justify-center bg-white/5 mb-3 pt-3 p-4 rounded-md">
                      <Skeleton className="h-6 w-2/3 ml-20 mb-2 rounded-md" />
                      <div className="space-y-2 ml-20">
                        <Skeleton className="h-4 w-full rounded-md" />
                        <Skeleton className="h-4 w-5/6 rounded-md" />
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <h1 className="font-bold text-4xl mb-5 lg:text-5xl lg:text-start">{subtitle}</h1>
                  <div>
                    {items.map((card, i) => (
                      <Card
                        key={i}
                        className="relative border border-white text-start items-center justify-center bg-white/5 mb-3 pt-3"
                      >
                        <Image
                          src="/images/post-schedule/Frame 22.png"
                          alt="icon"
                          width={58}
                          height={58}
                          className="absolute left-3 top-1/2 -translate-y-8"
                        />
                        <CardTitle className="text-lg pl-20">
                          {card.title}
                        </CardTitle>
                        <CardContent className="text-base pl-20 pb-3">
                          {card.description}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Testimonial section */}
        <section
          className="flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/fondos/ReviewsGreenBurblesBackground.jpg')" }}
        >
          <div className="container px-8 sm:px-4 md:px-6 mx-auto flex items-center justify-center h-full">
            <div className="max-w-5xl mx-auto w-full">
              {/* Content container */}
              <div className="bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-3xl p-8 md:p-12 mx-auto max-w-5xl relative overflow-hidden my-[120px]">
                <div className="text-center mb-8">
                  <h3 className="text-[32px] md:text-[36px] font-bold text-white mb-4">
                    Testimonials Section
                  </h3>
                  <p className="text-[16px] md:text-[18px] text-gray-300 max-w-2xl mx-auto">
                    See the results of dozens of businesses that have trusted Senavia and seen positive returns. We offer a unique experience where you are our #1 priority.
                  </p>
                </div>
                <ReviewSummary />
              </div>
            </div>
          </div>
        </section>
      </section>
      {ContactInfo(2)}
    </MainLayout>
  );
}
